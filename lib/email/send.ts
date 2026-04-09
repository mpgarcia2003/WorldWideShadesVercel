import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use verified domain or fallback to test sender
const FROM_EMAIL = "hello@worldwideshades.com";
const FROM_NAME = "World Wide Shades";
const ADMIN_EMAIL = "hello@worldwideshades.com";

function formatCurrency(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDimension(val: number, frac: string) {
  return frac && frac !== "0" ? `${val} ${frac}"` : `${val}"`;
}

// ─── Shared email wrapper ────────────────────────────────────
function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:#0c0c0c;padding:24px 32px;text-align:center;">
      <h1 style="margin:0;font-size:20px;font-weight:700;letter-spacing:0.5px;">
        <span style="color:#ffffff;">World Wide </span><span style="color:#c8a165;">Shades</span>
      </h1>
    </div>
    <!-- Content -->
    <div style="padding:32px;">
      ${content}
    </div>
    <!-- Footer -->
    <div style="background:#f7f5f0;padding:24px 32px;text-align:center;border-top:1px solid #ede9e0;">
      <p style="margin:0 0 8px;font-size:13px;color:#666;">World Wide Shades · Custom Window Treatments</p>
      <p style="margin:0 0 8px;font-size:12px;color:#999;">26 Broadway, Suite 934 · New York, NY 10004</p>
      <p style="margin:0;font-size:12px;color:#999;">
        <a href="tel:+18446742716" style="color:#c8a165;text-decoration:none;">(844) 674-2716</a> · 
        <a href="mailto:Hello@WorldWideShades.com" style="color:#c8a165;text-decoration:none;">Hello@WorldWideShades.com</a>
      </p>
      <p style="margin:12px 0 0;font-size:11px;color:#bbb;">Mon–Fri 9am–6pm EST · Made in Brooklyn, NY</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── 1. Order Confirmation Email (to customer) ───────────────
export async function sendOrderConfirmation(order: any, items: any[]) {
  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
        <strong style="font-size:14px;color:#0c0c0c;">${item.shade_type}</strong><br>
        <span style="font-size:12px;color:#666;">
          ${item.fabric_name ? `${item.fabric_name} · ` : ""}${formatDimension(item.width, item.width_fraction)} W × ${formatDimension(item.height, item.height_fraction)} H<br>
          ${item.mount_type || ""} · ${item.control_type || ""}${item.motor_power ? ` (${item.motor_power})` : ""}<br>
          Qty: ${item.quantity}
        </span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700;color:#0c0c0c;">
        ${formatCurrency(Number(item.total_price))}
      </td>
    </tr>`
    )
    .join("");

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#dcfce7;border:1px solid #86efac;border-radius:50px;padding:6px 20px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">
        ✓ Order Confirmed
      </div>
    </div>

    <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0c0c0c;text-align:center;">Thank you for your order!</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#666;text-align:center;">Your custom shades are being prepared.</p>

    <div style="background:#f7f5f0;border-radius:8px;padding:16px;margin-bottom:24px;">
      <table style="width:100%;font-size:13px;color:#666;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;"><strong>Order Number</strong></td><td style="text-align:right;font-weight:700;color:#0c0c0c;">${order.order_number}</td></tr>
        <tr><td style="padding:4px 0;"><strong>Order Date</strong></td><td style="text-align:right;">${new Date(order.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td></tr>
        ${order.estimated_delivery ? `<tr><td style="padding:4px 0;"><strong>Estimated Delivery</strong></td><td style="text-align:right;">${order.estimated_delivery}</td></tr>` : ""}
      </table>
    </div>

    <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0c0c0c;text-transform:uppercase;letter-spacing:1px;">Your Shades</h3>
    <table style="width:100%;font-size:13px;" cellpadding="0" cellspacing="0">
      ${itemRows}
    </table>

    <div style="margin-top:16px;border-top:2px solid #0c0c0c;padding-top:12px;">
      <table style="width:100%;font-size:13px;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;color:#666;">Subtotal</td><td style="text-align:right;">${formatCurrency(Number(order.subtotal))}</td></tr>
        ${Number(order.sale_savings) > 0 ? `<tr><td style="padding:4px 0;color:#16a34a;font-weight:600;">Sale Discount</td><td style="text-align:right;color:#16a34a;font-weight:600;">-${formatCurrency(Number(order.sale_savings))}</td></tr>` : ""}
        ${Number(order.discount) > 0 ? `<tr><td style="padding:4px 0;color:#16a34a;font-weight:600;">Promo Discount</td><td style="text-align:right;color:#16a34a;font-weight:600;">-${formatCurrency(Number(order.discount))}</td></tr>` : ""}
        <tr><td style="padding:4px 0;color:#666;">Shipping</td><td style="text-align:right;color:#16a34a;font-weight:600;">FREE</td></tr>
        <tr><td style="padding:12px 0 0;font-size:18px;font-weight:800;color:#0c0c0c;">Total</td><td style="text-align:right;font-size:18px;font-weight:800;color:#0c0c0c;">${formatCurrency(Number(order.total))}</td></tr>
      </table>
    </div>

    ${Number(order.sale_savings) > 0 || Number(order.discount) > 0 ? `
    <div style="margin-top:16px;background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:12px 16px;text-align:center;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#16a34a;">✨ You saved ${formatCurrency(Number(order.sale_savings || 0) + Number(order.discount || 0))} vs. retail — factory-direct pricing.</p>
    </div>` : ""}

    <div style="margin-top:24px;text-align:center;">
      <p style="font-size:13px;color:#666;margin:0 0 16px;">Your shades enter production within 1 business day.</p>
      <a href="https://worldwideshades.com/track-order" style="display:inline-block;background:#c8a165;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Track Your Order</a>
    </div>

    <div style="margin-top:24px;padding:16px;background:#fdf9f5;border:1px solid #e5ddd0;border-radius:8px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#666;">Questions? Call <a href="tel:+18446742716" style="color:#c8a165;font-weight:600;">(844) 674-2716</a> or email <a href="mailto:Hello@WorldWideShades.com" style="color:#c8a165;font-weight:600;">Hello@WorldWideShades.com</a></p>
    </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: order.email,
      subject: `Order Confirmed — ${order.order_number} | World Wide Shades`,
      html: emailWrapper(content),
    });
    if (error) console.error("Order confirmation email failed:", error);
    return { success: !error, data, error };
  } catch (e) {
    console.error("Order confirmation email error:", e);
    return { success: false, error: e };
  }
}

// ─── 2. Status Update Email (to customer) ────────────────────
export async function sendStatusUpdate(order: any, newStatus: string, trackingNumber?: string, trackingUrl?: string) {
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    in_production: {
      title: "Your Shades Are in Production! 🏭",
      message: "Our craftsmen have started building your custom shades. Each shade is handcrafted to your exact specifications in our Brooklyn, NY factory.",
      color: "#f59e0b",
    },
    quality_check: {
      title: "Quality Check in Progress ✅",
      message: "Your shades have been built and are now going through our rigorous quality inspection. We check every seam, mechanism, and measurement before shipping.",
      color: "#8b5cf6",
    },
    shipped: {
      title: "Your Shades Have Shipped! 📦",
      message: "Great news — your custom shades are on their way to you!",
      color: "#06b6d4",
    },
    delivered: {
      title: "Your Shades Have Been Delivered! 🏠",
      message: "Your custom shades have arrived! We hope you love them. If you need help with installation, check out our guides below.",
      color: "#22c55e",
    },
  };

  const statusInfo = statusMessages[newStatus];
  if (!statusInfo) return { success: false, error: "No email for this status" };

  const trackingSection =
    newStatus === "shipped" && (trackingNumber || trackingUrl)
      ? `
    <div style="margin-top:20px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0369a1;">Tracking Information</p>
      ${trackingNumber ? `<p style="margin:0 0 4px;font-size:13px;color:#666;">Tracking #: <strong>${trackingNumber}</strong></p>` : ""}
      ${trackingUrl ? `<p style="margin:0;"><a href="${trackingUrl}" style="color:#c8a165;font-weight:600;font-size:13px;">Track Your Package →</a></p>` : ""}
    </div>`
      : "";

  const installSection =
    newStatus === "delivered"
      ? `
    <div style="margin-top:20px;">
      <p style="font-size:13px;font-weight:700;color:#0c0c0c;margin:0 0 8px;">Installation Resources</p>
      <a href="https://worldwideshades.com/guides/WWS-Roller-Shades-Installation-Guide_1.pdf" style="display:block;color:#c8a165;font-size:13px;margin-bottom:4px;">📄 Installation Guide (PDF)</a>
      <a href="https://worldwideshades.com/guides/WWS-Window-Measuring-Guide.pdf" style="display:block;color:#c8a165;font-size:13px;margin-bottom:4px;">📄 Measuring Guide (PDF)</a>
      <a href="https://worldwideshades.com/guides/WWS-Somfy_Remote_Programming_Guide.pdf" style="display:block;color:#c8a165;font-size:13px;">📄 Remote Programming Guide (PDF)</a>
    </div>`
      : "";

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:${statusInfo.color}18;border:1px solid ${statusInfo.color}40;border-radius:50px;padding:6px 20px;font-size:12px;font-weight:700;color:${statusInfo.color};text-transform:uppercase;letter-spacing:1px;">
        Order Update
      </div>
    </div>

    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#0c0c0c;text-align:center;">${statusInfo.title}</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#666;text-align:center;line-height:1.6;">${statusInfo.message}</p>

    <div style="background:#f7f5f0;border-radius:8px;padding:16px;margin-bottom:20px;">
      <table style="width:100%;font-size:13px;color:#666;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;"><strong>Order</strong></td><td style="text-align:right;font-weight:700;color:#0c0c0c;">${order.order_number}</td></tr>
        <tr><td style="padding:4px 0;"><strong>Total</strong></td><td style="text-align:right;">${formatCurrency(Number(order.total))}</td></tr>
      </table>
    </div>

    ${trackingSection}
    ${installSection}

    <div style="margin-top:24px;text-align:center;">
      <a href="https://worldwideshades.com/track-order" style="display:inline-block;background:#c8a165;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">View Order Status</a>
    </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: order.email,
      subject: `${statusInfo.title} — ${order.order_number} | World Wide Shades`,
      html: emailWrapper(content),
    });
    if (error) console.error("Status update email failed:", error);
    return { success: !error, data, error };
  } catch (e) {
    console.error("Status update email error:", e);
    return { success: false, error: e };
  }
}

// ─── 3. New Order Alert (to admin/WWS) ───────────────────────
export async function sendNewOrderAlert(order: any, items: any[]) {
  const itemList = items
    .map(
      (item) =>
        `<li style="margin-bottom:8px;font-size:13px;color:#333;">
          <strong>${item.shade_type}</strong> — ${item.fabric_name || "N/A"} — ${formatDimension(item.width, item.width_fraction)} × ${formatDimension(item.height, item.height_fraction)} — ${item.mount_type} — ${item.control_type}${item.motor_power ? ` (${item.motor_power})` : ""} — Qty ${item.quantity} — ${formatCurrency(Number(item.total_price))}
        </li>`
    )
    .join("");

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#dcfce7;border:1px solid #86efac;border-radius:50px;padding:6px 20px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">
        💰 New Order Received
      </div>
    </div>

    <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0c0c0c;text-align:center;">${order.order_number}</h2>
    <p style="margin:0 0 24px;font-size:24px;font-weight:800;color:#22c55e;text-align:center;">${formatCurrency(Number(order.total))}</p>

    <div style="background:#f7f5f0;border-radius:8px;padding:16px;margin-bottom:16px;">
      <h3 style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;">Customer</h3>
      <p style="margin:0;font-size:14px;color:#0c0c0c;"><strong>${order.shipping_first_name || ""} ${order.shipping_last_name || ""}</strong></p>
      <p style="margin:4px 0 0;font-size:13px;color:#666;">${order.email}</p>
      ${order.phone ? `<p style="margin:4px 0 0;font-size:13px;color:#666;">${order.phone}</p>` : ""}
      <p style="margin:4px 0 0;font-size:13px;color:#666;">${[order.shipping_address1, order.shipping_city, order.shipping_state, order.shipping_zip].filter(Boolean).join(", ")}</p>
    </div>

    <div style="margin-bottom:16px;">
      <h3 style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;">Items</h3>
      <ul style="margin:0;padding:0 0 0 16px;">${itemList}</ul>
    </div>

    <table style="width:100%;font-size:13px;margin-bottom:16px;" cellpadding="0" cellspacing="0">
      <tr><td style="padding:4px 0;color:#666;">Subtotal</td><td style="text-align:right;">${formatCurrency(Number(order.subtotal))}</td></tr>
      ${Number(order.sale_savings) > 0 ? `<tr><td style="padding:4px 0;color:#f59e0b;">Sale Discount (${order.sale_percent}%)</td><td style="text-align:right;color:#f59e0b;">-${formatCurrency(Number(order.sale_savings))}</td></tr>` : ""}
      ${Number(order.discount) > 0 ? `<tr><td style="padding:4px 0;color:#f59e0b;">Promo: ${order.promo_code || "—"}</td><td style="text-align:right;color:#f59e0b;">-${formatCurrency(Number(order.discount))}</td></tr>` : ""}
      <tr style="border-top:2px solid #0c0c0c;"><td style="padding:12px 0 0;font-size:16px;font-weight:800;">Total Charged</td><td style="text-align:right;font-size:16px;font-weight:800;color:#22c55e;">${formatCurrency(Number(order.total))}</td></tr>
    </table>

    <div style="text-align:center;">
      <a href="https://world-wide-shades-vercel-mpgarcia2003s-projects.vercel.app/admin/orders" style="display:inline-block;background:#0c0c0c;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">View in Admin →</a>
    </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `💰 New Order ${order.order_number} — ${formatCurrency(Number(order.total))} | ${order.shipping_first_name || ""} ${order.shipping_last_name || ""}`,
      html: emailWrapper(content),
    });
    if (error) console.error("Admin alert email failed:", error);
    return { success: !error, data, error };
  } catch (e) {
    console.error("Admin alert email error:", e);
    return { success: false, error: e };
  }
}
