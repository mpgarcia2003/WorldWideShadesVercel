import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function verifyAdmin(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// POST /api/abandoned-carts/send-recovery — send recovery email (admin only)
// Body: { cart_id: string } or { send_all: true } to batch send
export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createAdminClient();

  let cartsToEmail: any[] = [];

  if (body.cart_id) {
    // Send to a single abandoned cart
    const { data } = await supabase
      .from("abandoned_carts")
      .select("*")
      .eq("id", body.cart_id)
      .single();
    if (data) cartsToEmail = [data];
  } else if (body.send_all) {
    // Send to all unrecovered carts that haven't been emailed in the last 24h
    const { data } = await supabase
      .from("abandoned_carts")
      .select("*")
      .eq("recovered", false)
      .or(`email_sent_at.is.null,email_sent_at.lt.${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}`)
      .lt("emails_sent", 3) // Max 3 recovery emails per cart
      .order("created_at", { ascending: false });
    if (data) cartsToEmail = data;
  }

  if (cartsToEmail.length === 0) {
    return NextResponse.json({ sent: 0, message: "No carts to email" });
  }

  let sent = 0;
  let failed = 0;

  for (const cart of cartsToEmail) {
    const items = cart.cart_data || [];
    const itemCount = cart.item_count || items.length || 0;
    const total = cart.total || 0;
    const firstName = cart.name?.split(" ")[0] || "there";
    const emailNum = (cart.emails_sent || 0) + 1;

    // Different subject lines for each email in the sequence
    const subjects: Record<number, string> = {
      1: `You left something beautiful behind — your custom shade is waiting`,
      2: `Still thinking about your custom shade? Here's 10% off to help decide`,
      3: `Last chance: your custom shade configuration is about to expire`,
    };

    const subject = subjects[emailNum] || subjects[1];
    const showDiscount = emailNum >= 2;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <!-- Header -->
    <div style="text-align:center;padding:30px 0;border-bottom:2px solid #c8a165;">
      <h1 style="margin:0;font-size:28px;color:#0c0c0c;font-family:Georgia,serif;">World Wide <span style="color:#c8a165;">Shades</span></h1>
    </div>

    <!-- Hero -->
    <div style="padding:40px 30px;text-align:center;background:#fff;border-radius:0 0 12px 12px;">
      <h2 style="font-size:24px;color:#0c0c0c;margin:0 0 15px;font-family:Georgia,serif;">
        Hey ${firstName}, your shade is still waiting
      </h2>
      <p style="font-size:16px;color:#6b7280;line-height:1.6;margin:0 0 25px;">
        You were so close to transforming your space with a custom-made shade. 
        We saved your configuration so you can pick up right where you left off.
      </p>

      ${total > 0 ? `
      <!-- Cart summary -->
      <div style="background:#fdf9f5;border:1px solid #e5ddd0;border-radius:8px;padding:20px;margin:0 0 25px;text-align:left;">
        <p style="font-size:14px;color:#9ca3af;margin:0 0 8px;">Your saved configuration:</p>
        <p style="font-size:18px;font-weight:700;color:#0c0c0c;margin:0;">
          ${itemCount} custom shade${itemCount > 1 ? "s" : ""} — $${total.toFixed(2)}
        </p>
        ${showDiscount ? `
        <div style="margin-top:12px;padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;">
          <p style="margin:0;font-size:14px;font-weight:600;color:#15803d;">
            Use code COMEBACK10 for 10% off your order
          </p>
        </div>
        ` : ""}
      </div>
      ` : ""}

      <!-- CTA -->
      <a href="https://worldwideshades.com/recover/${cart.id}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#c8a165,#b8895a);color:#fff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:700;letter-spacing:0.5px;">
        Complete Your Order →
      </a>

      <p style="font-size:13px;color:#9ca3af;margin:20px 0 0;">
        Free shipping · 7-day production · 100% satisfaction guarantee
      </p>
    </div>

    <!-- Why WWS -->
    <div style="padding:30px;margin-top:20px;">
      <div style="display:flex;gap:15px;margin-bottom:15px;">
        <div style="flex:1;text-align:center;padding:15px;background:#fff;border-radius:8px;border:1px solid #e5ddd0;">
          <p style="font-size:24px;margin:0 0 5px;">🏭</p>
          <p style="font-size:13px;font-weight:600;color:#0c0c0c;margin:0;">Factory Direct</p>
          <p style="font-size:12px;color:#9ca3af;margin:0;">No middleman markup</p>
        </div>
        <div style="flex:1;text-align:center;padding:15px;background:#fff;border-radius:8px;border:1px solid #e5ddd0;">
          <p style="font-size:24px;margin:0 0 5px;">📦</p>
          <p style="font-size:13px;font-weight:600;color:#0c0c0c;margin:0;">Free Shipping</p>
          <p style="font-size:12px;color:#9ca3af;margin:0;">Delivered in 7-10 days</p>
        </div>
        <div style="flex:1;text-align:center;padding:15px;background:#fff;border-radius:8px;border:1px solid #e5ddd0;">
          <p style="font-size:24px;margin:0 0 5px;">✓</p>
          <p style="font-size:13px;font-weight:600;color:#0c0c0c;margin:0;">100% Fit</p>
          <p style="font-size:12px;color:#9ca3af;margin:0;">Remade free if wrong</p>
        </div>
      </div>
    </div>

    <!-- Help -->
    <div style="text-align:center;padding:20px 30px;background:#fff;border-radius:12px;border:1px solid #e5ddd0;">
      <p style="font-size:14px;color:#6b7280;margin:0 0 10px;">Need help choosing? Our shade experts are here for you.</p>
      <a href="tel:8446742716" style="color:#c8a165;font-weight:600;text-decoration:none;font-size:15px;">(844) 674-2716</a>
      <span style="color:#9ca3af;margin:0 8px;">|</span>
      <a href="mailto:hello@worldwideshades.com" style="color:#c8a165;font-weight:600;text-decoration:none;font-size:15px;">hello@worldwideshades.com</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:30px;font-size:12px;color:#9ca3af;">
      <p style="margin:0 0 5px;">World Wide Shades · Custom Window Shades Made Simple</p>
      <p style="margin:0;">If you no longer wish to receive these emails, simply ignore this message.</p>
    </div>
  </div>
</body>
</html>`;

    try {
      await resend.emails.send({
        from: "World Wide Shades <hello@worldwideshades.com>",
        to: cart.email,
        subject,
        html,
      });

      await supabase
        .from("abandoned_carts")
        .update({
          email_sent_at: new Date().toISOString(),
          emails_sent: emailNum,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cart.id);

      sent++;
    } catch (err) {
      console.error(`Failed to send recovery email to ${cart.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: cartsToEmail.length });
}
