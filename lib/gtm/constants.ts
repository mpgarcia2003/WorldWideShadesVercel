export const GTM_EVENTS = {
  // ── Standard GA4 Ecommerce (Google requires these names) ──
  VIEW_ITEM: "view_item",
  SELECT_ITEM: "select_item",
  ADD_TO_CART: "add_to_cart",
  VIEW_CART: "view_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  ADD_SHIPPING_INFO: "add_shipping_info",
  ADD_PAYMENT_INFO: "add_payment_info",
  PURCHASE: "purchase",

  // ── Lead / Support ──
  GENERATE_LEAD: "generate_lead",
  PHONE_CLICK: "phone_click",

  // ── Custom Builder Funnel (analysis + remarketing only) ──
  BUILDER_START: "builder_start",
  SHAPE_SELECTED: "shape_selected",
  MEASUREMENTS_ENTERED: "measurements_entered",
  FABRIC_SELECTED: "fabric_selected",
  MOUNT_SELECTED: "mount_selected",
  CONTROL_SELECTED: "control_selected",
  BUILDER_COMPLETE: "builder_complete",

  // ── Other ──
  SWATCH_REQUEST: "swatch_request",
  CTA_CLICK: "cta_click",
  PAGE_VIEW: "page_view",
} as const;

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ Google Ads Conversion Structure                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ PRIMARY (bidding):     purchase                                │
 * │ SECONDARY (imported):  begin_checkout, add_to_cart,            │
 * │                        add_payment_info, generate_lead,        │
 * │                        phone_click                             │
 * │ AUDIENCE ONLY:         view_item, select_item, page_view,      │
 * │                        scroll, all builder_* events            │
 * └─────────────────────────────────────────────────────────────────┘
 */
