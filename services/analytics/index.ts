/**
 * WWS ANALYTICS — Main Export
 * 
 * The old Supabase analytics pipeline is disabled.
 * GTM/GA4 tracking flows through lib/gtm/events.ts (untouched).
 * 
 * builderHooks now ALSO feed the independent behavior pipeline
 * (lib/tracking/behavior.ts) for step-level timing and analysis.
 * This does NOT touch window.dataLayer — completely separate.
 */

import { bhStepStart, bhStepComplete, bhTrack } from "@/lib/tracking/behavior";

// No-op tracker stub — wwsTracker.init() and .track() do nothing
const noOpTracker = {
  init() {},
  track(_eventName: string, _properties: Record<string, any> = {}) {},
};

export const wwsTracker = noOpTracker;

// builderHooks — feeds behavior pipeline for step timing
export const builderHooks = {
  onBuilderOpened(..._args: any[]) {
    bhStepStart("builder_open", 0);
  },
  onShapeSelected(shape: string, ..._args: any[]) {
    bhStepComplete("shape_select", 1, { shape });
    bhStepStart("dimensions", 2);
  },
  onFabricViewed(..._args: any[]) {},
  onFabricFiltered(..._args: any[]) {},
  onFabricSelected(fabricId: any, fabricName?: any, category?: any, ..._args: any[]) {
    bhStepComplete("fabric_select", 3, {
      fabric_id: fabricId,
      fabric_name: typeof fabricName === "string" ? fabricName : "",
      category: typeof category === "string" ? category : "",
    });
    bhStepStart("mount", 4);
  },
  onSizeEntered(w: number, h: number, ..._args: any[]) {
    bhStepComplete("dimensions_entered", 2, { width: w, height: h });
    bhStepStart("fabric", 3);
  },
  onMountSelected(mount: string, ..._args: any[]) {
    bhStepComplete("mount_select", 4, { mount });
    bhStepStart("control", 5);
  },
  onControlSelected(control: string, ..._args: any[]) {
    bhStepComplete("control_select", 5, { control });
  },
  onAccessoryAdded(..._args: any[]) {},
  onAccessoryRemoved(..._args: any[]) {},
  onPriceCalculated(..._args: any[]) {},
  onPriceShown(price: number, ..._args: any[]) {
    bhTrack("price_shown", { price });
  },
  onAddToCart(items: any[], ..._args: any[]) {
    bhStepComplete("add_to_cart", 7, {
      item_count: items?.length || 0,
      total: items?.reduce((sum: number, i: any) => sum + (i.price || 0), 0) || 0,
    });
  },
  onRemoveFromCart(id: string, price: number, ..._args: any[]) {
    bhTrack("remove_from_cart", { item_id: id, price });
  },
  onCheckoutStarted(total: number, itemCount: number, ..._args: any[]) {
    bhTrack("checkout_started", { total, item_count: itemCount });
  },
  onCheckoutCompleted(..._args: any[]) {},
  onSwatchRequested(..._args: any[]) {
    bhTrack("swatch_requested", {});
  },
  onPhoneClicked(..._args: any[]) {},
  onStepBackward(..._args: any[]) {
    bhTrack("step_backward", {});
  },
  onBuilderAbandoned(config: any, ..._args: any[]) {
    bhTrack("builder_abandoned", {
      furthest_step: config?.step || "unknown",
      shape: config?.shape || "",
    });
  },
};

export { classifySource } from "./sourceClassifier";
export type { TrafficSource } from "./sourceClassifier";
