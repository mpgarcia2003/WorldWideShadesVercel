import { Order, CartItem, Fabric } from '../types';
import { getEmailSettings } from './storage';
import { getFabricUrl } from '../constants';
import emailjs from '@emailjs/browser';

/**
 * Generates a high-end HTML email that mimics the App's Cart Drawer UI.
 * Designed for maximum compatibility with Gmail, Outlook, and Apple Mail.
 */
const generateStyledOrderEmail = (order: Order, title: string, ctaUrl?: string): string => {
  const itemsHtml = order.items.map((item) => {
    const isService = item.config.isMeasurementOnly;
    const name = isService ? 'Pro Measurement Service' : item.config.material?.name || 'Custom Shade';
    const imgUrl = item.config.material 
      ? getFabricUrl(item.config.material.cloudinaryId, 'thumb') 
      : 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1761756245/woocommerce-placeholder.webp';

    let details = '';
    if (!isService) {
        const wFrac = item.config.widthFraction !== '0' ? ` ${item.config.widthFraction}` : '';
        const hFrac = item.config.heightFraction !== '0' ? ` ${item.config.heightFraction}` : '';
        const size = `${item.config.width}${wFrac}" x ${item.config.height}${hFrac}"`;
        details = `
            <div style="color: #64748b; font-size: 12px; margin-top: 2px;">${size}</div>
            <div style="color: #94a3b8; font-size: 11px; margin-top: 1px;">${item.config.mountType}</div>
            <div style="color: #94a3b8; font-size: 11px;">Manual Metal Chain</div>
        `;
    } else {
        details = `<div style="color: #64748b; font-size: 12px;">Location: ${item.config.installer?.location}</div>`;
    }

    return `
      <!-- Item Card -->
      <div style="background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 16px; margin-bottom: 12px; display: block;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="80" valign="top">
              <div style="width: 80px; height: 80px; background-color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #f1f5f9;">
                <img src="${imgUrl}" width="80" height="80" style="display: block; object-fit: cover; border-radius: 12px;" alt="Product" />
              </div>
            </td>
            <td style="padding-left: 16px;" valign="top">
              <div style="color: #0f172a; font-weight: 700; font-size: 14px; line-height: 1.2;">${name}</div>
              ${details}
              <div style="color: #0f172a; font-weight: 800; font-size: 16px; margin-top: 8px;">$${item.totalPrice.toFixed(2)}</div>
            </td>
          </tr>
        </table>
      </div>
    `;
  }).join('');

  const monthlyPrice = (order.total / 12).toFixed(2);

  return `
<div style="background-color: #f8fafc; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="max-width: 440px; width: 100%; background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0; text-align: left;">
          
          <!-- Header -->
          <div style="padding: 24px; border-bottom: 1px solid #f1f5f9;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <span style="font-weight: 800; font-size: 18px; color: #0f172a;">${title} (${order.items.length})</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Items List -->
          <div style="padding: 20px; background-color: #ffffff;">
            ${itemsHtml}
          </div>

          <!-- Summary Section -->
          <div style="padding: 24px; border-top: 1px solid #f1f5f9; background-color: #ffffff;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
              <tr>
                <td valign="bottom">
                  <div style="color: #64748b; font-size: 13px; font-weight: 500; margin-bottom: 4px;">Subtotal</div>
                  <div style="color: #94a3b8; font-size: 11px;">
                    Starting at <span style="color: #4f46e5; font-weight: 700;">$${monthlyPrice}/mo</span> with 
                    <span style="font-style: italic; font-weight: 700; color: #0f172a;">affirm</span>
                  </div>
                </td>
                <td align="right" valign="bottom">
                  <div style="color: #0f172a; font-weight: 900; font-size: 32px;">$${order.total.toFixed(2)}</div>
                </td>
              </tr>
            </table>

            ${ctaUrl ? `
            <div style="text-align: center;">
              <a href="${ctaUrl}" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 18px; border-radius: 14px; display: block; text-align: center; font-weight: 700; font-size: 16px; margin-top: 10px;">
                Checkout Your Configuration &nbsp; <span style="font-size: 18px;">→</span>
              </a>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800;">
                    🛡️ Secure SSL Checkout
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Email Footer -->
        <div style="max-width: 440px; width: 100%; margin: 24px auto 0; text-align: center; padding: 0 20px;">
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0;">
            Questions about your custom shades? <br/>
            Reply to this email or visit <a href="https://worldwide-shades.com" style="color: #4f46e5; text-decoration: none; font-weight: 600;">worldwide-shades.com</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>
  `;
};

export const sendOrderConfirmation = async (order: Order, overrideEmail?: string) => {
  const settings = getEmailSettings();
  const templateId = settings.customerTemplateId || settings.adminTemplateId;
  if (!settings.serviceId || !settings.publicKey || !templateId) return false;

  try {
    const htmlBody = generateStyledOrderEmail(order, "Order Confirmation");
    const targetEmail = overrideEmail || order.customer.email;

    const templateParams = {
      order_id: order.id,
      to_name: order.customer.firstName,
      to_email: targetEmail,
      email: targetEmail,
      order_total: order.total.toFixed(2),
      item_count: order.items.length,
      order_date: new Date(order.date).toLocaleDateString(),
      message_html: htmlBody,
      shipping_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}`
    };

    await emailjs.send(settings.serviceId, templateId, templateParams, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('FAILED to send customer email:', error?.text || error?.message || JSON.stringify(error) || error);
    return false;
  }
};

export const sendAdminNotification = async (order: Order, overrideEmail?: string) => {
  const settings = getEmailSettings();
  if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

  const targetEmail = overrideEmail || settings.adminEmail || 'hello@worldwideshades.com';

  try {
    const fullHtmlBody = generateStyledOrderEmail(order, "New Order Notification");
    const templateParams = {
      order_id: order.id,
      customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone || 'N/A',
      order_total: order.total.toFixed(2),
      message_html: fullHtmlBody, 
      shipping_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}`,
      to_email: targetEmail,
      email: targetEmail, 
    };

    await emailjs.send(settings.serviceId, settings.adminTemplateId, templateParams, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('FAILED to send admin notification:', error?.text || error?.message || JSON.stringify(error) || error);
    return false;
  }
};

export const sendQuoteRequest = async (order: Order) => {
    const settings = getEmailSettings();
    if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

    try {
        const fullHtmlBody = generateStyledOrderEmail(order, "Bulk Quote Request");
        const templateParams = {
            order_id: `QUOTE-${order.id}`,
            customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
            customer_email: order.customer.email,
            customer_phone: order.customer.phone || 'N/A',
            order_total: order.total.toFixed(2),
            message_html: fullHtmlBody, 
            shipping_address: "Quote Request",
            to_email: settings.adminEmail || 'hello@worldwideshades.com',
            email: settings.adminEmail || 'hello@worldwideshades.com',
        };
        await emailjs.send(settings.serviceId, settings.adminTemplateId, templateParams, settings.publicKey);
        return true;
    } catch (error: any) {
        console.error("Quote request failed:", error?.text || error?.message || JSON.stringify(error) || error);
        return false;
    }
}

// --- SHOPIFY CHECKOUT ADMIN NOTIFICATION ---
export const notifyAdminShopifyCheckout = async (request: {
  cart: { config: any; totalPrice: number }[];
  swatches: { name: string; category: string }[];
  checkoutUrl: string;
}) => {
  const settings = getEmailSettings();
  if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

  const orderTotal = request.cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const itemSummary = request.cart.map(item => {
    const name = item.config.isMeasurementOnly ? 'Pro Measurement' : (item.config.material?.name || 'Custom Shade');
    const dims = item.config.isMeasurementOnly ? '' : ` (${item.config.width}\" x ${item.config.height}\")`;
    return `${name}${dims} x${item.config.quantity} &mdash; ${item.totalPrice.toFixed(2)}`;
  }).join('<br/>');
  const swatchSummary = request.swatches.length > 0 
    ? `<br/><br/>\ud83c\udfa8 <strong>Free Swatches (${request.swatches.length}):</strong><br/>` + request.swatches.map(s => `&bull; ${s.name} (${s.category})`).join('<br/>') 
    : '';

  const htmlBody = `
<div style="background-color:#f8fafc;padding:40px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
    <div style="max-width:440px;width:100%;background:#fff;border-radius:24px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #e2e8f0;text-align:left;">
      <div style="padding:24px;border-bottom:1px solid #f1f5f9;">
        <span style="font-weight:800;font-size:18px;color:#0f172a;">\ud83d\uded2 New Shopify Checkout Started</span>
      </div>
      <div style="padding:20px;">
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:16px;padding:16px;margin-bottom:12px;">
          <div style="font-weight:700;font-size:14px;color:#065f46;">Customer sent to Shopify checkout</div>
          <div style="font-size:13px;color:#047857;margin-top:4px;">Total: ${orderTotal.toFixed(2)} | ${request.cart.length} item(s)</div>
        </div>
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:16px;">
          <div style="font-weight:700;font-size:13px;color:#0f172a;margin-bottom:8px;">Items</div>
          <div style="font-size:12px;color:#64748b;line-height:1.8;">${itemSummary}${swatchSummary}</div>
        </div>
      </div>
    </div>
  </td></tr></table>
</div>`;

  try {
    const targetEmail = settings.adminEmail || 'hello@worldwideshades.com';
    await emailjs.send(settings.serviceId, settings.adminTemplateId, {
      order_id: 'SHOPIFY-' + Date.now(),
      customer_name: 'Shopify Checkout',
      to_email: targetEmail,
      email: targetEmail,
      order_total: orderTotal.toFixed(2),
      item_count: request.cart.length,
      message_html: htmlBody,
      shipping_address: 'Redirected to Shopify',
    }, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('Shopify checkout admin notification failed:', error?.text || error?.message || error);
    return false;
  }
};

// --- ADMIN LEAD NOTIFICATIONS ---

export const notifyAdminSwatchRequest = async (request: {
  name: string;
  email: string;
  address: string;
  city_state_zip: string;
  fabrics: { id: string; name: string; category: string }[];
}) => {
  const settings = getEmailSettings();
  if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

  const fabricList = request.fabrics.map(f => `• ${f.name} (${f.category})`).join('<br/>');
  const htmlBody = `
<div style="background-color:#f8fafc;padding:40px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
    <div style="max-width:440px;width:100%;background:#fff;border-radius:24px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #e2e8f0;text-align:left;">
      <div style="padding:24px;border-bottom:1px solid #f1f5f9;">
        <span style="font-weight:800;font-size:18px;color:#0f172a;">🎨 New Swatch Request</span>
      </div>
      <div style="padding:20px;">
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:16px;margin-bottom:12px;">
          <div style="font-weight:700;font-size:14px;color:#0f172a;margin-bottom:8px;">${request.name}</div>
          <div style="font-size:13px;color:#64748b;">📧 ${request.email}</div>
          <div style="font-size:13px;color:#64748b;margin-top:4px;">📍 ${request.address}, ${request.city_state_zip}</div>
        </div>
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:16px;">
          <div style="font-weight:700;font-size:13px;color:#0f172a;margin-bottom:8px;">Fabrics Requested (${request.fabrics.length})</div>
          <div style="font-size:12px;color:#64748b;line-height:1.8;">${fabricList}</div>
        </div>
      </div>
    </div>
  </td></tr></table>
</div>`;

  try {
    const targetEmail = settings.adminEmail || 'hello@worldwideshades.com';
    await emailjs.send(settings.serviceId, settings.adminTemplateId, {
      order_id: 'SWATCH-' + Date.now(),
      customer_name: request.name,
      customer_email: request.email,
      to_email: targetEmail,
      email: targetEmail,
      order_total: '0.00',
      message_html: htmlBody,
      shipping_address: request.address + ', ' + request.city_state_zip,
    }, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('Swatch admin notification failed:', error?.text || error?.message || error);
    return false;
  }
};

export const notifyAdminConsultation = async (request: {
  phone: string;
  preferred_time: string;
}) => {
  const settings = getEmailSettings();
  if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

  const htmlBody = `
<div style="background-color:#f8fafc;padding:40px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
    <div style="max-width:440px;width:100%;background:#fff;border-radius:24px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #e2e8f0;text-align:left;">
      <div style="padding:24px;border-bottom:1px solid #f1f5f9;">
        <span style="font-weight:800;font-size:18px;color:#0f172a;">📞 Design Expert Call Request</span>
      </div>
      <div style="padding:20px;">
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:20px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#0f172a;margin-bottom:8px;">${request.phone}</div>
          <div style="font-size:14px;color:#64748b;">Preferred time: <strong style="color:#0f172a;">${request.preferred_time}</strong></div>
          <div style="margin-top:16px;background:#c8a165;color:#fff;padding:12px 24px;border-radius:12px;display:inline-block;font-weight:700;font-size:14px;">
            Call This Customer
          </div>
        </div>
      </div>
    </div>
  </td></tr></table>
</div>`;

  try {
    const targetEmail = settings.adminEmail || 'hello@worldwideshades.com';
    await emailjs.send(settings.serviceId, settings.adminTemplateId, {
      order_id: 'CONSULT-' + Date.now(),
      to_name: `📞 ${request.phone}`,
      customer_name: `📞 ${request.phone} — Call in the ${request.preferred_time}`,
      customer_email: request.phone,
      customer_phone: request.phone,
      to_email: targetEmail,
      email: targetEmail,
      order_total: '0.00',
      item_count: 0,
      message_html: htmlBody,
      shipping_address: `Call in the ${request.preferred_time} — Phone: ${request.phone}`,
    }, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('Consultation admin notification failed:', error?.text || error?.message || error);
    return false;
  }
};

export const notifyAdminExitIntent = async (request: {
  email: string;
  stepsCompleted: number;
  config: any;
  recoveryUrl?: string;
  price?: number;
}) => {
  const settings = getEmailSettings();
  if (!settings.serviceId || !settings.publicKey || !settings.adminTemplateId) return false;

  const shape = request.config?.shape || 'Unknown';
  const fabric = request.config?.material?.name || 'Not selected';
  const price = request.price || 0;

  const htmlBody = `
<div style="background-color:#f8fafc;padding:40px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
    <div style="max-width:440px;width:100%;background:#fff;border-radius:24px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #e2e8f0;text-align:left;">
      <div style="padding:24px;border-bottom:1px solid #f1f5f9;">
        <span style="font-weight:800;font-size:18px;color:#0f172a;">🚪 Abandoned Configuration Saved</span>
      </div>
      <div style="padding:20px;">
        <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:16px;padding:16px;margin-bottom:12px;">
          <div style="font-weight:700;font-size:14px;color:#92400e;">Customer left during configuration</div>
          <div style="font-size:13px;color:#a16207;margin-top:4px;">They saved their progress — follow up to close!</div>
        </div>
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:16px;">
          <div style="font-size:13px;color:#64748b;line-height:2;">
            📧 <strong style="color:#0f172a;">${request.email}</strong><br/>
            💰 Estimated: <strong>${price.toFixed(2)}</strong><br/>
            📊 Steps completed: <strong>${request.stepsCompleted} of 8</strong><br/>
            🔷 Shape: <strong>${shape}</strong><br/>
            🎨 Fabric: <strong>${fabric}</strong>
          </div>
        </div>
        ${request.recoveryUrl ? `
        <div style="margin-top:16px;text-align:center;">
          <a href="${request.recoveryUrl}" style="background:#c8a165;color:#fff;text-decoration:none;padding:14px 24px;border-radius:12px;display:inline-block;font-weight:700;font-size:14px;">
            View Their Configuration →
          </a>
        </div>` : ''}
      </div>
    </div>
  </td></tr></table>
</div>`;

  try {
    const targetEmail = settings.adminEmail || 'hello@worldwideshades.com';
    await emailjs.send(settings.serviceId, settings.adminTemplateId, {
      order_id: 'ABANDON-' + Date.now(),
      customer_name: request.email,
      customer_email: request.email,
      to_name: request.email,
      to_email: targetEmail,
      email: targetEmail,
      order_total: price.toFixed(2),
      item_count: 1,
      share_url: request.recoveryUrl || '',
      message_html: htmlBody,
      shipping_address: `${shape} | ${fabric} | ${request.stepsCompleted} steps`,
    }, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('Exit intent admin notification failed:', error?.text || error?.message || error);
    return false;
  }
};

// --- PRECISION QUOTE EMAIL (sends to CUSTOMER) ---
export const sendCustomerQuoteEmail = async (request: {
  email: string;
  quoteId: string;
  discountCode: string;
  shape: string;
  fabric: string;
  size: string;
  price: number;
  recoveryUrl: string;
}) => {
  const settings = getEmailSettings();
  // All emails use WWS Outlook service (service_m9n45oo)
  // SPF record must include ip4:205.220.189.73 for Gmail delivery
  const templateId = 'template_9ciknab';
  if (!settings.serviceId || !settings.publicKey) {
    console.error('Missing EmailJS config for customer quote email');
    return false;
  }

  const monthlyPrice = (request.price / 12).toFixed(2);

  const htmlBody = `
<div style="background-color:#f8fafc;padding:40px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
    <div style="max-width:480px;width:100%;background:#fff;border-radius:24px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #e2e8f0;text-align:left;">
      
      <!-- Gold Header -->
      <div style="background:linear-gradient(135deg,#1a1814,#28231b);padding:32px 24px;border-radius:24px 24px 0 0;text-align:center;">
        <div style="color:#c8a165;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;margin-bottom:8px;">✦ Precision Matters</div>
        <div style="color:#fff;font-size:22px;font-weight:400;font-family:Georgia,serif;line-height:1.3;">Your Custom ${request.shape} Shade<br/>Configuration Is Saved</div>
      </div>

      <!-- Config Details -->
      <div style="padding:24px;">
        <div style="background:#f8fafc;border:1px solid #f1f5f9;border-radius:16px;padding:20px;margin-bottom:16px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:6px 0;color:#64748b;font-size:12px;font-weight:500;">Shape</td>
              <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:700;text-align:right;">${request.shape}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#64748b;font-size:12px;font-weight:500;">Fabric</td>
              <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:700;text-align:right;">${request.fabric}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#64748b;font-size:12px;font-weight:500;">Size</td>
              <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:700;text-align:right;">${request.size}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;border-top:1px solid #f1f5f9;color:#64748b;font-size:12px;font-weight:500;">Estimated Price</td>
              <td style="padding:6px 0;border-top:1px solid #f1f5f9;color:#0f172a;font-size:18px;font-weight:900;text-align:right;">${request.price.toFixed(2)}</td>
            </tr>
          </table>
          <div style="text-align:right;color:#94a3b8;font-size:11px;margin-top:4px;">or ${monthlyPrice}/mo with affirm</div>
        </div>

        <!-- Discount Code -->
        <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:2px dashed #f59e0b;border-radius:16px;padding:20px;text-align:center;margin-bottom:20px;">
          <div style="color:#92400e;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Your Exclusive 10% Discount</div>
          <div style="background:#fff;border-radius:8px;padding:10px 20px;display:inline-block;">
            <span style="font-size:22px;font-weight:900;color:#0f172a;letter-spacing:0.08em;font-family:monospace;">${request.discountCode}</span>
          </div>
          <div style="color:#a16207;font-size:11px;margin-top:8px;">Valid for 48 hours on your saved configuration</div>
        </div>

        <!-- CTA Button -->
        <a href="${request.recoveryUrl}" style="background:linear-gradient(135deg,#c8a165,#b8914f);color:#fff;text-decoration:none;padding:16px;border-radius:14px;display:block;text-align:center;font-weight:700;font-size:15px;">
          Continue My Custom Shade &nbsp;→
        </a>

        <div style="text-align:center;margin-top:16px;color:#94a3b8;font-size:11px;">This link will restore your exact configuration</div>
      </div>

      <!-- Footer -->
      <div style="padding:20px 24px;border-top:1px solid #f1f5f9;text-align:center;">
        <p style="color:#94a3b8;font-size:11px;margin:0;">Questions? Reply to this email or call us at (844) 674-2716</p>
        <p style="color:#cbd5e1;font-size:10px;margin:8px 0 0;">World Wide Shades — Custom window treatments, factory direct</p>
      </div>
    </div>
  </td></tr></table>
</div>`;

  try {
    await emailjs.send(settings.serviceId, templateId, {
      order_id: request.quoteId,
      to_name: 'Valued Customer',
      to_email: request.email,
      email: request.email,
      order_total: request.price.toFixed(2),
      item_count: 1,
      share_url: request.recoveryUrl,
      order_date: new Date().toLocaleDateString(),
      message_html: htmlBody,
      shipping_address: 'Saved Quote - ' + request.shape,
    }, settings.publicKey);
    return true;
  } catch (error: any) {
    console.error('Customer quote email failed:', error?.text || error?.message || error);
    return false;
  }
};

// FIX: Updated signature to explicitly include shareUrl as the 4th argument.
export const shareCartByEmail = async (cart: CartItem[], swatches: Fabric[], targetEmail: string, shareUrl: string) => {
    const settings = getEmailSettings();
    const templateId = settings.customerTemplateId || settings.adminTemplateId;
    if (!settings.serviceId || !settings.publicKey || !templateId) {
        console.error("Missing EmailJS configuration in settings.");
        return false;
    }

    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const mockOrder: Order = {
        id: `DRAFT-${Math.floor(Math.random() * 9000) + 1000}`,
        customer: { firstName: 'Partner', lastName: 'Review', email: targetEmail, address: 'N/A', city: '', state: '', zip: '' },
        items: cart,
        swatches: swatches,
        customizations: {}, 
        total: total,
        status: 'Received',
        date: new Date().toISOString(),
        paymentMethod: 'N/A'
    };

    const htmlBody = generateStyledOrderEmail(mockOrder, "Your Custom Shades", shareUrl);

    try {
        const templateParams = {
            order_id: mockOrder.id,
            to_name: "Design Partner",
            to_email: targetEmail,
            email: targetEmail,
            order_total: total.toFixed(2),
            item_count: cart.length,
            share_url: shareUrl,
            order_date: new Date(mockOrder.date).toLocaleDateString(),
            message_html: htmlBody,
            shipping_address: "Not Provided Yet"
        };
        await emailjs.send(settings.serviceId, templateId, templateParams, settings.publicKey);
        return true;
    } catch (error: any) {
        console.error("Failed to share cart email:", error?.text || error?.message || JSON.stringify(error) || error);
        return false;
    }
}