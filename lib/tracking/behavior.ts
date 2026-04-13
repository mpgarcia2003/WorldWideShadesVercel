/**
 * WWS Behavior Tracker — Independent Analytics Pipeline
 * 
 * ZERO contact with window.dataLayer / GTM / GA4 / Google Ads.
 * Sends events directly to /api/behavior/track → Supabase.
 * 
 * Usage: Import <BehaviorTracker /> in app/layout.tsx as a client component.
 */

// ─── ID Generation ─────────────────────────────────────────
function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem("wws_behavior_vid");
  if (!vid) {
    vid = `v_${generateId()}`;
    localStorage.setItem("wws_behavior_vid", vid);
  }
  return vid;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  const lastActivity = parseInt(sessionStorage.getItem("wws_bh_last_activity") || "0", 10);
  let sid = sessionStorage.getItem("wws_bh_sid");

  if (!sid || (lastActivity > 0 && now - lastActivity > SESSION_TIMEOUT)) {
    sid = `s_${generateId()}`;
    sessionStorage.setItem("wws_bh_sid", sid);
    sessionStorage.removeItem("wws_bh_session_created");
  }

  sessionStorage.setItem("wws_bh_last_activity", String(now));
  return sid;
}

// ─── Device Detection ──────────────────────────────────────
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getBrowser(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
}

// ─── UTM Extraction ────────────────────────────────────────
function getUTMs(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"]) {
    const val = params.get(key);
    if (val) utms[key] = val;
  }
  return utms;
}

// ─── Event Buffer & Flush ──────────────────────────────────
interface BehaviorEvent {
  event_name: string;
  event_data: Record<string, any>;
  page: string;
  timestamp: string;
  step_number?: number;
  time_on_step_seconds?: number;
}

let eventBuffer: BehaviorEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let sessionCreated = false;

async function ensureSession(): Promise<void> {
  if (sessionCreated || sessionStorage.getItem("wws_bh_session_created")) {
    sessionCreated = true;
    return;
  }

  const utms = getUTMs();
  const payload = {
    type: "session_start",
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || "",
    utm_source: utms.utm_source || "",
    utm_medium: utms.utm_medium || "",
    utm_campaign: utms.utm_campaign || "",
    utm_content: utms.utm_content || "",
    utm_term: utms.utm_term || "",
    gclid: utms.gclid || "",
    device_type: getDeviceType(),
    browser: getBrowser(),
    screen_width: window.innerWidth,
  };

  try {
    await fetch("/api/behavior/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    sessionStorage.setItem("wws_bh_session_created", "true");
    sessionCreated = true;
  } catch (e) {
    console.warn("[BH] Failed to create session:", e);
  }
}

function queueEvent(name: string, data: Record<string, any> = {}, stepNumber?: number, timeOnStep?: number): void {
  if (typeof window === "undefined") return;

  eventBuffer.push({
    event_name: name,
    event_data: data,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    step_number: stepNumber,
    time_on_step_seconds: timeOnStep,
  });
}

async function flushEvents(): Promise<void> {
  if (eventBuffer.length === 0) return;

  const events = [...eventBuffer];
  eventBuffer = [];

  const payload = {
    type: "events",
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    events,
  };

  try {
    // Use sendBeacon if page is unloading, fetch otherwise
    const body = JSON.stringify(payload);
    if (document.visibilityState === "hidden") {
      navigator.sendBeacon("/api/behavior/track", body);
    } else {
      await fetch("/api/behavior/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    }
  } catch (e) {
    // Put events back if flush failed
    eventBuffer.unshift(...events);
  }
}

// ─── Public API ────────────────────────────────────────────

/** Track a custom event */
export function bhTrack(name: string, data: Record<string, any> = {}, stepNumber?: number): void {
  queueEvent(`bh_${name}`, data, stepNumber);
}

// ─── Builder Step Tracking ─────────────────────────────────
const stepTimers: Record<string, number> = {};

export function bhStepStart(stepName: string, stepNumber: number): void {
  stepTimers[stepName] = Date.now();
  queueEvent("bh_step_started", { step: stepName }, stepNumber);
}

export function bhStepComplete(stepName: string, stepNumber: number, data: Record<string, any> = {}): void {
  const startTime = stepTimers[stepName];
  const timeOnStep = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  delete stepTimers[stepName];
  queueEvent("bh_step_completed", { step: stepName, ...data }, stepNumber, timeOnStep);
}

// ─── Auto-Tracking: Scroll, Rage Clicks, Visibility ───────

let maxScroll = 0;
let clickLog: { x: number; y: number; t: number }[] = [];

function setupAutoTracking(): void {
  if (typeof window === "undefined") return;

  // Scroll depth
  let scrollThresholds = [25, 50, 75, 90];
  window.addEventListener("scroll", () => {
    const scrollPct = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPct > maxScroll) {
      maxScroll = scrollPct;
      const crossed = scrollThresholds.filter((t) => scrollPct >= t);
      if (crossed.length > 0) {
        scrollThresholds = scrollThresholds.filter((t) => scrollPct < t);
        queueEvent("bh_scroll_depth", { depth: maxScroll, page: window.location.pathname });
      }
    }
  }, { passive: true });

  // Rage clicks (3+ clicks in same 100px area within 2s)
  document.addEventListener("click", (e) => {
    const now = Date.now();
    clickLog.push({ x: e.clientX, y: e.clientY, t: now });
    clickLog = clickLog.filter((c) => now - c.t < 2000);

    const nearby = clickLog.filter(
      (c) => Math.abs(c.x - e.clientX) < 100 && Math.abs(c.y - e.clientY) < 100
    );
    if (nearby.length >= 3) {
      queueEvent("bh_rage_click", {
        x: e.clientX,
        y: e.clientY,
        target: (e.target as HTMLElement)?.tagName || "unknown",
        page: window.location.pathname,
      });
      clickLog = []; // reset after detection
    }
  });

  // Tab visibility
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      queueEvent("bh_tab_hidden", { page: window.location.pathname });
      flushEvents(); // flush immediately when leaving
    } else {
      queueEvent("bh_tab_returned", { page: window.location.pathname });
    }
  });

  // Page unload — send session end
  window.addEventListener("beforeunload", () => {
    queueEvent("bh_session_end", {
      max_scroll_depth: maxScroll,
      exit_page: window.location.pathname,
      duration_seconds: Math.round((Date.now() - pageLoadTime) / 1000),
    });
    flushEvents();
  });
}

// ─── URL Change Detection (SPA navigation) ─────────────────
let currentPath = "";

function setupRouteTracking(): void {
  if (typeof window === "undefined") return;

  const trackPageView = () => {
    const newPath = window.location.pathname;
    if (newPath !== currentPath) {
      // Reset scroll tracking for new page
      maxScroll = 0;
      currentPath = newPath;
      queueEvent("bh_page_view", {
        page: newPath,
        search: window.location.search,
      });
    }
  };

  // Initial page
  trackPageView();

  // Intercept pushState/replaceState for SPA navigation
  const origPush = history.pushState;
  const origReplace = history.replaceState;
  history.pushState = function (...args) {
    origPush.apply(this, args);
    setTimeout(trackPageView, 0);
  };
  history.replaceState = function (...args) {
    origReplace.apply(this, args);
    setTimeout(trackPageView, 0);
  };
  window.addEventListener("popstate", () => setTimeout(trackPageView, 0));
}

// ─── Initialize ────────────────────────────────────────────
let initialized = false;
let pageLoadTime = Date.now();

export function initBehaviorTracking(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  pageLoadTime = Date.now();

  ensureSession();
  setupAutoTracking();
  setupRouteTracking();

  // Flush event buffer every 10 seconds
  flushTimer = setInterval(flushEvents, 10000);
}

export function destroyBehaviorTracking(): void {
  if (flushTimer) clearInterval(flushTimer);
  flushEvents();
  initialized = false;
}
