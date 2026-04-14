"use client";

import { useEffect, useRef } from "react";
import { JsonLd } from "@/components/shared/JsonLd";

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Blackout Roller Shades",
  "description": "100% light-blocking custom blackout roller shades built to your exact window measurements. Available in 200+ premium blackout fabrics from leading mills including Phifer, Ferrari, and Mermet. Up to 50% off — from $145. Ships in approximately 7 business days. Made in USA.",
  "brand": { "@type": "Brand", "name": "World Wide Shades" },
  "manufacturer": { "@type": "Organization", "name": "World Wide Shades", "url": "https://worldwideshades.com" },
  "url": "https://worldwideshades.com/blackout-roller-shades",
  "image": "https://worldwideshades.com/images/blackout-roller-shades-hero.jpg",
  "category": "Blackout Window Shades",
  "material": "Premium Blackout Fabric",
  "countryOfOrigin": "US",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "145",
    "highPrice": "700",
    "offerCount": "200",
    "availability": "https://schema.org/InStock",
    "deliveryLeadTime": { "@type": "QuantitativeValue", "value": "7", "unitCode": "DAY" },
    "shippingDetails": { "@type": "OfferShippingDetails", "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "USD" }, "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" } }
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "500", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "Rachel M." }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Quoted $2,400 locally for our nursery. Paid under $700 with World Wide Shades. The blackout is complete — our toddler finally sleeps past 6am." },
    { "@type": "Review", "author": { "@type": "Person", "name": "David K." }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "I work nights. Tried everything — curtains, foil, you name it. These are zero light leakage. Like sleeping in a cave. Worth every penny." },
    { "@type": "Review", "author": { "@type": "Person", "name": "James T." }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Legitimately zero light in our theater room. Added the motorized option — close them with Alexa before movie night." }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Light Blocking", "value": "100%" },
    { "@type": "PropertyValue", "name": "Custom Sizing", "value": "Yes — built to exact measurements (to 1/8 inch)" },
    { "@type": "PropertyValue", "name": "Fabric Options", "value": "200+" },
    { "@type": "PropertyValue", "name": "Motorized Option", "value": "Available" },
    { "@type": "PropertyValue", "name": "Smart Home Compatible", "value": "Alexa, Google Home, Apple HomeKit, SmartThings, Matter" },
    { "@type": "PropertyValue", "name": "Warranty", "value": "100% Fit Guarantee" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How dark do blackout roller shades actually get?", "acceptedAnswer": { "@type": "Answer", "text": "World Wide Shades blackout roller shades block 100% of light when properly installed. The key is a custom fit — shades built to your exact window dimensions with minimal gaps on the sides. With an inside-mount shade and optional light-blocking side channels, you achieve near-total darkness." }},
    { "@type": "Question", "name": "What is the difference between blackout and room darkening shades?", "acceptedAnswer": { "@type": "Answer", "text": "Blackout shades block 100% of light using an opaque backing layer woven into the fabric. Room darkening shades typically block 95-99% of light, allowing a slight glow around the edges. For bedrooms, nurseries, and media rooms where complete darkness is essential, blackout roller shades are the recommended choice." }},
    { "@type": "Question", "name": "Do light-colored blackout fabrics still block all light?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The blackout layer is a separate backing woven into the fabric. A white or cream fabric with blackout backing blocks the same 100% of light as a dark charcoal. You choose the face color for aesthetics — the blackout performance is identical regardless of color." }},
    { "@type": "Question", "name": "How much do custom blackout roller shades cost?", "acceptedAnswer": { "@type": "Answer", "text": "Custom blackout roller shades from World Wide Shades start at $145 for small windows (with our 50% off Spring Sale), $180-$350 for standard bedroom and living room windows, and $250-$500 for large windows like sliding doors and panoramic windows. Factory-direct pricing saves up to 50% compared to showroom prices." }},
    { "@type": "Question", "name": "How long does shipping take for custom blackout shades?", "acceptedAnswer": { "@type": "Answer", "text": "World Wide Shades ships custom blackout roller shades in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3-4 weeks. Shipping is free to all US addresses via FedEx." }},
    { "@type": "Question", "name": "Can you get blackout roller shades for bedroom windows?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — bedrooms are the most popular use case for blackout roller shades. Custom-fit blackout shades eliminate light gaps that standard off-the-shelf shades leave around edges. Options include cordless (child-safe) and motorized versions. For nurseries, all fabrics are OEKO-TEX certified." }}
  ]
};

const CSS = `/* ===== RESET & BASE ===== */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;scroll-behavior:smooth;scroll-padding-top:80px}
body{min-height:100dvh;line-height:1.6;font-family:'DM Sans',system-ui,-apple-system,sans-serif;color:#E8E4DD;background:#0F0F0D}
img,svg{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
button{cursor:pointer;background:none;border:none;font:inherit;color:inherit}
ul,ol{list-style:none}
h1,h2,h3,h4,h5,h6{text-wrap:balance;line-height:1.15}
p,li{text-wrap:pretty;max-width:72ch}

/* ===== COLORS ===== */
:root{
  --gold:#C9A96E;
  --gold-hover:#D4B97E;
  --gold-dark:#B8944E;
  --bg:#0F0F0D;
  --bg-elevated:#1A1916;
  --bg-card:#161513;
  --text:#E8E4DD;
  --text-muted:#9B9690;
  --text-faint:#6B6660;
  --border:#2A2825;
  --border-light:#3A3835;
  --green:#5BA665;
  --section-gap:clamp(4rem,8vw,7rem);
}

/* ===== TYPOGRAPHY ===== */
.serif{font-family:'Instrument Serif',Georgia,serif}
.t-hero{font-size:clamp(2.25rem,1rem+4vw,4rem);line-height:1.08;letter-spacing:-0.02em;font-weight:700}
.t-section{font-size:clamp(1.75rem,1rem+2.5vw,2.75rem);line-height:1.12;letter-spacing:-0.015em;font-weight:700}
.t-subsection{font-size:clamp(1.25rem,1rem+0.75vw,1.5rem);line-height:1.2;font-weight:600}
.t-body{font-size:clamp(0.9375rem,0.875rem+0.25vw,1.0625rem);line-height:1.65}
.t-small{font-size:clamp(0.8125rem,0.75rem+0.2vw,0.9375rem);line-height:1.5}
.t-xs{font-size:0.75rem;line-height:1.5;letter-spacing:0.06em;text-transform:uppercase;font-weight:600}

/* ===== LAYOUT ===== */
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 clamp(1.25rem,4vw,2.5rem)}
.container--narrow{max-width:800px}
.section{padding:var(--section-gap) 0}

/* ===== COMPONENTS ===== */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.875rem 2rem;border-radius:6px;font-size:0.9375rem;font-weight:600;letter-spacing:0.01em;transition:all 220ms cubic-bezier(0.16,1,0.3,1);white-space:nowrap}
.btn--gold{background:var(--gold);color:#0F0F0D}
.btn--gold:hover{background:var(--gold-hover);transform:translateY(-1px);box-shadow:0 6px 24px rgba(201,169,110,0.25)}
.btn--outline{border:1.5px solid var(--border-light);color:var(--text)}
.btn--outline:hover{border-color:var(--gold);color:var(--gold)}
.btn--large{padding:1rem 2.5rem;font-size:1rem}
.badge{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.875rem;border:1px solid var(--border);border-radius:100px;font-size:0.75rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:var(--text-muted)}
.divider{height:1px;background:var(--border);margin:var(--section-gap) 0}
.gold{color:var(--gold)}
.check-icon{width:18px;height:18px;flex-shrink:0;color:var(--green)}

/* ===== NAVIGATION ===== */
.nav{position:sticky;top:0;z-index:100;background:rgba(15,15,13,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);transition:transform 300ms cubic-bezier(0.16,1,0.3,1)}
.nav__inner{display:flex;align-items:center;justify-content:space-between;height:64px;max-width:1200px;margin:0 auto;padding:0 clamp(1.25rem,4vw,2.5rem)}
.nav__logo{font-size:1.125rem;font-weight:500;letter-spacing:0.01em}
.nav__logo strong{font-weight:700}
.nav__links{display:flex;align-items:center;gap:2rem;font-size:0.875rem}
.nav__links a:hover{color:var(--gold)}
.nav__cta{padding:0.5rem 1.25rem;background:var(--gold);color:#0F0F0D;border-radius:6px;font-weight:600;font-size:0.8125rem}
.nav__cta:hover{background:var(--gold-hover)}
.nav__phone{font-size:0.8125rem;color:var(--text-muted)}
@media(max-width:768px){
  .nav__links--desktop{display:none}
  .nav__phone{display:none}
}
@media(min-width:769px){
  .nav__mobile-cta{display:none}
}

/* ===== PROMO BAR ===== */
.promo{background:var(--gold);color:#0F0F0D;text-align:center;padding:0.5rem 1rem;font-size:0.8125rem;font-weight:600}
.promo a{text-decoration:underline;font-weight:700}

/* ===== HERO ===== */
.hero{position:relative;overflow:hidden;padding:clamp(1.5rem,4vw,3rem) 0 clamp(2rem,4vw,4rem);background:linear-gradient(165deg,#1A1916 0%,#0F0F0D 40%,#131210 100%)}
.hero__grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem);align-items:center}
.hero__content{max-width:560px}
.hero__eyebrow{margin-bottom:1.25rem}
.hero h1{margin-bottom:1.25rem}
.hero__sub{font-size:clamp(1rem,0.9rem+0.4vw,1.1875rem);line-height:1.55;color:var(--text-muted);margin-bottom:2rem;max-width:480px}
.hero__actions{display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:2rem}
.hero__trust{display:flex;flex-wrap:wrap;gap:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border)}
.hero__trust-item{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)}
.hero__trust-item svg{width:16px;height:16px;color:var(--gold);flex-shrink:0}
.hero__image{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/5;background:var(--bg-elevated)}
.hero__image img{width:100%;height:100%;object-fit:cover}
.hero__price-anchor{position:absolute;bottom:1.25rem;left:1.25rem;background:rgba(15,15,13,0.88);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:10px;padding:1rem 1.25rem}
.hero__price-anchor .t-xs{color:var(--text-faint);margin-bottom:0.25rem}
.hero__price-anchor .price{font-size:1.75rem;font-weight:700;letter-spacing:-0.02em}
.hero__price-anchor .price span{font-size:0.875rem;font-weight:400;color:var(--text-muted)}
@media(max-width:768px){
  .hero__grid{grid-template-columns:1fr;gap:2rem}
  .hero__image{aspect-ratio:16/10;max-height:300px}
  .hero__price-anchor{bottom:0.75rem;left:0.75rem;padding:0.75rem 1rem}
  .hero__price-anchor .price{font-size:1.5rem}
}

/* ===== STATS BAR ===== */
.stats{background:var(--bg-elevated);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:1.5rem 0}
.stats__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center}
.stats__item{padding:0.5rem}
.stats__value{font-size:clamp(1.25rem,1rem+0.75vw,1.75rem);font-weight:700;letter-spacing:-0.02em;margin-bottom:0.125rem}
.stats__label{font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;font-weight:500}
@media(max-width:600px){.stats__grid{grid-template-columns:repeat(2,1fr)}}

/* ===== PROBLEM-SOLUTION ===== */
.problem-solution__grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem)}
.problem-card,.solution-card{border-radius:12px;padding:clamp(1.5rem,3vw,2.5rem)}
.problem-card{background:var(--bg-card);border:1px solid var(--border)}
.solution-card{background:linear-gradient(145deg,#1E1D1A,#1A1916);border:1px solid var(--gold-dark);box-shadow:0 0 40px rgba(201,169,110,0.06)}
.ps-list{display:flex;flex-direction:column;gap:1.25rem;margin-top:1.5rem}
.ps-item{display:flex;gap:0.75rem}
.ps-item__icon{width:24px;height:24px;flex-shrink:0;margin-top:0.125rem}
.ps-item__content h4{font-size:0.9375rem;font-weight:600;margin-bottom:0.25rem}
.ps-item__content p{font-size:0.875rem;color:var(--text-muted);line-height:1.55}
@media(max-width:768px){.problem-solution__grid{grid-template-columns:1fr}}

/* ===== ROOM TYPES ===== */
.rooms__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem}
.room-card{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:3/4;background:var(--bg-card);border:1px solid var(--border);transition:border-color 220ms}
.room-card:hover{border-color:var(--gold-dark)}
.room-card__img{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0.4;transition:opacity 300ms}
.room-card:hover .room-card__img{opacity:0.55}
.room-card__content{position:relative;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;z-index:1}
.room-card__badge{position:absolute;top:1rem;left:1rem;z-index:2}
.room-card h3{font-size:1.125rem;font-weight:600;margin-bottom:0.5rem}
.room-card p{font-size:0.8125rem;color:var(--text-muted);line-height:1.5;margin-bottom:1rem}
.room-card .btn{width:100%;font-size:0.8125rem;padding:0.625rem 1rem}
@media(max-width:768px){.rooms__grid{grid-template-columns:1fr;max-width:400px}}

/* ===== HOW IT WORKS ===== */
.steps__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:2.5rem}
.step{text-align:center;padding:1.5rem 1rem}
.step__number{width:40px;height:40px;border-radius:50%;background:var(--gold);color:#0F0F0D;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;font-weight:700;margin:0 auto 1rem}
.step h3{font-size:1rem;font-weight:600;margin-bottom:0.5rem}
.step p{font-size:0.8125rem;color:var(--text-muted);line-height:1.5}
@media(max-width:768px){.steps__grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.steps__grid{grid-template-columns:1fr}}

/* ===== COMPARISON TABLE ===== */
.comparison{overflow-x:auto;margin-top:2rem;border-radius:12px;border:1px solid var(--border)}
.comparison table{width:100%;min-width:600px;border-collapse:collapse}
.comparison th,.comparison td{padding:0.875rem 1.25rem;text-align:left;border-bottom:1px solid var(--border);font-size:0.875rem}
.comparison th{background:var(--bg-elevated);font-weight:600;font-size:0.8125rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em}
.comparison th:first-child{width:30%}
.comparison td:first-child{font-weight:500;color:var(--text)}
.comparison td{color:var(--text-muted)}
.comparison .highlight{background:rgba(201,169,110,0.04)}
.comparison .highlight td{color:var(--text)}
.comparison tr:last-child td{border-bottom:none}

/* ===== PRICING ===== */
.pricing__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem}
.price-card{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:2rem;display:flex;flex-direction:column;transition:border-color 220ms}
.price-card:hover{border-color:var(--gold-dark)}
.price-card--featured{border-color:var(--gold);position:relative}
.price-card--featured::before{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--gold);color:#0F0F0D;padding:0.25rem 1rem;border-radius:100px;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap}
.price-card__name{font-size:0.8125rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.5rem}
.price-card__range{font-size:2rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.25rem}
.price-card__desc{font-size:0.8125rem;color:var(--text-muted);margin-bottom:1.25rem;line-height:1.5}
.price-card__features{display:flex;flex-direction:column;gap:0.625rem;margin-bottom:1.5rem;flex-grow:1}
.price-card__feature{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)}
.price-card .btn{width:100%}
@media(max-width:768px){.pricing__grid{grid-template-columns:1fr;max-width:400px}}

/* ===== REVIEWS ===== */
.reviews__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem}
.review-card{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;display:flex;flex-direction:column}
.review-card__stars{color:var(--gold);font-size:0.875rem;letter-spacing:0.1em;margin-bottom:0.75rem}
.review-card__text{font-size:0.9375rem;line-height:1.6;flex-grow:1;margin-bottom:1rem;font-style:italic;color:var(--text-muted)}
.review-card__author{display:flex;flex-direction:column;gap:0.125rem;border-top:1px solid var(--border);padding-top:0.75rem}
.review-card__name{font-size:0.875rem;font-weight:600}
.review-card__meta{font-size:0.75rem;color:var(--text-faint)}
@media(max-width:768px){.reviews__grid{grid-template-columns:1fr}}

/* ===== MOTORIZED CTA ===== */
.motorized{background:linear-gradient(145deg,#1E1D1A,#141310);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.motorized__grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem);align-items:center}
.motorized__logos{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem}
.motorized__logo{padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;font-size:0.75rem;font-weight:600;color:var(--text-muted)}
@media(max-width:768px){.motorized__grid{grid-template-columns:1fr}}

/* ===== FAQ ===== */
.faq-list{display:flex;flex-direction:column;gap:0;margin-top:2rem}
.faq-item{border-bottom:1px solid var(--border)}
.faq-item:first-child{border-top:1px solid var(--border)}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 0;cursor:pointer;font-size:1rem;font-weight:500;gap:1rem;width:100%;text-align:left}
.faq-q:hover{color:var(--gold)}
.faq-q svg{width:20px;height:20px;flex-shrink:0;transition:transform 300ms;color:var(--text-faint)}
.faq-item.open .faq-q svg{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height 400ms cubic-bezier(0.16,1,0.3,1),padding 300ms}
.faq-item.open .faq-a{max-height:600px}
.faq-a__inner{padding:0 0 1.25rem;font-size:0.9375rem;line-height:1.65;color:var(--text-muted);max-width:640px}

/* ===== FINAL CTA ===== */
.final-cta{text-align:center;background:linear-gradient(180deg,var(--bg) 0%,var(--bg-elevated) 100%)}
.final-cta__badges{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:2rem}

/* ===== FOOTER ===== */
.footer{background:var(--bg-elevated);border-top:1px solid var(--border);padding:2.5rem 0}
.footer__inner{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.footer__copy{font-size:0.75rem;color:var(--text-faint)}
.footer__links{display:flex;gap:1.5rem;font-size:0.75rem;color:var(--text-faint)}
.footer__links a:hover{color:var(--gold)}

/* ===== SCROLL ANIMATIONS ===== */
.reveal{opacity:0;transform:translateY(24px);transition:opacity 700ms cubic-bezier(0.16,1,0.3,1),transform 700ms cubic-bezier(0.16,1,0.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}

/* ===== FABRIC LOGOS ===== */
.fabric-logos{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1.5rem}
.fabric-logo{padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;font-size:0.75rem;font-weight:600;color:var(--text-muted);letter-spacing:0.02em}

/* ===== SECTION HEADER ===== */
.section-header{margin-bottom:0;max-width:640px}
.section-header .t-xs{color:var(--gold);margin-bottom:0.75rem}
.section-header p{color:var(--text-muted);margin-top:0.75rem}
.section-header--center{text-align:center;margin-left:auto;margin-right:auto}

/* ===== BACK TO TOP ===== */
.btt{position:fixed;bottom:1.5rem;right:1.5rem;width:44px;height:44px;background:var(--gold);color:#0F0F0D;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 300ms,transform 300ms;z-index:90;box-shadow:0 4px 16px rgba(0,0,0,0.3)}
.btt.show{opacity:1;pointer-events:auto}
.btt:hover{transform:scale(1.1)}`;

const BODY_HTML = `<section class="hero" id="top">
  <div class="container">
    <div class="hero__grid">
      <div class="hero__content">
        <div class="hero__eyebrow">
          <span class="badge">100% Light Blocking · Factory Direct · Made in USA</span>
        </div>
        <h1 class="t-hero">Custom Blackout<br>Roller Shades</h1>
        <p class="hero__sub">Blackout window shades built to your exact measurements — down to ⅛". No light gaps. 200+ premium fabrics. Factory-direct pricing. Delivered in 7 days.</p>
        <div class="hero__actions">
          <a href="/builder?type=blackout" class="btn btn--gold btn--large">Design Your Blackout Shades</a>
          <a href="tel:+18446742716" class="btn btn--outline btn--large">Call (844) 674-2716</a>
        </div>
        <div style="margin-bottom:1.5rem;display:inline-flex;align-items:center;gap:0.5rem;background:rgba(201,169,110,0.12);border:1px solid rgba(201,169,110,0.25);border-radius:8px;padding:0.625rem 1rem">
          <span style="font-size:0.8125rem;font-weight:600;color:var(--gold)">Spring Sale — Up to 50% Off — Ends April 18</span>
        </div>
        <div class="hero__trust">
          <div class="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            4.9/5 from 500+ Homeowners
          </div>
          <div class="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9h20"/></svg>
            Ships in ~7 Days
          </div>
          <div class="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            100% Fit Guarantee
          </div>
          <div class="hero__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Made in USA
          </div>
        </div>
      </div>
      <div class="hero__image">
        <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80&auto=format" alt="Dark modern bedroom with custom blackout roller shades fully drawn, creating complete darkness for optimal sleep" width="800" height="1000" loading="eager" fetchpriority="high">
        <div class="hero__price-anchor">
          <div class="t-xs">Spring Sale — 50% Off</div>
          <div class="price"><span style="text-decoration:line-through;color:var(--text-faint);font-size:1rem;font-weight:400;margin-right:0.375rem">$290</span>$145 <span>/ window</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<div class="stats">
  <div class="container">
    <div class="stats__grid">
      <div class="stats__item">
        <div class="stats__value gold">100%</div>
        <div class="stats__label">Total Blackout</div>
      </div>
      <div class="stats__item">
        <div class="stats__value">~7 Days</div>
        <div class="stats__label">Ships From Order</div>
      </div>
      <div class="stats__item">
        <div class="stats__value">200+</div>
        <div class="stats__label">Blackout Fabrics</div>
      </div>
      <div class="stats__item">
        <div class="stats__value">From $145</div>
        <div class="stats__label">Factory Direct</div>
      </div>
    </div>
  </div>
</div>

<!-- PROBLEM / SOLUTION -->
<section class="section reveal" id="why">
  <div class="container">
    <div class="section-header section-header--center" style="margin-bottom:2.5rem">
      <div class="t-xs">Why Most Blackout Shades Fail</div>
      <h2 class="t-section">There's a Better Way to Block Light</h2>
    </div>
    <div class="problem-solution__grid">
      <div class="problem-card">
        <div class="t-xs" style="color:#A0645A;margin-bottom:1rem">The Problem</div>
        <div class="ps-list">
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="#A0645A" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <div class="ps-item__content">
              <h4>Light gaps ruin "blackout"</h4>
              <p>Stock blackout window shades never fit right — they're sized for standard windows, not yours. Light bleeds around every edge.</p>
            </div>
          </div>
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="#A0645A" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <div class="ps-item__content">
              <h4>Showroom quotes are brutal</h4>
              <p>$350–$500 per window just for the privilege of a custom quote. Then 3–4 weeks to wait.</p>
            </div>
          </div>
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="#A0645A" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <div class="ps-item__content">
              <h4>No way to preview</h4>
              <p>Buying blackout roller shades online is risky — colors and textures look different on screen versus in your room.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="solution-card">
        <div class="t-xs" style="color:var(--gold);margin-bottom:1rem">The Fix — World Wide Shades</div>
        <div class="ps-list">
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <div class="ps-item__content">
              <h4>Built to your exact window</h4>
              <p>Every blackout roller shade is precision-cut to ⅛" of your measurements. No gaps. No glow. No compromise.</p>
            </div>
          </div>
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <div class="ps-item__content">
              <h4>Factory-direct pricing</h4>
              <p>No showroom markup. No middleman. Custom blackout roller shades from $145 with our Spring Sale — delivered to your door.</p>
            </div>
          </div>
          <div class="ps-item">
            <svg class="ps-item__icon" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <div class="ps-item__content">
              <h4>AI Room Visualizer</h4>
              <p>Upload a photo of your window. See your chosen fabric and color rendered in your actual room before you order.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- BLACKOUT SHADES FOR BEDROOM / NURSERY / MEDIA ROOM -->
<section class="section reveal" id="rooms">
  <div class="container">
    <div class="section-header section-header--center" style="margin-bottom:0.5rem">
      <div class="t-xs">Blackout Shades for Every Room</div>
      <h2 class="t-section">Built for Bedrooms, Nurseries<br>& Media Rooms</h2>
      <p class="t-body">Whether you need blackout shades for bedroom windows, a baby's nursery, or a home theater — we build every shade to your room's exact requirements.</p>
    </div>
    <div class="rooms__grid">
      <div class="room-card">
        <div class="room-card__badge"><span class="badge" style="background:rgba(15,15,13,0.7)">Most Popular</span></div>
        <div class="room-card__img" style="background-image:url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=75&auto=format')"></div>
        <div class="room-card__content">
          <h3>Blackout Shades for Bedroom</h3>
          <p>Complete darkness for better sleep. Block sunrise, street lamps, and all ambient light. Wake up when you choose — not when the sun decides.</p>
          <a href="/builder?type=blackout" class="btn btn--gold">Build for Bedroom</a>
        </div>
      </div>
      <div class="room-card">
        <div class="room-card__badge"><span class="badge" style="background:rgba(15,15,13,0.7)">Parent Favorite</span></div>
        <div class="room-card__img" style="background-image:url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=75&auto=format')"></div>
        <div class="room-card__content">
          <h3>Blackout Shades for Nursery</h3>
          <p>Daytime naps in true darkness. Cordless for child safety. OEKO-TEX certified fabrics — nothing harmful near your baby.</p>
          <a href="/builder?type=blackout" class="btn btn--gold">Build for Nursery</a>
        </div>
      </div>
      <div class="room-card">
        <div class="room-card__badge"><span class="badge" style="background:rgba(15,15,13,0.7)">Enthusiast Pick</span></div>
        <div class="room-card__img" style="background-image:url('https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=75&auto=format')"></div>
        <div class="room-card__content">
          <h3>Blackout Shades for Media Room</h3>
          <p>Zero-glare environment for cinema-quality viewing. Pair with motorization — close everything with Alexa before movie night.</p>
          <a href="/builder?type=blackout" class="btn btn--gold">Build for Media Room</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section reveal" id="process" style="background:var(--bg-elevated);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <div class="section-header section-header--center">
      <div class="t-xs">How It Works</div>
      <h2 class="t-section">From Measurement to Installation<br>in 4 Simple Steps</h2>
    </div>
    <div class="steps__grid">
      <div class="step">
        <div class="step__number">1</div>
        <h3>Measure Your Window</h3>
        <p>Use our simple guide. Inside or outside mount — we've got you covered. Takes 5 minutes.</p>
      </div>
      <div class="step">
        <div class="step__number">2</div>
        <h3>Pick Your Fabric</h3>
        <p>200+ premium blackout fabrics. Order free swatches or preview in your room with AI visualizer.</p>
      </div>
      <div class="step">
        <div class="step__number">3</div>
        <h3>We Build It</h3>
        <p>Manufactured in the USA. Quality-checked. Packaged carefully. Ships in ~7 days via FedEx.</p>
      </div>
      <div class="step">
        <div class="step__number">4</div>
        <h3>Easy 15-Min Install</h3>
        <p>4 screws. All hardware included. 100% Fit Guarantee — if it doesn't fit, we remake it free.</p>
      </div>
    </div>
  </div>
</section>

<!-- COMPARISON -->
<section class="section reveal" id="compare">
  <div class="container">
    <div class="section-header section-header--center" style="margin-bottom:0">
      <div class="t-xs">See How We Compare</div>
      <h2 class="t-section">Blackout Roller Shades:<br>World Wide Shades vs. the Rest</h2>
    </div>
    <div class="comparison">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>World Wide Shades</th>
            <th>Showrooms</th>
            <th>Amazon / Big Box</th>
          </tr>
        </thead>
        <tbody>
          <tr class="highlight"><td>Custom Sizing</td><td>✓ To ⅛" precision</td><td>✓ Limited sizes</td><td>✗ Standard only</td></tr>
          <tr class="highlight"><td>Pricing</td><td><strong>From $145 (50% Off)</strong></td><td>$350–$500+</td><td>$30–$80 (not custom)</td></tr>
          <tr class="highlight"><td>Blackout Fabrics</td><td><strong>200+</strong></td><td>30–80</td><td>5–15</td></tr>
          <tr class="highlight"><td>Shipping Speed</td><td><strong>~7 Days</strong></td><td>3–4 Weeks</td><td>2–5 Days (stock only)</td></tr>
          <tr class="highlight"><td>Free Swatches</td><td>✓</td><td>Sometimes</td><td>✗</td></tr>
          <tr class="highlight"><td>Made in USA</td><td>✓</td><td>Sometimes</td><td>✗ Mostly imported</td></tr>
          <tr class="highlight"><td>100% Fit Guarantee</td><td>✓</td><td>Varies</td><td>✗</td></tr>
          <tr class="highlight"><td>AI Room Visualizer</td><td>✓</td><td>✗</td><td>✗</td></tr>
          <tr class="highlight"><td>Motorized Option</td><td>✓ From +$250</td><td>✓ $500+</td><td>✗</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="section reveal" id="pricing">
  <div class="container">
    <div class="section-header section-header--center">
      <div class="t-xs">Simple, Factory-Direct Pricing</div>
      <h2 class="t-section">How Much Do Custom Blackout<br>Roller Shades Cost?</h2>
      <p class="t-body">No showroom markup. No quote process. Real pricing, upfront. All blackout window shades include free shipping and our 100% Fit Guarantee.</p>
    </div>
    <div class="pricing__grid">
      <div class="price-card">
        <div class="price-card__name">Small Windows</div>
        <div class="price-card__range">$145 – $250</div>
        <div class="price-card__desc">Bathrooms, Home Offices, Sidelights</div>
        <div class="price-card__features">
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Custom-built to your specs</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 100% blackout fabric</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Free shipping</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Hardware included</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Motorized upgrade available</div>
        </div>
        <a href="/builder?type=blackout" class="btn btn--outline">Get Your Exact Price</a>
      </div>
      <div class="price-card price-card--featured">
        <div class="price-card__name">Standard Windows</div>
        <div class="price-card__range gold">$150 – $300</div>
        <div class="price-card__desc">Bedrooms, Living Rooms, Nurseries</div>
        <div class="price-card__features">
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Custom-built to your specs</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 100% blackout fabric</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Free shipping</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Hardware included</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Motorized upgrade available</div>
        </div>
        <a href="/builder?type=blackout" class="btn btn--gold">Get Your Exact Price</a>
      </div>
      <div class="price-card">
        <div class="price-card__name">Large Windows</div>
        <div class="price-card__range">$200 – $450</div>
        <div class="price-card__desc">Sliding Doors, Panoramic, Media Rooms</div>
        <div class="price-card__features">
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Custom-built to your specs</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 100% blackout fabric</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Free shipping</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Hardware included</div>
          <div class="price-card__feature"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Motorized upgrade available</div>
        </div>
        <a href="/builder?type=blackout" class="btn btn--outline">Get Your Exact Price</a>
      </div>
    </div>
    <p class="t-small" style="text-align:center;color:var(--text-faint);margin-top:1.25rem">Financing available with Affirm at checkout. Subject to credit approval.</p>
  </div>
</section>

<!-- FABRICS -->
<section class="section reveal" style="background:var(--bg-elevated);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <div class="section-header section-header--center">
      <div class="t-xs">Premium Textiles</div>
      <h2 class="t-section">200+ Premium Blackout Fabrics</h2>
      <p class="t-body">Curated from the world's leading textile mills. Every fabric blocks 100% of light. OEKO-TEX certified — free of harmful substances.</p>
    </div>
    <div class="fabric-logos" style="justify-content:center;margin-top:2rem">
      <span class="fabric-logo">Texstyle</span>
      <span class="fabric-logo">Phifer</span>
      <span class="fabric-logo">Ferrari</span>
      <span class="fabric-logo">Mermet</span>
      <span class="fabric-logo">Senbesta</span>
      <span class="fabric-logo">Copaco</span>
    </div>
    <div style="text-align:center;margin-top:2rem">
      <a href="/swatches" class="btn btn--outline">Order Free Fabric Swatches</a>
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section class="section reveal" id="reviews">
  <div class="container">
    <div class="section-header section-header--center">
      <div class="t-xs">Customer Reviews</div>
      <h2 class="t-section">4.9/5 from 500+ Verified Homeowners</h2>
    </div>
    <div class="reviews__grid">
      <div class="review-card">
        <div class="review-card__stars">★★★★★</div>
        <p class="review-card__text">"Quoted $2,400 locally for our nursery. Paid under $700 with World Wide Shades. The blackout is complete — our toddler finally sleeps past 6am."</p>
        <div class="review-card__author">
          <span class="review-card__name">Rachel M.</span>
          <span class="review-card__meta">Portland, OR · Nursery · Verified Buyer</span>
        </div>
      </div>
      <div class="review-card">
        <div class="review-card__stars">★★★★★</div>
        <p class="review-card__text">"I work nights. Tried everything — curtains, foil, you name it. These blackout window shades are zero light leakage. Like sleeping in a cave. Worth every penny."</p>
        <div class="review-card__author">
          <span class="review-card__name">David K.</span>
          <span class="review-card__meta">Austin, TX · Bedroom · Verified Buyer</span>
        </div>
      </div>
      <div class="review-card">
        <div class="review-card__stars">★★★★★</div>
        <p class="review-card__text">"Legitimately zero light in our theater room. Added the motorized option — close them with Alexa before movie night. Chef's kiss."</p>
        <div class="review-card__author">
          <span class="review-card__name">James T.</span>
          <span class="review-card__meta">Denver, CO · Home Theater · Verified Buyer</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MOTORIZED UPSELL -->
<section class="section motorized reveal" id="motorized">
  <div class="container">
    <div class="motorized__grid">
      <div>
        <div class="t-xs" style="color:var(--gold);margin-bottom:0.75rem">Motorization</div>
        <h2 class="t-section">Make Your Blackout Shades Smart</h2>
        <p class="t-body" style="color:var(--text-muted);margin-top:0.75rem;margin-bottom:1.25rem">Add motorization to any blackout roller shade. Control with your voice, phone, or a schedule. Whisper-quiet Somfy motors. Rechargeable battery — no hardwiring needed. 6+ month battery life.</p>
        <div class="motorized__logos">
          <span class="motorized__logo">Alexa</span>
          <span class="motorized__logo">Google Home</span>
          <span class="motorized__logo">Apple HomeKit</span>
          <span class="motorized__logo">SmartThings</span>
          <span class="motorized__logo">Matter</span>
        </div>
        <div style="margin-top:2rem">
          <a href="/motorized-shades" class="btn btn--gold">Explore Motorized Options</a>
        </div>
      </div>
      <div style="text-align:center">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:2rem;display:inline-block">
          <div class="t-xs" style="color:var(--text-faint);margin-bottom:1rem">Add to any shade</div>
          <div style="font-size:2.5rem;font-weight:700;letter-spacing:-0.02em">+$250</div>
          <div class="t-small" style="color:var(--text-muted);margin-top:0.25rem">Motor upgrade per shade</div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:1.25rem;text-align:left">
            <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Somfy motor included</div>
            <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Rechargeable battery</div>
            <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> App + voice control</div>
            <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted)"><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sun-tracking automation</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section reveal" id="faq">
  <div class="container container--narrow">
    <div class="section-header section-header--center">
      <div class="t-xs">Frequently Asked Questions</div>
      <h2 class="t-section">Everything You Need to Know<br>About Blackout Roller Shades</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          How dark do blackout roller shades actually get?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">Our blackout roller shades block 100% of light when properly installed. The key is a custom fit — shades built to your exact window dimensions with minimal gaps on the sides. With an inside-mount shade and optional light-blocking side channels, you achieve near-total darkness. We're talking sleep-through-noon darkness, not just dimming.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          What's the difference between blackout and room darkening shades?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">Blackout shades block 100% of light using an opaque backing layer woven into the fabric. Room darkening shades typically block 95–99% of light, allowing a slight glow around the edges. For bedrooms, nurseries, and media rooms where complete darkness is essential, blackout roller shades are the recommended choice. All our blackout window shades use full-opacity backing for true 100% light blocking.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Do light-colored blackout fabrics still block all light?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">Yes — absolutely. The blackout layer is a separate backing woven into the fabric. It has nothing to do with the face color. A white or cream fabric with a blackout backing blocks the same 100% of light as a dark charcoal. You're choosing face color for aesthetics and your room's decor — not for performance.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          How much do custom blackout roller shades cost?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">Custom blackout roller shades from World Wide Shades start at $145 for small windows (with our 50% off Spring Sale), $180–$350 for standard bedroom and living room windows, and $250–$500 for large windows like sliding doors and panoramic windows. Factory-direct pricing saves up to 50% compared to showroom prices. All prices include free shipping and our 100% Fit Guarantee.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          How fast do you ship blackout window shades?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">We ship custom blackout roller shades in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3–4 weeks. We've built a streamlined manufacturing process specifically to shorten this window — without cutting corners on quality. Free shipping via FedEx to all US addresses.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          Can I get blackout shades for bedroom windows specifically?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">Bedrooms are our most popular use case for blackout roller shades. Custom-fit blackout shades eliminate the light gaps that standard off-the-shelf shades leave around edges — critical for quality sleep. Options include cordless (child-safe) and motorized versions. For nurseries, all our blackout fabrics are OEKO-TEX certified, ensuring nothing harmful is near your baby.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          How is this different from Blinds.com or The Shade Store?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">We specialize exclusively in roller shades and focus intensely on blackout performance. Our fabrics are sourced from premium mills including Phifer, Ferrari, and Mermet — brands you won't find at mass-market retailers. We manufacture in the USA, offer an AI room visualizer, and price factory-direct without any showroom or retail markup. Our blackout roller shades ship in ~7 days versus 3–4 weeks from most competitors.</div></div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          What if I measure wrong?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div class="faq-a"><div class="faq-a__inner">We offer a 100% Fit Guarantee. If your blackout shades don't fit because of our measurement guide, we'll remake them at no charge. Our guide is simple and clear, and our team is available to double-check your measurements before production. We'd rather catch it early than have you deal with a bad fit.</div></div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="section final-cta reveal">
  <div class="container">
    <div class="section-header section-header--center">
      <h2 class="t-section">Stop Sleeping in a Room<br>That's Never Fully Dark.</h2>
      <p class="t-body" style="color:var(--text-muted);margin-top:0.75rem">Custom blackout roller shades — built to your exact window — delivered in 7 days.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.75rem;margin-top:2rem">
      <a href="/builder?type=blackout" class="btn btn--gold btn--large">Design Your Blackout Shades</a>
      <a href="tel:+18446742716" class="btn btn--outline btn--large">Call (844) 674-2716</a>
    </div>
    <div class="final-cta__badges">
      <span class="badge">100% Fit Guarantee</span>
      <span class="badge">~7 Day Shipping</span>
      <span class="badge">Free Shipping</span>
      <span class="badge">Made in USA</span>
    </div>
    <p class="t-small" style="text-align:center;color:var(--text-faint);margin-top:1.5rem">Questions? Call us at <a href="tel:+18446742716" style="color:var(--gold)">(844) 674-2716</a></p>
  </div>
</section>

<!-- FOOTER -->
<button class="btt" aria-label="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
</button>`;

export default function BlackoutRollerShadesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // FAQ accordion
    containerRef.current.querySelectorAll(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const wasOpen = item.classList.contains("open");
        containerRef.current!.querySelectorAll(".faq-item.open").forEach((i) => i.classList.remove("open"));
        if (!wasOpen) item.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(item.classList.contains("open")));
      });
    });

    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    containerRef.current.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Back to top
    const btt = containerRef.current.querySelector(".btt") as HTMLButtonElement;
    if (btt) {
      const handleScroll = () => btt.classList.toggle("show", window.scrollY > 600);
      window.addEventListener("scroll", handleScroll, { passive: true });
      btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      <JsonLd data={[PRODUCT_SCHEMA, FAQ_SCHEMA]} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        ref={containerRef}
        className="blackout-lp"
        style={{ background: "#0F0F0D", color: "#E8E4DD" }}
        dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      />
    </>
  );
}
