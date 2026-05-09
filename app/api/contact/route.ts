/**
 * /api/contact — public contact form submission endpoint
 * ──────────────────────────────────────────────────────────────────────────
 * Handles POSTs from /contact (the public Contact Us page).
 *
 * Replaces the previous BROKEN behavior where /contact's submit handler
 * only fired a GA4 event and showed a fake "Message Sent!" screen without
 * actually sending the message anywhere. Every submission was silently
 * lost — likely since launch.
 *
 * RELIABILITY DESIGN:
 *   - Persists to Supabase FIRST (durable record), THEN sends emails.
 *   - If emails fail but DB save succeeded, customer still sees success
 *     because their message is recoverable from the DB. We log the email
 *     error and mark the row so admin can retry/follow up.
 *   - If DB save fails entirely, return 5xx so the frontend can show an
 *     error and the customer can retry — never falsely tell them their
 *     message went through.
 *
 * SECURITY:
 *   - This is a public endpoint (no auth). Validate everything.
 *   - Rate-limited softly: 5 submissions per email per hour. Anything
 *     more is treated as spam (still saved, but flagged).
 *   - HTML in user-provided fields is escaped at email-render time, not
 *     at storage time — store raw, escape on display. (See sendContactFormAlert.)
 *
 * ANALYTICS:
 *   - The frontend continues to fire `generate_lead` GA4 event on submit.
 *     We do NOT fire any tracking server-side here to avoid double-counting.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { sendContactFormAlert, sendContactFormAutoReply } from "@/lib/email/send";

export const dynamic = "force-dynamic";

// Allowed values for the subject dropdown — must match /contact/page.tsx
const VALID_SUBJECTS = new Set(["consultation", "quote", "measurement", "order", "other", ""]);

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ─── Validate required fields ────────────────────────────────────────
  const firstName = (body.firstName || "").toString().trim();
  const lastName = (body.lastName || "").toString().trim();
  const email = (body.email || "").toString().trim().toLowerCase();
  const phone = (body.phone || "").toString().trim() || null;
  const subject = (body.subject || "").toString().trim();
  const message = (body.message || "").toString().trim();

  if (!firstName) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }
  if (!lastName) {
    return NextResponse.json({ error: "Last name is required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Soft length caps to prevent abuse (very generous, won't reject real customers)
  if (firstName.length > 100 || lastName.length > 100) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Email is too long" }, { status: 400 });
  }
  if (message.length > 10000) {
    return NextResponse.json({ error: "Message is too long (max 10,000 characters)" }, { status: 400 });
  }
  if (phone && phone.length > 50) {
    return NextResponse.json({ error: "Phone is too long" }, { status: 400 });
  }
  if (subject && !VALID_SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Invalid topic selection" }, { status: 400 });
  }

  // ─── Capture metadata for spam triage ────────────────────────────────
  const userAgent = req.headers.get("user-agent") || null;
  // Vercel sets x-forwarded-for with the real client IP. First entry is
  // the originating client (subsequent are proxies).
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    null;
  const sourcePage = body.source_page?.toString().slice(0, 500) || null;

  // ─── Soft rate limit: 5 submissions per email per hour ──────────────
  // Doesn't block — just logs as 'spam' status if exceeded. Admin can
  // unflag in the DB if a real customer is genuinely re-submitting.
  const supabase = createAdminClient();
  let isLikelySpam = false;
  try {
    const { count: recentCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());
    if ((recentCount || 0) >= 5) {
      isLikelySpam = true;
      console.warn(`[Contact API] Rate limit exceeded for ${email} — flagging as spam (${recentCount} in last hour)`);
    }
  } catch (err) {
    // Non-fatal — proceed anyway
    console.error("[Contact API] Rate limit check failed (continuing):", err);
  }

  // ─── Step 1: Save to Supabase (durable record, source of truth) ────
  const { data: submission, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      subject: subject || null,
      message,
      status: isLikelySpam ? "spam" : "new",
      source_page: sourcePage,
      user_agent: userAgent,
      ip_address: ipAddress,
    })
    .select("id, first_name, last_name, email, phone, subject, message, source_page, created_at")
    .single();

  if (insertError || !submission) {
    // DB save failed — DON'T tell the customer their message went through.
    // Return 5xx so they can retry. Log loudly.
    console.error("[Contact API] Supabase insert failed:", {
      error_message: insertError?.message,
      error_code: insertError?.code,
      error_details: insertError?.details,
      error_hint: insertError?.hint,
      email,
    });
    return NextResponse.json(
      {
        error:
          "We couldn't save your message right now. Please call us at (844) 674-2716 or try again in a moment.",
        code: insertError?.code,
      },
      { status: 500 }
    );
  }

  // If flagged as spam, skip email sends (still return success to the spammer)
  if (isLikelySpam) {
    return NextResponse.json({ success: true, id: submission.id });
  }

  // ─── Step 2: Send admin alert + customer auto-reply (parallel) ──────
  // Email failures are non-fatal — DB row is the source of truth.
  // We track which emails sent so admin can audit later.
  const [adminResult, customerResult] = await Promise.all([
    sendContactFormAlert(submission).catch((e) => {
      console.error("[Contact API] Admin alert threw:", e);
      return { success: false, error: e };
    }),
    sendContactFormAutoReply(submission).catch((e) => {
      console.error("[Contact API] Customer auto-reply threw:", e);
      return { success: false, error: e };
    }),
  ]);

  // ─── Step 3: Update the row with email delivery status ──────────────
  // Fire-and-forget — failure here doesn't affect the customer response.
  const emailErrors: string[] = [];
  if (!adminResult.success) {
    const msg = (adminResult as any).error?.message || String((adminResult as any).error || "unknown");
    emailErrors.push(`admin: ${msg}`);
  }
  if (!customerResult.success) {
    const msg = (customerResult as any).error?.message || String((customerResult as any).error || "unknown");
    emailErrors.push(`customer: ${msg}`);
  }

  try {
    await supabase
      .from("contact_submissions")
      .update({
        admin_email_sent: adminResult.success,
        customer_email_sent: customerResult.success,
        email_error: emailErrors.length > 0 ? emailErrors.join(" | ") : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", submission.id);
  } catch (err) {
    console.error("[Contact API] Failed to update email status (non-fatal):", err);
  }

  // ─── Always return success to the customer if the DB save worked ───
  // Their message is recorded; admin can follow up even if email failed.
  return NextResponse.json({
    success: true,
    id: submission.id,
    admin_emailed: adminResult.success,
    customer_emailed: customerResult.success,
  });
}
