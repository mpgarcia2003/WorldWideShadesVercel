import { CartItem, ShadeConfig, Fabric } from '../types';
import { getFabricUrl } from '../constants';

const SHOPIFY_IDS = {
  STANDARD: { 
    ID: '8249858801862', 
    SKU: 'CUSTOM-ROLLER-SHADE', 
    NAME: 'Custom Roller Shades – Light Filtering & Blackout' 
  },
  SPECIALTY: { 
    ID: '8532697481414', 
    SKU: 'SPECIALTY-SHADE', 
    NAME: 'Specialty Shades' 
  }
};

const BUILDER_URL = 'https://builder.worldwideshades.com';

function generateEventId(): string {
  return 'evt_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Default user_properties object required by Elevar on every event.
 * visitor_type is required — always "guest" since the builder has no login.
 */
function getUserProperties() {
  return {
    visitor_type: 'guest' as const,
    customer_id: '',
    customer_email: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_address_1: '',
    customer_address_2: '',
    customer_city: '',
    customer_country: '',
    customer_phone: '',
    customer_province: '',
    customer_province_code: '',
    customer_order_count: '0',
    customer_total_spent: '0.00',
    customer_tags: '',
    customer_zip: ''
  };
}

function sendToParent(eventData: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
    const payload = {
      type: 'GTM_EVENT',
      data: {
        event_id: generateEventId(),
        ...eventData
      }
    };
    window.parent.postMessage(payload, '*');
    console.log(`[Builder Tracking] Sent: ${eventData.event}`, payload);
  } else {
    console.log(`[Builder Tracking] (Dev/Local) Event: ${eventData.event}`, eventData);
  }
}

function getProductData(shape: string) {
  return shape === 'Standard' ? SHOPIFY_IDS.STANDARD : SHOPIFY_IDS.SPECIALTY;
}

function formatConfigAsProduct(config: ShadeConfig, price: number) {
  const productInfo = getProductData(config.shape);
  const fabricName = config.material?.name || 'No Fabric Selected';
  const imageUrl = config.material?.cloudinaryId ? getFabricUrl(config.material.cloudinaryId, 'thumb') : '';
  const variantId = config.material?.id || `${productInfo.SKU}-${config.shape}`;

  return {
    id: productInfo.SKU,
    name: productInfo.NAME,
    brand: 'World Wide Shades',
    category: 'Window Blinds & Shades',
    variant: fabricName,
    price: price.toFixed(2),
    quantity: String(config.quantity),
    position: 1,
    list: '/pages/builder',
    product_id: productInfo.ID,
    variant_id: String(variantId),
    compare_at_price: '',
    image: imageUrl,
    url: BUILDER_URL
  };
}

function formatCartItem(item: CartItem, index: number = 1) {
  const productInfo = getProductData(item.config.shape);
  const imageUrl = item.config.material?.cloudinaryId ? getFabricUrl(item.config.material.cloudinaryId, 'thumb') : '';
  const variantId = item.config.material?.id || `${productInfo.SKU}-${item.config.shape}`;

  return {
    id: productInfo.SKU,
    name: productInfo.NAME,
    brand: 'World Wide Shades',
    category: 'Window Blinds & Shades',
    variant: item.config.material?.name || 'Custom Configuration',
    price: item.unitPrice.toFixed(2),
    quantity: String(item.config.quantity),
    position: index,
    list: '/pages/builder',
    product_id: productInfo.ID,
    variant_id: String(variantId),
    compare_at_price: '',
    image: imageUrl,
    url: BUILDER_URL
  };
}

// ---- EXPORTED TRACKING FUNCTIONS ----

/**
 * dl_user_data — MUST fire before all other Elevar events on every page load.
 * Elevar uses this to initialize user context for session stitching.
 */
export function trackUserData(): void {
  sendToParent({
    event: 'dl_user_data',
    user_properties: getUserProperties()
  });
}

export function trackViewItem(config: ShadeConfig, price: number): void {
  const product = formatConfigAsProduct(config, price);
  sendToParent({
    event: 'dl_view_item',
    user_properties: getUserProperties(),
    ecommerce: {
      currencyCode: 'USD',
      detail: {
        actionField: { list: '/pages/builder', action: 'detail' },
        products: [product]
      }
    }
  });
}

export function trackAddToCart(item: CartItem): void {
  const product = formatCartItem(item);
  sendToParent({
    event: 'dl_add_to_cart',
    user_properties: getUserProperties(),
    ecommerce: {
      currencyCode: 'USD',
      add: {
        actionField: { list: '/pages/builder' },
        products: [product]
      }
    }
  });
}

export function trackBeginCheckout(cart: CartItem[]): void {
  const products = cart.map((item, index) => formatCartItem(item, index + 1));
  
  sendToParent({
    event: 'dl_begin_checkout',
    user_properties: getUserProperties(),
    ecommerce: {
      currencyCode: 'USD',
      checkout: {
        actionField: { step: 1, action: 'checkout' },
        products: products
      }
    }
  });
}

export function trackCustomizeItem(config: ShadeConfig, price: number, action: string): void {
  const product = formatConfigAsProduct(config, price);
  
  sendToParent({
    event: 'dl_customize_item',
    user_properties: getUserProperties(),
    ecommerce: {
      currencyCode: 'USD',
      detail: {
        products: [product]
      }
    },
    customization: {
      action: action,
      shape: config.shape,
      shadeType: config.shadeType,
      fabric: config.material?.name,
      width: config.width,
      height: config.height,
      mountType: config.mountType,
      controlType: config.controlType,
      valance: config.valanceType
    }
  });
}

export function trackRemoveFromCart(item: CartItem): void {
  const product = formatCartItem(item);
  sendToParent({
    event: 'dl_remove_from_cart',
    user_properties: getUserProperties(),
    ecommerce: {
      currencyCode: 'USD',
      remove: {
        products: [product]
      }
    }
  });
}
