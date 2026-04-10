import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function verifyCron(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

/*
 * AUTOMATIC RECOVERY EMAIL SEQUENCE:
 * Email 1: 1 hour after abandonment (gentle reminder)
 * Email 2: 24 hours after abandonment (includes 10% off COMEBACK10)
 * Email 3: 72 hours after abandonment (last chance, urgency)
 * Runs every hour via Vercel Cron
 */
export async function GET(req: NextRequest) {
  const isCron = verifyCron(req);
  const isAdmin = req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
  if (!isCron && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();

  const { data: carts, error } = await supabase
    .from("abandoned_carts")
    .select("*")
    .eq("recovered", false)
    .lt("emails_sent", 3)
    .order("created_at", { ascending: true });

  if (error || !carts) {
    return NextResponse.json({ error: error?.message || "No data", sent: 0 });
  }

  let sent = 0;
  let skipped = 0;

  for (const cart of carts) {
    const createdAt = new Date(cart.created_at);
    const hoursSinceCreated = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const emailNum = (cart.emails_sent || 0) + 1;

    // Check timing for next email
    let shouldSend = false;
    if (emailNum === 1 && hoursSinceCreated >= 1) shouldSend = true;
    if (emailNum === 2 && hoursSinceCreated >= 24) shouldSend = true;
    if (emailNum === 3 && hoursSinceCreated >= 72) shouldSend = true;

    // Don't send if last email was less than 12 hours ago
    if (cart.email_sent_at) {
      const hoursSinceLastEmail = (now.getTime() - new Date(cart.email_sent_at).getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastEmail < 12) { skipped++; continue; }
    }

    if (!shouldSend) { skipped++; continue; }

    const firstName = cart.name?.split(" ")[0] || "there";
    const total = cart.total || 0;
    const itemCount = cart.item_count || 0;
    const showDiscount = emailNum >= 2;

    const subjects: Record<number, string> = {
      1: "Your custom shade is still waiting for you",
      2: "Here's 10% off to complete your shade order",
      3: "Last chance \u2014 your shade configuration expires soon",
    };

    const headlines: Record<number, string> = {
      1: "your shade is still waiting",
      2: "we saved you 10% \u2014 come finish your order",
      3: "your configuration expires tomorrow",
    };

    const bodies: Record<number, string> = {
      1: "You were designing something beautiful. We saved your progress so you can pick up right where you left off.",
      2: "We know choosing the perfect shade takes time. Here's a little incentive to help you decide.",
      3: "Your saved configuration will expire soon. Don't miss out on the shade you designed.",
    };

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:20px;">
  <div style="text-align:center;padding:30px 0;border-bottom:2px solid #c8a165;">
    <h1 style="margin:0;font-size:28px;color:#0c0c0c;font-family:Georgia,serif;">World Wide <span style="color:#c8a165;">Shades</span></h1>
  </div>
  <div style="padding:40px 30px;text-align:center;background:#fff;border-radius:0 0 12px 12px;">
    <h2 style="font-size:24px;color:#0c0c0c;margin:0 0 15px;font-family:Georgia,serif;">Hey ${firstName}, ${headlines[emailNum]}</h2>
    <p style="font-size:16px;color:#6b7280;line-height:1.6;margin:0 0 25px;">${bodies[emailNum]}</p>
    ${total > 0 ? `<div style="background:#fdf9f5;border:1px solid #e5ddd0;border-radius:8px;padding:20px;margin:0 0 25px;text-align:left;">
      <p style="font-size:14px;color:#9ca3af;margin:0 0 8px;">Your saved configuration:</p>
      <p style="font-size:18px;font-weight:700;color:#0c0c0c;margin:0;">${itemCount} custom shade${itemCount > 1 ? "s" : ""} \u2014 $${total.toFixed(2)}</p>
      ${showDiscount ? `<div style="margin-top:12px;padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;"><p style="margin:0;font-size:14px;font-weight:600;color:#15803d;">\u2728 Use code COMEBACK10 for 10% off</p></div>` : ""}
    </div>` : ""}
    <a href="https://worldwideshades.com/recover/${cart.id}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#c8a165,#b8895a);color:#fff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:700;">
      ${emailNum === 3 ? "Finish Before It Expires \u2192" : "Complete Your Order \u2192"}
    </a>
    <p style="font-size:13px;color:#9ca3af;margin:20px 0 0;">Free shipping \u00b7 7-day production \u00b7 100% satisfaction guarantee</p>
  </div>
  <div style="text-align:center;padding:20px 30px;margin-top:20px;background:#fff;border-radius:12px;border:1px solid #e5ddd0;">
    <p style="font-size:14px;color:#6b7280;margin:0 0 10px;">Need help? Our shade experts are here.</p>
    <a href="tel:8446742716" style="color:#c8a165;font-weight:600;text-decoration:none;">(844) 674-2716</a>
    <span style="color:#9ca3af;margin:0 8px;">|</span>
    <a href="mailto:hello@worldwideshades.com" style="color:#c8a165;font-weight:600;text-decoration:none;">hello@worldwideshades.com</a>
  </div>
  <div style="text-align:center;padding:30px;font-size:12px;color:#9ca3af;">
    <p style="margin:0;">World Wide Shades \u00b7 Custom Window Shades Made Simple</p>
  </div>
</div>
</body></html>`;

    try {
      await resend.emails.send({
        from: "World Wide Shades <hello@worldwideshades.com>",
        to: cart.email,
        subject: subjects[emailNum],
        html,
      });

      await supabase
        .from("abandoned_carts")
        .update({
          email_sent_at: now.toISOString(),
          emails_sent: emailNum,
          updated_at: now.toISOString(),
        })
        .eq("id", cart.id);

      sent++;
    } catch (err) {
      console.error(`Recovery email failed for ${cart.email}:`, err);
    }
  }

  return NextResponse.json({ sent, skipped, total_checked: carts.length, timestamp: now.toISOString() });
}
