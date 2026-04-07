/**
 * WWS ANALYTICS — Main Export
 * 
 * Usage:
 *   import { wwsTracker, builderHooks } from './services/analytics';
 *   
 *   // Initialize once in App.tsx
 *   wwsTracker.init();
 *   
 *   // Track builder events
 *   builderHooks.onShapeSelected('Pentagon');
 *   builderHooks.onFabricSelected(fabricId, fabricName, category, viewedCount, timeMs);
 */

export { wwsTracker } from './tracker';
export { builderHooks } from './builderHooks';
export { classifySource } from './sourceClassifier';
export type { TrafficSource } from './sourceClassifier';
