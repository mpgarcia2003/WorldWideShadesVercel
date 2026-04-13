"use client";

import { useEffect } from "react";
import { initBehaviorTracking, destroyBehaviorTracking } from "@/lib/tracking/behavior";

/**
 * Silent behavior tracker — renders nothing, just initializes tracking.
 * Add to app/layout.tsx alongside other providers.
 */
export function BehaviorTracker() {
  useEffect(() => {
    initBehaviorTracking();
    return () => destroyBehaviorTracking();
  }, []);

  return null;
}
