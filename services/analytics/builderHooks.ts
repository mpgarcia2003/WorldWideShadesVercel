/**
 * BUILDER HOOKS
 * -------------
 * Pre-built tracking functions for shade builder events.
 * These wrap wwsTracker.track() with the right event names and properties
 * so you just call them at the right moment in Builder.tsx.
 * 
 * Usage:
 *   import { builderHooks } from './services/analytics/builderHooks';
 *   builderHooks.onShapeSelected('Pentagon');
 *   builderHooks.onFabricSelected(fabric, fabricsViewedCount, timeSpentMs);
 */

import { wwsTracker } from './tracker';

// Track time spent on each step
let stepStartTime: Record<string, number> = {};

function startStepTimer(step: string) {
  stepStartTime[step] = Date.now();
}

function getStepDuration(step: string): number {
  if (!stepStartTime[step]) return 0;
  return Math.round((Date.now() - stepStartTime[step]) / 1000);
}

export const builderHooks = {

  // ============ BUILDER LIFECYCLE ============

  onBuilderOpened() {
    wwsTracker.track('builder_opened');
    startStepTimer('builder');
  },

  // ============ SHAPE ============

  onShapeSelected(shape: string) {
    wwsTracker.track('builder_shape_selected', { shape });
    startStepTimer('shape');
  },

  // ============ FABRIC ============

  // Call this every time they view a fabric swatch
  onFabricViewed(fabricId: string, fabricName: string, category: string) {
    wwsTracker.track('builder_fabric_viewed', {
      fabric_id: fabricId,
      fabric_name: fabricName,
      fabric_category: category,
    });
  },

  // Call when they filter fabrics
  onFabricFiltered(filters: string[]) {
    wwsTracker.track('builder_fabric_filtered', {
      filters,
      filter_count: filters.length,
    });
  },

  // Call when they actually select a fabric
  onFabricSelected(
    fabricId: string, 
    fabricName: string, 
    category: string,
    fabricsViewedCount: number,
    timeOnFabricStepMs: number
  ) {
    wwsTracker.track('builder_fabric_selected', {
      fabric_id: fabricId,
      fabric_name: fabricName,
      fabric_category: category,
      fabrics_viewed_before_selecting: fabricsViewedCount,
      time_to_decide_seconds: Math.round(timeOnFabricStepMs / 1000),
    });
    startStepTimer('fabric');
  },

  // Track when they start browsing fabrics (to measure time)
  onFabricStepEntered() {
    startStepTimer('fabric_browsing');
  },

  // ============ SIZE ============

  onSizeEntered(width: number, height: number, shape: string, widthFraction?: string, heightFraction?: string) {
    wwsTracker.track('builder_size_entered', {
      width,
      height,
      width_fraction: widthFraction || '0',
      height_fraction: heightFraction || '0',
      shape,
      is_specialty: shape !== 'Standard',
      time_on_size_step: getStepDuration('fabric'),
    });
    startStepTimer('size');
  },

  // ============ MOUNT ============

  onMountSelected(mountType: string) {
    wwsTracker.track('builder_mount_selected', {
      mount_type: mountType,
      time_on_mount_step: getStepDuration('size'),
    });
    startStepTimer('mount');
  },

  // ============ OPTIONS ============

  onOptionsCompleted(options: {
    controlType: string;
    controlPosition: string;
    rollType: string;
    bottomBar: string;
    valanceType: string;
    motorized: boolean;
  }) {
    wwsTracker.track('builder_options_completed', {
      ...options,
      time_on_options_step: getStepDuration('mount'),
    });
    startStepTimer('options');
  },

  // ============ PRICE ============

  onPriceShown(price: number, shape: string, width: number, height: number) {
    wwsTracker.track('builder_price_shown', {
      price,
      shape,
      width,
      height,
      is_specialty: shape !== 'Standard',
    });

    // Detect price shock: if price > $300, start watching for exit
    if (price > 300) {
      wwsTracker.track('price_shock', {
        price,
        threshold: 300,
        shape,
      });
    }
  },

  // ============ NAVIGATION ============

  onStepBackward(fromStep: number, toStep: number, stepNames: string[]) {
    wwsTracker.track('builder_back_navigation', {
      from_step: stepNames[fromStep] || String(fromStep),
      to_step: stepNames[toStep] || String(toStep),
      from_step_index: fromStep,
      to_step_index: toStep,
    });
  },

  // ============ CART ============

  onAddToCart(items: Array<{
    shape: string;
    shadeType: string;
    fabric: string;
    fabricId: string;
    width: number;
    height: number;
    mountType: string;
    price: number;
    quantity: number;
  }>) {
    const totalValue = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    wwsTracker.track('add_to_cart', {
      items: items.map(i => ({
        shape: i.shape,
        shade_type: i.shadeType,
        fabric: i.fabric,
        fabric_id: i.fabricId,
        width: i.width,
        height: i.height,
        mount_type: i.mountType,
        price: i.price,
        quantity: i.quantity,
      })),
      cart_value: totalValue,
      item_count: items.length,
      time_in_builder: getStepDuration('builder'),
    });
  },

  onRemoveFromCart(itemId: string, price: number) {
    wwsTracker.track('remove_from_cart', {
      item_id: itemId,
      price,
    });
  },

  // ============ CHECKOUT ============

  onCheckoutStarted(cartValue: number, itemCount: number) {
    wwsTracker.track('checkout_started', {
      cart_value: cartValue,
      item_count: itemCount,
    });
  },

  onPurchaseComplete(value: number, orderId?: string) {
    wwsTracker.track('purchase', {
      value,
      order_id: orderId,
    });
  },

  // ============ ABANDONMENT ============

  /**
   * Call when user leaves mid-build. Captures the exact configuration
   * they were working on so we can recover it later.
   */
  onBuilderAbandoned(config: {
    shape?: string;
    shadeType?: string;
    fabricName?: string;
    fabricId?: string;
    width?: number;
    height?: number;
    mountType?: string;
    controlType?: string;
    valanceType?: string;
    price?: number;
    currentStep?: string;
  }) {
    wwsTracker.trackAbandonedConfig({
      ...config,
      abandonedAtStep: config.currentStep,
    });
  },

  // ============ ENGAGEMENT ============

  onHesitation(step: string, dwellSeconds: number) {
    if (dwellSeconds >= 30) {
      wwsTracker.track('builder_hesitation', {
        step,
        dwell_seconds: dwellSeconds,
      });
    }
  },

  onEmailCaptured(emailHash: string, context: string) {
    wwsTracker.track('email_captured', {
      email_hash: emailHash,
      context,  // e.g., 'save_configuration', 'consultation_request', 'checkout'
    });
  },
};
