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

export interface GTMItem {
  item_id: string;
  item_name: string;
  item_category: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

export function trackViewItem(item: GTMItem) {
  clearEcommerce();
  push({ event: GTM_EVENTS.VIEW_ITEM, ecommerce: { currency: "USD", value: item.price, items: [item] } });
}

export function trackAddToCart(items: GTMItem[], value: number) {
  clearEcommerce();
  push({ event: GTM_EVENTS.ADD_TO_CART, ecommerce: { currency: "USD", value, items } });
}

export function trackBeginCheckout(items: GTMItem[], value: number) {
  clearEcommerce();
  push({ event: GTM_EVENTS.BEGIN_CHECKOUT, ecommerce: { currency: "USD", value, items } });
}

export function trackPurchase(transactionId: string, value: number, items: GTMItem[]) {
  clearEcommerce();
  push({ event: GTM_EVENTS.PURCHASE, ecommerce: { transaction_id: transactionId, value, currency: "USD", items } });
}

export function trackGenerateLead(formName: string, value = 0) {
  push({ event: GTM_EVENTS.GENERATE_LEAD, form_name: formName, value, currency: "USD" });
}

export function trackCTAClick(ctaLabel: string, ctaLocation: string, ctaDestination?: string) {
  push({ event: GTM_EVENTS.CTA_CLICK, cta_label: ctaLabel, cta_location: ctaLocation, cta_destination: ctaDestination });
}

export function trackBuilderStart(entryPoint: string) {
  push({ event: GTM_EVENTS.BUILDER_START, entry_point: entryPoint });
}

export function trackSwatchRequest(fabrics: string[]) {
  push({ event: GTM_EVENTS.SWATCH_REQUEST, fabrics_requested: fabrics.join(", "), fabric_count: fabrics.length });
}

export function trackConsultationRequest() {
  push({ event: GTM_EVENTS.CONSULTATION_REQUEST });
}
