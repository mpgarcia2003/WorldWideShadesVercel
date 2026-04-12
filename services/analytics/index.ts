/**
 * WWS ANALYTICS — Main Export
 * 
 * DISABLED: The old Supabase analytics pipeline has been replaced by GTM/GA4.
 * All event tracking now flows through lib/gtm/events.ts → GTM → GA4 + Google Ads.
 * 
 * wwsTracker is stubbed as a no-op so existing imports don't break.
 * builderHooks calls are safe — they're all no-ops.
 */

// No-op tracker stub — satisfies all existing .init() and .track() calls
const noOpTracker = {
  init() {},
  track(_eventName: string, _properties: Record<string, any> = {}) {},
};

export const wwsTracker = noOpTracker;

// No-op builderHooks — accepts any args so legacy callers never break
const noop = (..._args: any[]) => {};

export const builderHooks = {
  onBuilderOpened: noop,
  onShapeSelected: noop,
  onFabricViewed: noop,
  onFabricFiltered: noop,
  onFabricSelected: noop,
  onSizeEntered: noop,
  onMountSelected: noop,
  onControlSelected: noop,
  onAccessoryAdded: noop,
  onAccessoryRemoved: noop,
  onPriceCalculated: noop,
  onPriceShown: noop,
  onAddToCart: noop,
  onRemoveFromCart: noop,
  onCheckoutStarted: noop,
  onCheckoutCompleted: noop,
  onSwatchRequested: noop,
  onPhoneClicked: noop,
  onStepBackward: noop,
  onBuilderAbandoned: noop,
};

export { classifySource } from './sourceClassifier';
export type { TrafficSource } from './sourceClassifier';
