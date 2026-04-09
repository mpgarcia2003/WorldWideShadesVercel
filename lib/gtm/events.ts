import { GTM_EVENTS } from "./constants";

declare global {
  interface Window { dataLayer: Record<string, unknown>[]; }
}

function push(data: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}

function clearEcommerce() { push({ ecommerce: null }); }

// ─── Item type for GA4 Enhanced Ecommerce ────────────────────
export interface GTMItem {
  item_id: string;
  item_name: string;
  item_category: string;    // e.g. "Blackout", "Light Filtering"
  item_variant?: string;    // e.g. fabric name
  price: number;
  quantity: number;
  item_brand?: string;
  // Custom dimensions
  dimension1?: string;      // mount type
  dimension2?: string;      // control type
  dimension3?: string;      // shape
}

// ─── Helper to build GTM item from shade config ──────────────
export function buildGTMItem(config: any, price: number): GTMItem {
  return {
    item_id: config.material?.id || "custom-shade",
    item_name: `Custom ${config.shadeType || "Roller"} Shade`,
    item_category: config.shadeType || "Roller Shade",
    item_variant: config.material?.name || "",
    item_brand: "World Wide Shades",
    price: price,
    quantity: config.quantity || 1,
    dimension1: config.mountType || "",
    dimension2: config.controlType || "",
    dimension3: config.shape || "Standard",
  };
}

// ═══════════════════════════════════════════════════════════════
// STANDARD GA4 ECOMMERCE EVENTS
// ═══════════════════════════════════════════════════════════════

/** Fires when user opens builder or views a product */
export function trackViewItem(item: GTMItem) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.VIEW_ITEM,
    ecommerce: { currency: "USD", value: item.price, items: [item] },
  });
}

/** Fires when user selects a fabric */
export function trackSelectItem(item: GTMItem, listName?: string) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.SELECT_ITEM,
    ecommerce: {
      currency: "USD",
      item_list_name: listName || "Fabric Selection",
      items: [item],
    },
  });
}

/** Fires when user clicks "Add to Cart" in builder */
export function trackAddToCart(items: GTMItem[], value: number) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.ADD_TO_CART,
    ecommerce: { currency: "USD", value, items },
  });
}

/** Fires when user lands on /checkout with items */
export function trackBeginCheckout(items: GTMItem[], value: number) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.BEGIN_CHECKOUT,
    ecommerce: { currency: "USD", value, items },
  });
}

/** Fires when Stripe PaymentElement is interacted with */
export function trackAddPaymentInfo(items: GTMItem[], value: number) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.ADD_PAYMENT_INFO,
    ecommerce: { currency: "USD", payment_type: "card", value, items },
  });
}

/** Fires after successful Stripe payment — THE primary conversion */
export function trackPurchase(
  transactionId: string,
  value: number,
  items: GTMItem[],
  extras?: { tax?: number; shipping?: number; coupon?: string; discount?: number }
) {
  clearEcommerce();
  push({
    event: GTM_EVENTS.PURCHASE,
    ecommerce: {
      transaction_id: transactionId,
      value,
      currency: "USD",
      tax: extras?.tax || 0,
      shipping: extras?.shipping || 0,
      coupon: extras?.coupon || "",
      discount: extras?.discount || 0,
      items,
    },
  });
}

// ═══════════════════════════════════════════════════════════════
// LEAD / SUPPORT EVENTS
// ═══════════════════════════════════════════════════════════════

/** Fires when user requests free fabric swatches */
export function trackGenerateLead(formName: string, value = 5) {
  push({
    event: GTM_EVENTS.GENERATE_LEAD,
    form_name: formName,
    value,
    currency: "USD",
  });
}

/** Fires when user clicks phone number CTA */
export function trackPhoneClick(location: string) {
  push({
    event: GTM_EVENTS.PHONE_CLICK,
    click_location: location,
    phone_number: "(844) 674-2716",
  });
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM BUILDER FUNNEL EVENTS (audience + analysis only)
// ═══════════════════════════════════════════════════════════════

/** Fires when builder loads */
export function trackBuilderStart(entryPoint: string) {
  push({
    event: GTM_EVENTS.BUILDER_START,
    entry_point: entryPoint,
  });
}

/** Step 1: Shape selected */
export function trackShapeSelected(shape: string) {
  push({
    event: GTM_EVENTS.SHAPE_SELECTED,
    shade_shape: shape,
    builder_step: 1,
  });
}

/** Step 2: Measurements entered */
export function trackMeasurementsEntered(width: number, height: number, widthFrac?: string, heightFrac?: string) {
  push({
    event: GTM_EVENTS.MEASUREMENTS_ENTERED,
    shade_width: width,
    shade_height: height,
    shade_width_fraction: widthFrac || "0",
    shade_height_fraction: heightFrac || "0",
    builder_step: 2,
  });
}

/** Step 3: Fabric selected */
export function trackFabricSelected(fabricName: string, fabricCategory: string, priceGroup: string) {
  push({
    event: GTM_EVENTS.FABRIC_SELECTED,
    fabric_name: fabricName,
    fabric_category: fabricCategory,
    fabric_price_group: priceGroup,
    builder_step: 3,
  });
}

/** Step 4: Mount type selected */
export function trackMountSelected(mountType: string) {
  push({
    event: GTM_EVENTS.MOUNT_SELECTED,
    mount_type: mountType,
    builder_step: 4,
  });
}

/** Step 5: Control type selected */
export function trackControlSelected(controlType: string, motorPower?: string) {
  push({
    event: GTM_EVENTS.CONTROL_SELECTED,
    control_type: controlType,
    motor_power: motorPower || "",
    builder_step: 5,
  });
}

/** All builder steps complete — ready to add to cart */
export function trackBuilderComplete(config: any, totalPrice: number) {
  push({
    event: GTM_EVENTS.BUILDER_COMPLETE,
    shade_type: config.shadeType || "Roller",
    shade_shape: config.shape || "Standard",
    fabric_name: config.material?.name || "",
    mount_type: config.mountType || "",
    control_type: config.controlType || "",
    shade_price: totalPrice,
    builder_step: "complete",
  });
}

/** Swatch request */
export function trackSwatchRequest(fabrics: string[]) {
  push({
    event: GTM_EVENTS.SWATCH_REQUEST,
    fabrics_requested: fabrics.join(", "),
    fabric_count: fabrics.length,
  });
  // Also fire generate_lead for Google Ads
  trackGenerateLead("swatch_request", 5);
}

/** Generic CTA click */
export function trackCTAClick(ctaLabel: string, ctaLocation: string, ctaDestination?: string) {
  push({
    event: GTM_EVENTS.CTA_CLICK,
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
}
