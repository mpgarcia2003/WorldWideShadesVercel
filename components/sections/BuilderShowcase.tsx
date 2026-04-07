"use client";

import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

export function BuilderShowcase() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — Copy */}
          <div>
            <span className="inline-block mb-4 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 rounded-full">
              Only at World Wide Shades
            </span>
            <h2 className="heading-display text-3xl lg:text-4xl xl:text-[2.75rem] text-dark mb-5 leading-[1.15]">
              See Your Shades<br />Before You Buy
            </h2>
            <p className="text-warm-gray text-base lg:text-lg mb-8 max-w-md">
              Our AI-powered shade builder lets you preview fabrics on your actual window — in real time. No guesswork, no surprises.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                { step: "01", title: "Upload your window photo", desc: "Snap a pic or use our sample rooms" },
                { step: "02", title: "Preview 700+ fabrics in real time", desc: "See blackout, light filtering, and textures on your window" },
                { step: "03", title: "Get your exact price instantly", desc: "Custom-sized to your measurements — no hidden fees" },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-sm font-bold text-gold">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark text-[15px]">{item.title}</h3>
                    <p className="text-sm text-warm-gray">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <CTAButton
              href="/builder"
              label="Try the AI Shade Builder — It's Free"
              trackingLocation="builder-showcase"
              variant="primary"
              size="lg"
            />
          </div>

          {/* Right — Builder Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-dark shadow-2xl">
              {/* Mock builder UI */}
              <div className="aspect-[4/3] relative">
                {/* Background room image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-soft to-dark-muted" />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: "url(/images/builder-preview-room.jpg)" }}
                />

                {/* Overlay UI elements */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white text-xs font-medium">AI Visualizer Active</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5">
                      <span className="text-white text-xs font-medium">700+ Fabrics</span>
                    </div>
                  </div>

                  {/* Bottom fabric selector mock */}
                  <div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Select Fabric</span>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>
                      <div className="flex gap-2">
                        {["#2c2c2c", "#8b7d6b", "#d4c5a9", "#f5f0e8", "#b8c4c4", "#6b4c3b"].map((color, i) => (
                          <div
                            key={i}
                            className={`w-10 h-10 rounded-lg transition-all ${i === 2 ? "ring-2 ring-gold ring-offset-2 ring-offset-dark scale-110" : "opacity-70 hover:opacity-100"}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating price badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-8 bg-white rounded-xl shadow-lg px-5 py-3 border border-cream-dark">
              <span className="block text-xs text-warm-gray font-medium">Your Price</span>
              <span className="block text-2xl font-bold text-dark heading-display">$247</span>
              <span className="block text-xs text-gold font-semibold">40% Off Applied</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
