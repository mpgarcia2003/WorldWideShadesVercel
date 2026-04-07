"use client";

import { useState, useEffect, useRef } from "react";
import { LanguageProvider } from "@/LanguageContext";
import Builder from "@/_legacy/Builder";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import { CartItem, Fabric } from "@/types";
import { initAnalytics, trackEvent } from "@/utils/analytics";
import { getSavedCart, persistCart, getSavedSwatches, persistSwatches, loadSharedCart } from "@/utils/storage";
import { wwsTracker, builderHooks } from "@/services/analytics";
import { trackBuilderStart } from "@/lib/gtm/events";

export default function BuilderPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [builderHeight, setBuilderHeight] = useState("100dvh");
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return getSavedCart(); } catch { return []; }
  });
  const [swatches, setSwatches] = useState<Fabric[]>(() => {
    try { return getSavedSwatches(); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamically measure available height below the header
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setBuilderHeight(`${window.innerHeight - rect.top}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure after a tick in case header renders late
    const timer = setTimeout(measure, 100);
    return () => { window.removeEventListener("resize", measure); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    initAnalytics();
    wwsTracker.init();
    trackBuilderStart("builder-page-direct");

    const urlParams = new URLSearchParams(window.location.search);
    const shouldClearCart = urlParams.get('clear_cart') === 'true' || urlParams.get('status') === 'success';
    if (shouldClearCart) {
      setCart([]);
      trackEvent('checkout_success_return', { source: 'shopify' });
      window.history.replaceState({}, '', window.location.pathname);
    }

    const cartId = urlParams.get('cart');
    if (cartId) {
      loadSharedCart(cartId).then(data => {
        if (data) {
          setCart(data.cart);
          setSwatches(data.swatches);
          window.history.replaceState({}, '', window.location.pathname);
          setIsCartOpen(true);
          trackEvent('cart_shared_load', { cart_id: cartId });
        }
      });
    }
  }, []);

  useEffect(() => { persistCart(cart); }, [cart]);
  useEffect(() => { persistSwatches(swatches); }, [swatches]);

  const addToCart = (item: CartItem) => {
    const editingId = localStorage.getItem('wws_editing_item');
    if (editingId) {
      // Replace existing item instead of adding new
      setCart(prev => prev.map(existing =>
        existing.id === editingId ? { ...item, id: editingId } : existing
      ));
      localStorage.removeItem('wws_editing_item');
    } else {
      setCart(prev => [...prev, item]);
    }
    setIsCartOpen(true);
    trackEvent('add_to_cart', {
      currency: 'USD', value: item.totalPrice,
      items: [{ item_id: item.config.material?.id || 'custom-shade', item_name: item.config.material?.name || 'Custom Shade', price: item.unitPrice, quantity: item.config.quantity }],
    });
    builderHooks.onAddToCart([{
      shape: item.config.shape, shadeType: item.config.shadeType, fabric: item.config.material?.name || '', fabricId: item.config.material?.id || '',
      width: item.config.width, height: item.config.height, mountType: item.config.mountType, price: item.unitPrice, quantity: item.config.quantity,
    }]);
  };

  const addToSwatches = (fabric: Fabric) => {
    setSwatches(prev => {
      if (prev.find(s => s.id === fabric.id)) return prev;
      trackEvent('add_to_swatches', { fabric_id: fabric.id });
      return [...prev, fabric];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      trackEvent('remove_from_cart', { currency: 'USD', value: item.totalPrice });
      builderHooks.onRemoveFromCart(id, item.unitPrice);
    }
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleBeginCheckout = () => {
    const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    builderHooks.onCheckoutStarted(cartTotal, cart.length);
  };

  return (
    <LanguageProvider>
      <div ref={containerRef} style={{ height: builderHeight }} className="w-full overflow-hidden">
        <Builder addToCart={addToCart} addToSwatches={addToSwatches} swatches={swatches} />
      </div>

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        swatches={swatches}
        onRemoveItem={removeFromCart}
        onRemoveSwatch={(id) => setSwatches(prev => prev.filter(s => s.id !== id))}
        onUpdateItem={updateCartItem}
        onClearCart={() => setCart([])}
        onClearSwatches={() => setSwatches([])}
        onNavigate={() => {}}
        onCheckout={handleBeginCheckout}
      />
    </LanguageProvider>
  );
}
