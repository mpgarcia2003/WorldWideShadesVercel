export const GTM_EVENTS = {
  VIEW_ITEM: "view_item",
  ADD_TO_CART: "add_to_cart",
  VIEW_CART: "view_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  ADD_SHIPPING_INFO: "add_shipping_info",
  ADD_PAYMENT_INFO: "add_payment_info",
  PURCHASE: "purchase",
  GENERATE_LEAD: "generate_lead",
  FORM_SUBMIT: "form_submit",
  CTA_CLICK: "cta_click",
  BUILDER_START: "builder_start",
  SWATCH_REQUEST: "swatch_request",
  CONSULTATION_REQUEST: "consultation_request",
  PAGE_VIEW: "page_view",
} as const;

/**
 * Event mapping reference:
 *
 * dataLayer event       | GA4                | Google Ads Conversion | Meta Pixel
 * ──────────────────────────────────────────────────────────────────────────────
 * view_item             | view_item          | —                     | ViewContent
 * add_to_cart           | add_to_cart        | —                     | AddToCart
 * begin_checkout        | begin_checkout     | Begin Checkout (2°)   | InitiateCheckout
 * purchase              | purchase           | Purchase (1°)         | Purchase
 * generate_lead         | generate_lead      | Lead (2°)             | Lead
 * cta_click             | cta_click          | —                     | —
 * builder_start         | builder_start      | —                     | —
 */
