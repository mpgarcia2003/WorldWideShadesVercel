// utils/shopify.ts
// Bridge between Custom Shade Builder App and Shopify via Draft Orders

import { CartItem, Fabric, ShapeType } from '../types';
import { SHAPE_CONFIGS, VALANCE_OPTIONS, SIDE_CHANNEL_OPTIONS, getFabricUrl } from '../constants';

// Google Apps Script URL (already deployed and working)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyn5u8d9EsJlcfClFk5TPPZThWg37dVLk2qQklIAcVT8ZXH3xIZU-nIcgV5J_flTx-rQg/exec';

export interface ShopifyLineItem {
  title: string;
  quantity: number;
  price: number;
  final_line_price: number;
  sku: string;
  properties: Record<string, string>;
  image_url?: string;
}

export interface ShopifyCartData {
  items: ShopifyLineItem[];
  customer_email?: string;
  note?: string;
}

const fractionToDecimal = (frac: string): number => {
  if (!frac || frac === '0') return 0;
  const fractionMap: Record<string, number> = {
    '1/8': 0.125,
    '1/4': 0.25,
    '3/8': 0.375,
    '1/2': 0.5,
    '5/8': 0.625,
    '3/4': 0.75,
    '7/8': 0.875
  };
  return fractionMap[frac] || 0;
};

const formatDimDecimal = (val: number, frac: string): string => {
  const decimal = val + fractionToDecimal(frac);
  return decimal.toFixed(2);
};

const mapShadeType = (material: Fabric | null): string => {
  if (!material) return 'Custom Shades';
  return material.category === 'Blackout' ? 'Blackout Shades' : 'Light Filtering Shades';
};

const mapControlType = (controlType: string): string => {
  if (controlType === 'Metal Chain') return 'Continuous Loop';
  if (controlType === 'Motorized') return 'Motorized';
  return controlType;
};

export const convertToShopifyItems = (cart: CartItem[], swatches: Fabric[] = []): ShopifyLineItem[] => {
  const items: ShopifyLineItem[] = [];

  cart.forEach(item => {
    const config = item.config;
    
    if (config.isMeasurementOnly) {
      items.push({
        title: 'Pro Measurement Service',
        quantity: 1,
        price: item.totalPrice * 100,
        final_line_price: item.totalPrice * 100,
        sku: 'SERVICE-MEASURE',
        properties: {
          'Service Type': 'Professional Measurement',
          'Location': config.installer?.location || '',
          'Installer': config.installer?.name || '',
          '_custom_price': item.totalPrice.toFixed(2)
        }
      });
      return;
    }

    // ── Helpers for clean display ────────────────────────────────────────────
    const formatFrac = (val: number, frac: string) =>
      (frac && frac !== '0') ? `${val} ${frac}"` : `${val}"`;

    // Build customer-visible properties (no _ prefix = shown in Shopify checkout)
    const properties: Record<string, string> = {};

    // 1. Shape (only show if specialty)
    if (config.shape !== 'Standard') {
      properties['Shape'] = config.shape;
    }

    // 2. Size — single clean line
    if (config.shape === 'Standard') {
      properties['Size'] = `${formatFrac(config.width, config.widthFraction)} W × ${formatFrac(config.height, config.heightFraction)} H`;
    } else {
      const shapeConfig = SHAPE_CONFIGS[config.shape as ShapeType];
      if (shapeConfig) {
        const dimParts = shapeConfig.inputs.map(input => {
          const val = (input.key === 'width' || input.key === 'height')
            ? config[input.key as 'width' | 'height']
            : (config.customDims?.[input.key] || 0);
          const frac = (input.key === 'width' || input.key === 'height')
            ? config[input.key === 'width' ? 'widthFraction' : 'heightFraction']
            : (config.customFracs?.[input.key] || '0');
          return `${input.label}: ${formatFrac(val, frac)}`;
        });
        properties['Size'] = dimParts.join(' | ');
      }
    }

    // 3. Fabric & shade type
    properties['Fabric'] = config.material ? config.material.name : 'TBD';
    properties['Shade Type'] = mapShadeType(config.material);

    // 4. Mount
    properties['Mount'] = config.mountType;

    // 5. Control
    if (config.controlType === 'Motorized') {
      properties['Control'] = `Motorized – ${config.motorPower || 'Rechargeable'}`;
      const addons = [
        config.motorizedController && 'Remote',
        config.motorizedHub && 'Smart Hub',
        config.motorizedCharger && 'Charger',
        config.sunSensor && 'Sun Sensor',
      ].filter(Boolean);
      if (addons.length) properties['Add-ons'] = addons.join(', ');
    } else {
      properties['Control'] = 'Metal Chain';
    }

    // 6. Upgrades (valance, side channels)
    if (config.valanceType && config.valanceType !== 'standard') {
      const valanceOption = VALANCE_OPTIONS.find(v => v.id === config.valanceType);
      if (valanceOption) properties['Valance'] = valanceOption.label;
    }
    if (config.sideChannelType === 'standard') {
      properties['Side Channels'] = 'Light Blocking';
    }

    // 7. Pro services
    if (config.measureService) properties['Pro Measurement'] = 'Included';
    if (config.installService) {
      properties['Pro Installation'] = 'Included';
      if (config.installer) properties['Installer'] = config.installer.name;
    }

    // ── Hidden production specs (_ prefix = hidden from customer in Shopify) ──
    properties['_roll_type'] = config.rollType || 'Standard';
    properties['_control_position'] = config.controlPosition || 'Right';
    properties['_bottom_bar'] = config.bottomBar || 'Fabric Wrapped';
    properties['_shade_type_raw'] = config.shadeType || '';
    properties['_custom_price'] = (item.totalPrice / config.quantity).toFixed(2);

    // ── Product title: personalized with fabric + size ────────────────────────
    const isSpecialtyShape = config.shape !== 'Standard';
    const fabricLabel = config.material?.name ? ` – ${config.material.name}` : '';
    const sizeLabel = config.shape === 'Standard'
      ? ` (${formatFrac(config.width, config.widthFraction)} W × ${formatFrac(config.height, config.heightFraction)} H)`
      : ` (${config.shape})`;
    const productTitle = isSpecialtyShape
      ? `Specialty Roller Shade${fabricLabel}${sizeLabel}`
      : `Custom Roller Shade${fabricLabel}${sizeLabel}`;

    // Get fabric image URL for Shopify checkout
    const imageUrl = config.material?.cloudinaryId 
      ? getFabricUrl(config.material.cloudinaryId, 'thumb') 
      : undefined;

    items.push({
      title: productTitle,
      quantity: config.quantity,
      price: (item.totalPrice / config.quantity) * 100,
      final_line_price: item.totalPrice * 100,
      sku: isSpecialtyShape ? 'SPECIALTY-SHADE' : 'CUSTOM-ROLLER-SHADE',
      properties,
      ...(imageUrl && { image_url: imageUrl })
    });
  });

  swatches.forEach(swatch => {
    const swatchImageUrl = swatch.cloudinaryId 
      ? getFabricUrl(swatch.cloudinaryId, 'thumb') 
      : undefined;

    items.push({
      title: `Free Swatch - ${swatch.name}`,
      quantity: 1,
      price: 0,
      final_line_price: 0,
      sku: `SWATCH-${swatch.id}`,
      properties: {
        'Fabric': swatch.name,
        'Category': swatch.category,
        '_custom_price': '0.00'
      },
      ...(swatchImageUrl && { image_url: swatchImageUrl })
    });
  });

  return items;
};

export const createShopifyCheckout = async (
  cart: CartItem[],
  swatches: Fabric[] = [],
  customerEmail?: string,
  orderNote?: string
): Promise<string | null> => {
  const items = convertToShopifyItems(cart, swatches);
  
  if (items.length === 0) {
    console.error('No items to checkout');
    return null;
  }

  const cartData: ShopifyCartData = {
    items,
    customer_email: customerEmail,
    note: orderNote || 'Draft order created from Shade Builder App'
  };

  try {
    console.log('Creating Shopify checkout...', { 
      itemCount: items.length,
      items: items.map(i => ({ title: i.title, qty: i.quantity, price: i.price / 100 }))
    });
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(cartData),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('=== SHOPIFY DEBUG ===');
    console.log('Full response:', JSON.stringify(data, null, 2));
    console.log('Response status:', data.status);
    console.log('Shopify response field:', data.shopify_response);
    console.log('Line items sent:', JSON.stringify(cartData.items, null, 2));
    console.log('=== END DEBUG ===');
    
    if (data.status === 'error') {
      console.error('Draft order error:', data.message);
      alert('Checkout error: ' + data.message);
      return null;
    }

    let checkoutUrl = '';
    if (typeof data.shopify_response === 'string') {
      checkoutUrl = data.shopify_response;
    } else if (data.shopify_response?.invoiceUrl) {
      checkoutUrl = data.shopify_response.invoiceUrl;
    }

    if (checkoutUrl) {
      console.log('Checkout URL created:', checkoutUrl);
      return checkoutUrl;
    }

    console.error('No checkout URL in response:', data);
    return null;

  } catch (error) {
    console.error('Shopify checkout error:', error);
    alert('Unable to create checkout. Please try again.');
    return null;
  }
};

export const redirectToShopifyCheckout = (checkoutUrl: string) => {
  // Save backup in case checkout fails, then clear active cart
  try {
    const currentCart = localStorage.getItem('wws_cart_v1');
    if (currentCart) {
      localStorage.setItem('wws_cart_backup', currentCart);
    }
    // Clear the active cart so it's empty when they return
    localStorage.setItem('wws_cart_v1', '[]');
  } catch (e) {}
  
  if (window.top && window.top !== window) {
    window.top.location.href = checkoutUrl;
  } else {
    window.location.href = checkoutUrl;
  }
};