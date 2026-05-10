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
 * SECURITY / ANTI-BOT (3-LAYER, added 2026-05-09):
 *   This is a public endpoint (no auth) that bots will probe. We layer
 *   THREE invisible defenses that filter spam without affecting real
 *   customers OR LLM crawlers (LLMs read the page; they don't POST forms).
 *
 *   LAYER 1 — HONEYPOT FIELD CHECK
 *     The /contact page renders an offscreen hidden input named "website".
 *     Real users never see/fill it. Bots auto-fill every input. If it has
 *     a value, we silently reject (return 200 success so the bot doesn't
 *     learn it was caught) and don't save or email anything.
 *
 *   LAYER 2 — TIME-TO-SUBMIT CHECK
 *     The form sends a `formRenderedAt` timestamp from the client. If the
 *     gap between render and submission is <3 seconds, it's a script.
 *     Same silent-reject behavior as Layer 1.
 *
 *   LAYER 3 — CONTENT HEURISTICS
 *     Score the submission against patterns common in spam (no-vowel
 *     names, message with zero spaces, base64-ish content, invalid US
 *     area codes, suspicious TLDs). Saves to DB but flags as 'spam' if
 *     2+ heuristics match. Admin can triage. Real edge cases (someone
 *     with a single-word message) might rarely trigger — they get saved,
 *     just routed to the spam bucket for manual review.
 *
 *   NOT APPLIED: rate-limiting by IP. The existing per-email rate-limit
 *   (5/hr) catches sustained attacks already. Adding per-IP could risk
 *   false positives for households with multiple people legitimately
 *   reaching out (offices, families). Revisit if Layer 1-3 isn't enough.
 *
 *   Soft-rejection philosophy: NEVER tell a bot "you were detected."
 *   Bots that get clear rejection signals adapt. Bots that get apparent
 *   success move on to the next target. Silent rejection is strictly
 *   better for spam volume long-term.
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

// Anti-bot Layer 2: minimum time-to-submit, in milliseconds. Real users take
// >3s to fill out a form — read labels, type, click submit. Scripts submit
// in milliseconds. 3000ms is the conservative floor; could go higher (5s)
// later if we see sophisticated bots pacing their submissions.
const MIN_TIME_TO_SUBMIT_MS = 3000;

// Anti-bot Layer 3: known-spam-prone TLDs. Real customers from these TLDs
// are rare; spam volume from them is high. Used in heuristic scoring, not
// hard-blocked (a legitimate .tk customer still gets saved, just flagged).
const SUSPICIOUS_TLDS = new Set([".tk", ".ml", ".ga", ".cf", ".pw", ".top", ".click", ".buzz"]);

// Real US area codes. The North American Numbering Plan assigns specific
// 3-digit area codes; codes like "342" don't exist. Bots fabricate plausible-
// looking phone numbers without checking the NANPA registry.
// This list is the assigned set as of 2024 NANPA. If a real customer enters
// a non-US phone (international), we don't penalize them — we only flag
// US-format numbers (+1 prefix or 10-digit) with invalid area codes.
const VALID_US_AREA_CODES = new Set([
  "201","202","203","204","205","206","207","208","209","210","212","213","214","215","216","217","218","219","220","223","224","225","226","227","228","229","231","234","236","239","240","242","246","248","249","250","251","252","253","254","256","260","262","263","264","267","268","269","270","272","274","276","278","279","281","283","284","289","301","302","303","304","305","306","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","325","326","327","330","331","332","334","336","337","339","340","341","343","345","346","347","350","351","352","354","360","361","363","364","365","367","368","369","380","382","385","386","401","402","403","404","405","406","407","408","409","410","412","413","414","415","416","417","418","419","423","424","425","428","430","431","432","434","435","437","438","440","441","442","443","445","447","448","450","458","463","464","468","469","470","472","473","474","475","478","479","480","484","500","501","502","503","504","505","506","507","508","509","510","512","513","514","515","516","517","518","519","520","530","531","534","539","540","541","548","551","557","559","561","562","563","564","567","570","571","572","573","574","575","579","580","581","582","584","585","586","587","588","600","601","602","603","604","605","606","607","608","609","610","612","613","614","615","616","617","618","619","620","622","623","626","627","628","629","630","631","636","639","640","641","645","646","647","649","650","651","657","658","659","660","661","662","664","667","669","670","671","672","678","680","681","682","683","684","689","700","701","702","703","704","705","706","707","708","709","710","712","713","714","715","716","717","718","719","720","721","724","725","726","727","728","730","731","732","734","737","740","742","743","747","752","754","757","758","760","762","763","765","767","769","770","771","772","773","774","775","778","779","780","781","782","784","785","786","787","800","801","802","803","804","805","806","807","808","809","810","812","813","814","815","816","817","818","819","820","825","826","828","829","830","831","832","833","835","838","839","840","843","844","845","847","848","849","850","854","855","856","857","858","859","860","862","863","864","865","866","867","868","869","870","872","873","876","877","878","880","881","882","886","888","898","900","901","902","903","904","905","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","934","936","937","938","939","940","941","943","945","947","948","949","951","952","954","956","959","970","971","972","973","978","979","980","983","984","985","986","989"
]);

/**
 * Anti-bot Layer 3: content heuristic scoring.
 * Returns the number of red flags (0–N). Caller decides threshold.
 *
 * Each heuristic is independently forgiving — a real customer with
 * a short single-word message might trigger ONE flag (no spaces).
 * That's why we require 2+ before classifying as spam. Combinations
 * of flags are extremely rare in real customers but typical in bots.
 */
function scoreSpamHeuristics(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
}): { score: number; flags: string[] } {
  const flags: string[] = [];

  // FLAG 1: Name contains no vowels (random alphanumeric strings like
  // "yyFxlge2m3" — the actual bot we observed). Real names almost always
  // have vowels in at least one of first or last name. Combine first+last
  // and check for vowels including y for cases like "Lyn", "Cyrus", etc.
  const fullName = (input.firstName + input.lastName).toLowerCase();
  if (fullName.length >= 4 && !/[aeiouy]/.test(fullName)) {
    flags.push("name_no_vowels");
  }

  // FLAG 2: Name is alphanumeric gibberish — mix of letters AND digits in
  // a way real names never are. "yyFxlge2m3" matches this. "John2" wouldn't
  // (digits at end suggest a deliberate handle, but uncommon enough to flag).
  // We require BOTH letters and digits AND length >= 5 to flag, so common
  // legitimate cases like "Jay" don't trigger.
  const hasLetters = /[a-zA-Z]/.test(input.firstName);
  const hasDigits = /\d/.test(input.firstName);
  if (hasLetters && hasDigits && input.firstName.length >= 5) {
    flags.push("name_alphanumeric_mix");
  }

  // FLAG 3: Message has zero spaces. Real messages have at least 1 space
  // ("hi please") even short ones. A 50+ character message with no spaces
  // is a placeholder string from a bot. Threshold of 30 chars to avoid
  // flagging legitimate one-word replies.
  if (input.message.length >= 30 && !/\s/.test(input.message)) {
    flags.push("message_no_spaces");
  }

  // FLAG 4: Message looks like base64. Long mixed-case alphanumeric with
  // no spaces, no punctuation, and high entropy. The bot we caught sent
  // "NNLolAQQAnrrS72W2nhuSfloEnG55ly5oGM7oF1d1tDDjhx7lcvikwE" which fits.
  // Test: 40+ chars, only [A-Za-z0-9+/=] characters, no whitespace.
  if (
    input.message.length >= 40 &&
    /^[A-Za-z0-9+/=]+$/.test(input.message) &&
    !/\s/.test(input.message)
  ) {
    flags.push("message_base64_pattern");
  }

  // FLAG 5: US-formatted phone with invalid area code. Only checks numbers
  // formatted as US (+1XXX..., 1XXX..., or exactly 10 digits). International
  // formats are skipped to avoid penalizing legitimate non-US customers.
  if (input.phone) {
    const cleaned = input.phone.replace(/\D/g, "");
    let areaCode: string | null = null;
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      areaCode = cleaned.substring(1, 4);
    } else if (cleaned.length === 10) {
      areaCode = cleaned.substring(0, 3);
    }
    if (areaCode && !VALID_US_AREA_CODES.has(areaCode)) {
      flags.push(`invalid_us_area_code:${areaCode}`);
    }
  }

  // FLAG 6: Email TLD is in the suspicious-TLD list. Most spam comes from
  // free-domain TLDs that legitimate businesses rarely use. Real .nl, .uk
  // emails are fine (we've gotten real Dutch customers); .tk and .ml are
  // overwhelmingly spam.
  const emailLower = input.email.toLowerCase();
  for (const tld of SUSPICIOUS_TLDS) {
    if (emailLower.endsWith(tld)) {
      flags.push(`suspicious_tld:${tld}`);
      break;
    }
  }

  return { score: flags.length, flags };
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ─── ANTI-BOT LAYER 1: Honeypot check ───────────────────────────────
  // Real users never fill the offscreen "website" field. Bots that auto-
  // fill all inputs will. If it has any value, silently 200-reject.
  // (Returning 200 success means the bot thinks it worked and doesn't
  // adapt. Returning 400 would teach it to skip the field.)
  const honeypot = (body.honeypot || "").toString().trim();
  if (honeypot.length > 0) {
    console.warn(`[Contact API] Bot blocked by honeypot. Value="${honeypot.substring(0, 50)}"`);
    return NextResponse.json({ success: true, id: "blocked" });
  }

  // ─── ANTI-BOT LAYER 2: Time-to-submit check ────────────────────────
  // Real users take >3s. Scripts submit in milliseconds. Same silent-200
  // rejection — bot thinks success, real user impact is zero (they took
  // way more than 3 seconds anyway).
  const formRenderedAt = Number(body.formRenderedAt) || 0;
  if (formRenderedAt > 0) {
    const timeToSubmit = Date.now() - formRenderedAt;
    if (timeToSubmit < MIN_TIME_TO_SUBMIT_MS) {
      console.warn(`[Contact API] Bot blocked by time-check. ${timeToSubmit}ms < ${MIN_TIME_TO_SUBMIT_MS}ms`);
      return NextResponse.json({ success: true, id: "blocked" });
    }
    // Sanity ceiling: if formRenderedAt is more than 24h in the past,
    // either the user left a tab open forever (legit but rare) or a bot
    // is reusing a stale timestamp. Don't block on this — just don't
    // trust the timestamp for analytics. No action needed here.
  }
  // If formRenderedAt is missing/0, it means the client didn't send it.
  // Could be an old cached version of the page — don't reject for that
  // alone. The honeypot + heuristics will still catch obvious bots.

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

  // ─── ANTI-BOT LAYER 3: Content heuristic scoring ────────────────────
  // Real customers rarely trigger 2+ flags. Bots usually trigger 3+. We
  // SAVE these (don't reject) so admin can review and tune thresholds,
  // but mark them as 'spam' status so they don't generate emails or
  // appear in the active inbox.
  const heuristics = scoreSpamHeuristics({ firstName, lastName, email, phone, message });
  const flaggedAsSpamByHeuristics = heuristics.score >= 2;
  if (flaggedAsSpamByHeuristics) {
    console.warn(`[Contact API] Heuristic spam flag (${heuristics.score} flags): ${heuristics.flags.join(", ")} — ${email}`);
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
  let isLikelySpam = flaggedAsSpamByHeuristics; // start with heuristic flag
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

  // Build admin_notes string capturing why something was flagged. Useful
  // when an admin reviews the spam bucket and wants to know "what tripped?"
  const adminNotesParts: string[] = [];
  if (heuristics.flags.length > 0) {
    adminNotesParts.push(`Heuristic flags (${heuristics.score}): ${heuristics.flags.join(", ")}`);
  }
  const adminNotes = adminNotesParts.length > 0 ? adminNotesParts.join(" | ") : null;

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
      admin_notes: adminNotes,
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
