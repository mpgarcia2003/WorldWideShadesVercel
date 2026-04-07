/**
 * WWS ANALYTICS TRACKER
 * ---------------------
 * Core tracking service that captures every visitor interaction
 * and sends it to Supabase. Runs alongside GA4/Elevar (doesn't replace it).
 * 
 * Usage:
 *   import { wwsTracker } from './services/analytics/tracker';
 *   wwsTracker.init();  // call once on app load
 *   wwsTracker.track('builder_fabric_selected', { fabric_name: 'Ivory Blackout' });
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { classifySource, TrafficSource } from './sourceClassifier';

// ============ CONFIG ============

const SUPABASE_URL = 'https://jfpdxwdggvxxgntuasqu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGR4d2RnZ3Z4eGdudHVhc3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MzA1MjUsImV4cCI6MjA4MzQwNjUyNX0.IH4MEtnY0ZQm4hl4IDnZ8s9xVN7x00_5kG38-oolFkM';

// Edge function endpoint for tracking (we'll use direct insert for now, 
// upgrade to edge function for server-side enrichment later)
const TRACK_ENDPOINT = `${SUPABASE_URL}/functions/v1/track`;

// ============ IDENTITY ============

function getOrCreateVisitorId(): string {
  const STORAGE_KEY = 'wws_visitor_id';
  const COOKIE_KEY = 'wws_vid';
  
  // Check localStorage first
  let id = localStorage.getItem(STORAGE_KEY);
  
  // Fall back to cookie
  if (!id) {
    const cookies = document.cookie.split(';');
    for (const c of cookies) {
      const [key, val] = c.trim().split('=');
      if (key === COOKIE_KEY) { id = val; break; }
    }
  }
  
  // Generate new if nothing found
  if (!id) {
    id = 'v-' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  }
  
  // Store in both places for redundancy
  localStorage.setItem(STORAGE_KEY, id);
  document.cookie = `${COOKIE_KEY}=${id}; max-age=31536000; path=/; SameSite=Lax; Secure`;
  
  return id;
}

function getOrCreateSessionId(): string {
  const KEY = 'wws_ai_session_id';
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = 's-' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

// ============ EVENT QUEUE ============
// Buffer events and send in batches to reduce requests

interface QueuedEvent {
  event_name: string;
  properties: Record<string, any>;
  page_url: string;
  page_path: string;
  page_title: string;
  timestamp: string;
}

let eventQueue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_INTERVAL = 2000;  // Send events every 2 seconds
const MAX_BATCH = 20;

// ============ MAIN TRACKER ============

class WWSTracker {
  private supabase: SupabaseClient;
  private visitorId: string = '';
  private sessionId: string = '';
  private source: TrafficSource | null = null;
  private initialized: boolean = false;
  private startTime: number = 0;
  private maxScroll: number = 0;
  private lastClickLog: { x: number; y: number; time: number }[] = [];

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  /**
   * Initialize tracking. Call once when app loads.
   */
  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    // Identity
    this.visitorId = getOrCreateVisitorId();
    this.sessionId = getOrCreateSessionId();
    
    // Source classification — check own URL params first, then parent params
    const params = new URLSearchParams(window.location.search);
    // If no gclid/UTMs in iframe URL, check if parent sent them via postMessage
    if (!params.get('gclid') && sessionStorage.getItem('wws_parent_gclid')) {
      params.set('gclid', sessionStorage.getItem('wws_parent_gclid')!);
    }
    if (!params.get('fbclid') && sessionStorage.getItem('wws_parent_fbclid')) {
      params.set('fbclid', sessionStorage.getItem('wws_parent_fbclid')!);
    }
    if (!params.get('msclkid') && sessionStorage.getItem('wws_parent_msclkid')) {
      params.set('msclkid', sessionStorage.getItem('wws_parent_msclkid')!);
    }
    if (!params.get('utm_source') && sessionStorage.getItem('wws_parent_utm_source')) {
      params.set('utm_source', sessionStorage.getItem('wws_parent_utm_source')!);
    }
    if (!params.get('utm_medium') && sessionStorage.getItem('wws_parent_utm_medium')) {
      params.set('utm_medium', sessionStorage.getItem('wws_parent_utm_medium')!);
    }
    if (!params.get('utm_campaign') && sessionStorage.getItem('wws_parent_utm_campaign')) {
      params.set('utm_campaign', sessionStorage.getItem('wws_parent_utm_campaign')!);
    }
    this.source = classifySource(document.referrer, params);
    
    // Store source in session (first touch for this session)
    if (!sessionStorage.getItem('wws_ai_source')) {
      sessionStorage.setItem('wws_ai_source', JSON.stringify(this.source));
    } else {
      // Use the session's original source
      try {
        this.source = JSON.parse(sessionStorage.getItem('wws_ai_source')!);
      } catch {}
    }

    // Store raw UTMs
    sessionStorage.setItem('wws_ai_gclid', params.get('gclid') || '');
    sessionStorage.setItem('wws_ai_fbclid', params.get('fbclid') || '');
    sessionStorage.setItem('wws_ai_msclkid', params.get('msclkid') || '');

    // Track initial page view
    this.track('page_view');

    // Listen for parent params that arrive after init (timing fix)
    window.addEventListener('message', (event) => {
      const allowedOrigins = ['worldwideshades.com', 'myshopify.com'];
      if (!allowedOrigins.some(o => event.origin.includes(o))) return;
      if (event.data.type === 'WWS_PARENT_PARAMS' && !sessionStorage.getItem('wws_ai_source_from_parent')) {
        const p = event.data.params || {};
        const newParams = new URLSearchParams();
        if (p.gclid) newParams.set('gclid', p.gclid);
        if (p.fbclid) newParams.set('fbclid', p.fbclid);
        if (p.msclkid) newParams.set('msclkid', p.msclkid);
        if (p.utm_source) newParams.set('utm_source', p.utm_source);
        if (p.utm_medium) newParams.set('utm_medium', p.utm_medium);
        if (p.utm_campaign) newParams.set('utm_campaign', p.utm_campaign);
        const newSource = classifySource(document.referrer, newParams);
        // Only upgrade source if we got something better than referral
        if (newSource.source_type === 'paid' || newSource.medium === 'cpc') {
          this.source = newSource;
          sessionStorage.setItem('wws_ai_source', JSON.stringify(newSource));
          sessionStorage.setItem('wws_ai_source_from_parent', 'true');
          if (p.gclid) sessionStorage.setItem('wws_ai_gclid', p.gclid);
          if (p.fbclid) sessionStorage.setItem('wws_ai_fbclid', p.fbclid);
          if (p.msclkid) sessionStorage.setItem('wws_ai_msclkid', p.msclkid);
          console.log('[WWS Analytics] Re-classified source from parent:', newSource);
        }
      }
    });

    // Auto-track behaviors
    this._setupAutoTracking();
    
    // Start flush timer
    this._startFlushTimer();

    console.log(`[WWS Analytics] Initialized — visitor: ${this.visitorId}, session: ${this.sessionId}, source: ${this.source?.source}/${this.source?.medium}`);
  }

  /**
   * Track a custom event
   */
  track(eventName: string, properties: Record<string, any> = {}) {
    if (!this.initialized) return;

    const event: QueuedEvent = {
      event_name: eventName,
      properties,
      page_url: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    };

    eventQueue.push(event);

    // Flush immediately for critical events
    const criticalEvents = ['add_to_cart', 'checkout_started', 'purchase', 'rage_click', 'email_captured'];
    if (criticalEvents.includes(eventName) || eventQueue.length >= MAX_BATCH) {
      this._flush();
    }
  }

  /**
   * Track an abandoned configuration
   */
  trackAbandonedConfig(config: {
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
    abandonedAtStep?: string;
  }) {
    // Send as event
    this.track('configuration_abandoned', config);

    // Also store in abandoned_configurations table
    this.supabase.from('abandoned_configurations').insert({
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      shape: config.shape,
      shade_type: config.shadeType,
      fabric_name: config.fabricName,
      fabric_id: config.fabricId,
      width: config.width,
      height: config.height,
      mount_type: config.mountType,
      control_type: config.controlType,
      valance_type: config.valanceType,
      price_shown: config.price,
      abandoned_at_step: config.abandonedAtStep,
    }).then(({ error }) => {
      if (error) console.warn('[WWS Analytics] Failed to save abandoned config:', error);
    });
  }

  // ============ AUTO-TRACKING ============

  private _setupAutoTracking() {
    this.startTime = Date.now();

    // --- Scroll depth ---
    window.addEventListener('scroll', () => {
      const scrollPct = Math.round(
        (window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPct > this.maxScroll) this.maxScroll = scrollPct;
    }, { passive: true });

    // --- Page exit (time on page + scroll depth) ---
    const sendExitData = () => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      this.track('page_exit', {
        time_on_page_seconds: timeOnPage,
        max_scroll_depth: this.maxScroll,
      });
      this._flush(true); // force flush with sendBeacon
    };
    window.addEventListener('beforeunload', sendExitData);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') sendExitData();
    });

    // --- Click tracking ---
    document.addEventListener('click', (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button, [data-track], input[type="submit"]');
      if (el) {
        this.track('click', {
          element_tag: (el as HTMLElement).tagName,
          element_text: (el as HTMLElement).innerText?.substring(0, 100),
          element_href: (el as HTMLAnchorElement).href || null,
          element_id: (el as HTMLElement).id || null,
          data_track: (el as HTMLElement).dataset?.track || null,
        });
      }
    });

    // --- Rage clicks ---
    document.addEventListener('click', (e: MouseEvent) => {
      const now = Date.now();
      this.lastClickLog.push({ x: e.clientX, y: e.clientY, time: now });
      this.lastClickLog = this.lastClickLog.filter(c => now - c.time < 1000);

      const nearby = this.lastClickLog.filter(c =>
        Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30
      );

      if (nearby.length >= 3) {
        const target = e.target as HTMLElement;
        this.track('rage_click', {
          x: e.clientX,
          y: e.clientY,
          element: target?.tagName,
          element_text: target?.innerText?.substring(0, 100),
          element_id: target?.id || null,
          page_path: window.location.pathname,
        });
        this.lastClickLog = [];
      }
    });

    // --- Tab visibility (comparison shopping detection) ---
    let tabHiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        tabHiddenAt = Date.now();
        this.track('tab_hidden', { page_path: window.location.pathname });
      } else if (tabHiddenAt > 0) {
        const awaySeconds = Math.round((Date.now() - tabHiddenAt) / 1000);
        this.track('tab_returned', {
          away_seconds: awaySeconds,
          page_path: window.location.pathname,
        });
        tabHiddenAt = 0;
      }
    });

    // --- Copy detection ---
    document.addEventListener('copy', () => {
      const copied = window.getSelection()?.toString();
      if (copied && copied.length > 2) {
        this.track('text_copied', {
          text_preview: copied.substring(0, 200),
          page_path: window.location.pathname,
        });
      }
    });

    // --- Form field focus tracking ---
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLInputElement;
      if (target?.matches('input, select, textarea')) {
        this.track('field_focus', {
          field_name: target.name || target.id || target.placeholder || 'unknown',
          field_type: target.type,
        });
      }
    });
  }

  // ============ FLUSH / SEND ============

  private _startFlushTimer() {
    flushTimer = setInterval(() => {
      if (eventQueue.length > 0) this._flush();
    }, FLUSH_INTERVAL);
  }

  private async _flush(useBeacon = false) {
    if (eventQueue.length === 0) return;

    const batch = eventQueue.splice(0, MAX_BATCH);
    const source = this.source || { source: 'unknown', medium: 'unknown', campaign: null, source_type: 'unknown' };
    
    const payload = {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      source: source.source,
      medium: source.medium,
      campaign: source.campaign,
      source_type: source.source_type,
      referrer: document.referrer || null,
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      utm_term: new URLSearchParams(window.location.search).get('utm_term'),
      utm_content: new URLSearchParams(window.location.search).get('utm_content'),
      gclid: sessionStorage.getItem('wws_ai_gclid') || null,
      fbclid: sessionStorage.getItem('wws_ai_fbclid') || null,
      msclkid: sessionStorage.getItem('wws_ai_msclkid') || null,
      device_type: getDeviceType(),
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      user_agent: navigator.userAgent,
      events: batch,
    };

    // Use sendBeacon for page exit (more reliable)
    // Note: sendBeacon can't set auth headers, so use direct insert for exit events
    if (useBeacon) {
      await this._directInsert(batch, payload);
      return;
    }

    // Otherwise use fetch with auth header
    try {
      const res = await fetch(TRACK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      // If edge function fails, fall back to direct Supabase insert
      console.warn('[WWS Analytics] Edge function failed, using direct insert:', err);
      await this._directInsert(batch, payload);
    }
  }

  /**
   * Fallback: insert directly into Supabase if edge function is unavailable
   */
  private async _directInsert(events: QueuedEvent[], context: any) {
    const rows = events.map(evt => ({
      session_id: context.session_id,
      visitor_id: context.visitor_id,
      event_name: evt.event_name,
      properties: evt.properties,
      page_url: evt.page_url,
      page_path: evt.page_path,
      page_title: evt.page_title,
      source: context.source,
      medium: context.medium,
      campaign: context.campaign,
      source_type: context.source_type,
      referrer: context.referrer,
      utm_source: context.utm_source,
      utm_medium: context.utm_medium,
      utm_campaign: context.utm_campaign,
      gclid: context.gclid,
      fbclid: context.fbclid,
      msclkid: context.msclkid,
      device_type: context.device_type,
      screen_width: context.screen_width,
      screen_height: context.screen_height,
      user_agent: context.user_agent,
      event_timestamp: evt.timestamp,
    }));

    const { error } = await this.supabase.from('analytics_events').insert(rows);
    if (error) console.error('[WWS Analytics] Direct insert failed:', error);

    // Also update session + visitor for each event
    for (const evt of events) {
      const data = { ...context, event_name: evt.event_name, properties: evt.properties, page_path: evt.page_path };
      await this.supabase.rpc('upsert_session', { p_data: data });
      await this.supabase.rpc('upsert_visitor', { p_data: data });
    }
  }

  // ============ GETTERS ============

  getVisitorId(): string { return this.visitorId; }
  getSessionId(): string { return this.sessionId; }
  getSource(): TrafficSource | null { return this.source; }
}

// Export singleton instance
export const wwsTracker = new WWSTracker();
