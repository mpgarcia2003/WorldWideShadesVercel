/**
 * WWS ANALYTICS — Main Export
 * 
 * DISABLED: The old Supabase analytics pipeline has been replaced by GTM/GA4.
 * All event tracking now flows through lib/gtm/events.ts → GTM → GA4 + Google Ads.
 * 
 * wwsTracker is stubbed as a no-op so existing imports don't break.
 * builderHooks calls are safe — they call the no-op tracker.
 */

// No-op tracker stub — satisfies all existing .init() and .track() calls
const noOpTracker = {
  init() {},
  track(_eventName: string, _properties: Record<string, any> = {}) {},
};

export const wwsTracker = noOpTracker;

// builderHooks still exported but all calls go to noOpTracker
export const builderHooks = {
  onBuilderOpened() {},
  onShapeSelected(_shape: string) {},
  onFabricViewed(_fabricId: string, _fabricName: string, _category: string) {},
  onFabricFiltered(_filters: string[]) {},
  onFabricSelected(_fabric: any, _viewedCount?: number, _timeMs?: number) {},
  onSizeEntered(_w: number, _h: number, _shape?: string) {},
  onMountSelected(_mount: string) {},
  onControlSelected(_control: string) {},
  onAccessoryAdded(_acc: string, _price: number) {},
  onAccessoryRemoved(_acc: string) {},
  onPriceCalculated(_price: number, _config: any) {},
  onAddToCart(_items: any[]) {},
  onRemoveFromCart(_id: string, _price: number) {},
  onCheckoutStarted(_total: number, _itemCount: number) {},
  onCheckoutCompleted(_orderId: string, _total: number) {},
  onSwatchRequested(_fabricIds: string[]) {},
  onPhoneClicked(_location: string) {},
};

export { classifySource } from './sourceClassifier';
export type { TrafficSource } from './sourceClassifier';
