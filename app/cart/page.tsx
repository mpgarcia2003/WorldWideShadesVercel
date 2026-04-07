"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Pencil, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Truck, Factory } from "lucide-react";

interface CartItemData {
  id: string;
  config: {
    shape: string;
    shadeType: string;
    material: { name: string; category: string } | null;
    mountType: string;
    width: number;
    widthFraction: string;
    height: number;
    heightFraction: string;
    controlType: string;
    motorPower?: string;
    motorizedController: boolean;
    motorizedHub: boolean;
    motorizedCharger: boolean;
    sunSensor: boolean;
    quantity: number;
    controlPosition: string;
    rollType: string;
    bottomBar: string;
    valanceType: string;
    sideChannelType: string;
  };
  unitPrice: number;
  installerFee: number;
  totalPrice: number;
  visualizerImage?: string;
}

const CART_KEY = "wws_cart_v1";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDim(val: number, frac: string) {
  return frac && frac !== "0" ? `${val} ${frac}` : `${val}`;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItemData[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  function editItem(item: CartItemData) {
    // Save this item's config to builder storage so it pre-loads
    localStorage.setItem('wws_builder_config', JSON.stringify(item.config));
    // Track which item we're editing so the builder can update instead of duplicate
    localStorage.setItem('wws_editing_item', item.id);
    window.location.href = '/builder';
  }

  function removeItem(id: string) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  }

  function updateQuantity(id: string, qty: number) {
    if (qty < 1) return;
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, config: { ...item.config, quantity: qty }, totalPrice: item.unitPrice * qty }
        : item
    );
    setCart(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  }

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-warm-gray">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-dark">
            World Wide <span className="text-gold">Shades</span>
          </Link>
          <h1 className="font-sans text-sm font-semibold text-dark uppercase tracking-wider">
            Your Cart ({cart.length})
          </h1>
          <Link href="/builder" className="text-sm font-medium text-gold hover:text-gold-dark transition-colors">
            + Add More
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {cart.length === 0 ? (
          /* Empty cart */
          <div className="bg-white rounded-xl border border-cream-dark p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-cream-dark mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
            <p className="text-warm-gray mb-6">Design your perfect custom shade to get started.</p>
            <Link
              href="/builder"
              className="inline-block bg-gold text-dark font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark transition-colors"
            >
              Open the Shade Builder
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items — left column */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const c = item.config;
                const isMotorized = c.controlType === "Motorized";
                const dims =
                  c.shape === "Standard"
                    ? `${formatDim(c.width, c.widthFraction)}" W × ${formatDim(c.height, c.heightFraction)}" H`
                    : `${c.shape} — custom dimensions`;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-cream-dark p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-dark">
                          Custom {c.shadeType} Roller Shade
                        </h3>
                        <p className="text-sm text-warm-gray mt-0.5">
                          {c.material?.name || "No fabric selected"} · {dims}
                        </p>
                      </div>
                      <p className="font-serif text-xl font-bold text-dark whitespace-nowrap ml-4">
                        {fmt(item.totalPrice)}
                      </p>
                    </div>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                      <div>
                        <span className="text-warm-gray">Shape:</span>{" "}
                        <span className="text-dark font-medium">{c.shape}</span>
                      </div>
                      <div>
                        <span className="text-warm-gray">Mount:</span>{" "}
                        <span className="text-dark font-medium">{c.mountType}</span>
                      </div>
                      <div>
                        <span className="text-warm-gray">Control:</span>{" "}
                        <span className="text-dark font-medium">
                          {isMotorized ? `Motorized (${c.motorPower || "Rechargeable"})` : c.controlType}
                        </span>
                      </div>
                      <div>
                        <span className="text-warm-gray">Roll:</span>{" "}
                        <span className="text-dark font-medium">{c.rollType}</span>
                      </div>
                      <div>
                        <span className="text-warm-gray">Bottom Bar:</span>{" "}
                        <span className="text-dark font-medium">{c.bottomBar}</span>
                      </div>
                      {c.controlPosition && (
                        <div>
                          <span className="text-warm-gray">Control Side:</span>{" "}
                          <span className="text-dark font-medium">{c.controlPosition}</span>
                        </div>
                      )}
                      {c.valanceType && c.valanceType !== "standard" && (
                        <div>
                          <span className="text-warm-gray">Valance:</span>{" "}
                          <span className="text-dark font-medium">{c.valanceType}</span>
                        </div>
                      )}
                      {c.sideChannelType && c.sideChannelType !== "none" && (
                        <div>
                          <span className="text-warm-gray">Side Channels:</span>{" "}
                          <span className="text-dark font-medium">{c.sideChannelType}</span>
                        </div>
                      )}
                      {isMotorized && c.motorizedHub && (
                        <div>
                          <span className="text-warm-gray">Accessory:</span>{" "}
                          <span className="text-dark font-medium">Smart Hub</span>
                        </div>
                      )}
                      {isMotorized && c.motorizedCharger && (
                        <div>
                          <span className="text-warm-gray">Accessory:</span>{" "}
                          <span className="text-dark font-medium">Motor Charger</span>
                        </div>
                      )}
                      {isMotorized && c.sunSensor && (
                        <div>
                          <span className="text-warm-gray">Accessory:</span>{" "}
                          <span className="text-dark font-medium">Sun Sensor</span>
                        </div>
                      )}
                    </div>

                    {/* Actions row */}
                    <div className="flex items-center justify-between pt-4 border-t border-cream-dark">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-warm-gray mr-2">Qty:</span>
                        <button
                          onClick={() => updateQuantity(item.id, c.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-cream-dark flex items-center justify-center text-dark hover:bg-cream transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-semibold text-dark">{c.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, c.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-cream-dark flex items-center justify-center text-dark hover:bg-cream transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => editItem(item)}
                          className="flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue shopping link */}
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order summary — right column */}
            <div>
              <div className="bg-white rounded-xl border border-cream-dark p-6 shadow-sm sticky top-6">
                <h2 className="font-serif text-lg font-bold text-dark mb-4 pb-3 border-b border-cream-dark">
                  Order Summary
                </h2>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">
                      Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium text-dark">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Tax</span>
                    <span className="text-warm-gray">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-cream-dark mb-6">
                  <span className="font-semibold text-dark">Estimated Total</span>
                  <span className="font-serif text-2xl font-bold text-dark">{fmt(subtotal)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold text-white text-base transition-colors"
                  style={{ background: "linear-gradient(135deg, #c8a165 0%, #b8895a 100%)" }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust badges */}
                <div className="mt-5 pt-4 border-t border-cream-dark space-y-2.5 text-xs text-warm-gray">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                    <span>100% Fit Guarantee — remade free if it doesn&apos;t fit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Ships in ~7 business days via FedEx</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Made in USA · Factory-direct pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
