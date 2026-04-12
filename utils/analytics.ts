/**
 * ANALYTICS ENGINE (Clean - No Elevar)
 * Sends all events to parent via postMessage → dataLayer → GTM
 */

import { CartItem, Fabric } from '../types';

let parentClientId: string | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    const allowedOrigins = ['https://worldwideshades.com', 'https://window-shades-store.myshopify.com'];
    if (!allowedOrigins.some(origin => event.origin.includes(origin.replace('https://', '')))) {
      return;
    }
    if (event.data.type === 'GA4_CLIENT_ID' && event.data.clientId) {
      parentClientId = event.data.clientId;
    }
    // Receive UTM/click ID params from parent Shopify page
    if (event.data.type === 'WWS_PARENT_PARAMS') {
      const p = event.data.params || {};
      if (p.gclid) sessionStorage.setItem('wws_parent_gclid', p.gclid);
      if (p.fbclid) sessionStorage.setItem('wws_parent_fbclid', p.fbclid);
      if (p.msclkid) sessionStorage.setItem('wws_parent_msclkid', p.msclkid);
      if (p.utm_source) sessionStorage.setItem('wws_parent_utm_source', p.utm_source);
      if (p.utm_medium) sessionStorage.setItem('wws_parent_utm_medium', p.utm_medium);
      if (p.utm_campaign) sessionStorage.setItem('wws_parent_utm_campaign', p.utm_campaign);
      if (p.utm_term) sessionStorage.setItem('wws_parent_utm_term', p.utm_term);
      if (p.utm_content) sessionStorage.setItem('wws_parent_utm_content', p.utm_content);
      console.log('[WWS Analytics] Received parent params:', p);
    }
  });
}

export const initAnalytics = () => {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || (document.referrer.includes('google') ? 'google' : 'direct');
  const medium = params.get('utm_medium') || 'none';
  const campaign = params.get('utm_campaign') || 'none';

  if (!sessionStorage.getItem('wws_session_id')) {
    const sessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('wws_session_id', sessionId);
    sessionStorage.setItem('wws_source', source);
    sessionStorage.setItem('wws_medium', medium);
    sessionStorage.setItem('wws_campaign', campaign);
    // Note: page_view is fired automatically by GTM on load — no manual fire needed
  }
};

// GA4 gtag helper - fires gtag events directly
const fireGtagEvent = (eventName: string, properties: Record<string, any>) => {
  if (typeof window === 'undefined' || typeof (window as any).gtag !== 'function') return;
  const gtag = (window as any).gtag;
  
  // Map to standard GA4 e-commerce event names and params
  const cleanProps = { ...properties };
  // Remove internal tracking fields that GA4 doesn't need
  delete cleanProps.event;
  delete cleanProps.timestamp;
  delete cleanProps.session_id;
  delete cleanProps.traffic_source;
  delete cleanProps.traffic_medium;
  delete cleanProps.parent_client_id;

  gtag('event', eventName, cleanProps);
};

// Meta Pixel helper - fires fbq events for key e-commerce actions
const fireMetaPixelEvent = (eventName: string, properties: Record<string, any>) => {
  if (typeof window === 'undefined' || typeof (window as any).fbq !== 'function') return;
  const fbq = (window as any).fbq;

  switch (eventName) {
    case 'view_item':
    case 'fabric_selected':
      fbq('track', 'ViewContent', {
        content_name: properties.fabric || properties.item_name || 'Custom Shade',
        content_category: properties.shade_type || properties.category || 'Roller Shades',
        content_type: 'product',
        value: properties.price || properties.value || 0,
        currency: 'USD'
      });
      break;
    case 'add_to_cart':
      fbq('track', 'AddToCart', {
        content_name: properties.fabric || properties.item_name || 'Custom Shade',
        content_type: 'product',
        value: properties.value || properties.price || 0,
        currency: 'USD'
      });
      break;
    case 'begin_checkout':
      fbq('track', 'InitiateCheckout', {
        value: properties.value || 0,
        currency: 'USD',
        num_items: properties.items?.length || 1
      });
      break;
    case 'purchase':
      fbq('track', 'Purchase', {
        value: properties.value || 0,
        currency: 'USD',
        content_type: 'product'
      });
      break;
    case 'generate_lead':
    case 'Consultation_confirmation':
    case 'swatch_request_submitted':
      fbq('track', 'Lead', {
        content_name: eventName,
        value: properties.value || 0,
        currency: 'USD'
      });
      break;
    case 'Swatch_CTA_Clicked':
    case 'exit_intent_email_captured':
      fbq('track', 'CompleteRegistration', {
        content_name: eventName,
        value: 0,
        currency: 'USD'
      });
      break;
  }
};

export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const sessionId = sessionStorage.getItem('wws_session_id');
  const source = sessionStorage.getItem('wws_source') || 'direct';
  const medium = sessionStorage.getItem('wws_medium') || 'none';

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    session_id: sessionId,
    traffic_source: source,
    traffic_medium: medium,
    ...(parentClientId && { parent_client_id: parentClientId }),
    ...properties
  };

  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push(payload);

    // Fire Meta Pixel events for key actions
    fireMetaPixelEvent(eventName, properties);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href
  });
};

export const trackEngagement = (action: string, details: Record<string, any> = {}) => {
  trackEvent('user_engagement', {
    engagement_action: action,
    ...details
  });
};