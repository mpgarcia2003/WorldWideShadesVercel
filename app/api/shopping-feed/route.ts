import { NextResponse } from "next/server";

// Google Shopping Product Feed — 50 curated products
// Reference size: 48" × 72" (most common window)
// Pricing: cost + $50, displayed as 50% off

interface FeedProduct {
  id: string;
  title: string;
  description: string;
  shadeType: "blackout" | "lightfiltering";
  collection: string;
  color: string;
  manufacturer: string;
  priceGroup: string;
  fabricId: string;
  imageUrl: string;
}

// Price table values for 48x72 (breakpoint [3][1]) per group
const PRICES_48x72: Record<string, { table: number; posted: number; sale: number }> = {
  B: { table: 272, posted: 290, sale: 145 },
  C: { table: 297, posted: 308, sale: 154 },
  D: { table: 369, posted: 358, sale: 179 },
};

const PRODUCTS: FeedProduct[] = [
  // ═══ BLACKOUT — BreezeGuard (Phifer 7500, Group B) ═══
  { id: "wws-bg-cloud", title: "Custom Blackout Roller Shade - BreezeGuard Cloud", description: "Premium blackout roller shade in Cloud white. Phifer 7500 fabric blocks 99%+ light. Perfect for bedrooms, nurseries, and media rooms. Custom-made to your exact window measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Cloud", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_585", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335854/test-wws-fabrics/breezeguard-blackout-shades-cloud.jpg" },
  { id: "wws-bg-ice", title: "Custom Blackout Roller Shade - BreezeGuard Ice", description: "Premium blackout roller shade in Ice white. Phifer 7500 fabric blocks 99%+ light. Perfect for bedrooms and nurseries. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Ice", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_586", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335852/test-wws-fabrics/breezeguard-blackout-shades-ice.jpg" },
  { id: "wws-bg-porcelain", title: "Custom Blackout Roller Shade - BreezeGuard Porcelain", description: "Premium blackout roller shade in Porcelain. Phifer 7500 fabric blocks 99%+ light. Elegant neutral tone for any room. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Porcelain", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_584", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335855/test-wws-fabrics/breezeguard-blackout-shades-porcelain.jpg" },
  { id: "wws-bg-dune", title: "Custom Blackout Roller Shade - BreezeGuard Dune", description: "Premium blackout roller shade in Dune sand. Phifer 7500 fabric blocks 99%+ light. Warm earth tone for living spaces. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Dune", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_583", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335857/test-wws-fabrics/breezeguard-blackout-shades-dune.jpg" },
  { id: "wws-bg-stone", title: "Custom Blackout Roller Shade - BreezeGuard Stone", description: "Premium blackout roller shade in Stone gray. Phifer 7500 fabric blocks 99%+ light. Sophisticated neutral for modern interiors. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Stone", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_582", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335859/test-wws-fabrics/breezeguard-blackout-shades-stone.jpg" },
  { id: "wws-bg-limestone", title: "Custom Blackout Roller Shade - BreezeGuard Limestone", description: "Premium blackout roller shade in Limestone. Phifer 7500 fabric blocks 99%+ light. Soft warm gray for refined spaces. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Limestone", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_581", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335860/test-wws-fabrics/breezeguard-blackout-shades-limestone.jpg" },
  { id: "wws-bg-mist", title: "Custom Blackout Roller Shade - BreezeGuard Mist", description: "Premium blackout roller shade in Mist. Phifer 7500 fabric blocks 99%+ light. Light airy tone for serene bedrooms. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Mist", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_580", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335862/test-wws-fabrics/breezeguard-blackout-shades-mist.jpg" },
  { id: "wws-bg-nimbus", title: "Custom Blackout Roller Shade - BreezeGuard Nimbus", description: "Premium blackout roller shade in Nimbus. Phifer 7500 fabric blocks 99%+ light. Cool gray for contemporary design. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Nimbus", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_579", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335864/test-wws-fabrics/breezeguard-blackout-shades-nimbus.jpg" },
  { id: "wws-bg-tundra", title: "Custom Blackout Roller Shade - BreezeGuard Tundra", description: "Premium blackout roller shade in Tundra. Phifer 7500 fabric blocks 99%+ light. Deep gray for dramatic interiors. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Tundra", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_578", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335865/test-wws-fabrics/breezeguard-blackout-shades-tundra.jpg" },
  { id: "wws-bg-odyssey", title: "Custom Blackout Roller Shade - BreezeGuard Odyssey", description: "Premium blackout roller shade in Odyssey. Phifer 7500 fabric blocks 99%+ light. Rich dark tone for media rooms. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "BreezeGuard", color: "Odyssey", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_577", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335867/test-wws-fabrics/breezeguard-blackout-shades-odyssey.jpg" },

  // ═══ BLACKOUT — DayLite Max (Phifer 7800, Group B) ═══
  { id: "wws-dm-blanco", title: "Custom Blackout Roller Shade - DayLite Max Blanco", description: "Premium blackout roller shade in Blanco white. Phifer 7800 DayLite Max fabric blocks 99%+ light with superior energy efficiency. Custom-made. Free shipping.", shadeType: "blackout", collection: "DayLite Max", color: "Blanco", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_574", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335872/test-wws-fabrics/daylite-max-blackout-shades-blanco.jpg" },
  { id: "wws-dm-almond", title: "Custom Blackout Roller Shade - DayLite Max Almond", description: "Premium blackout roller shade in Almond. Phifer 7800 DayLite Max fabric. Warm neutral tone. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DayLite Max", color: "Almond", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_573", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335873/test-wws-fabrics/daylite-max-blackout-shades-almond.jpg" },
  { id: "wws-dm-dove", title: "Custom Blackout Roller Shade - DayLite Max Dove", description: "Premium blackout roller shade in Dove. Phifer 7800 DayLite Max fabric. Soft gray for elegant spaces. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DayLite Max", color: "Dove", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_571", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335877/test-wws-fabrics/daylite-max-blackout-shades-dove.jpg" },
  { id: "wws-dm-fleece", title: "Custom Blackout Roller Shade - DayLite Max Fleece", description: "Premium blackout roller shade in Fleece. Phifer 7800 DayLite Max fabric. Light creamy tone. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DayLite Max", color: "Fleece", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_569", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335881/test-wws-fabrics/daylite-max-blackout-shades-fleece.jpg" },
  { id: "wws-dm-fossil", title: "Custom Blackout Roller Shade - DayLite Max Fossil", description: "Premium blackout roller shade in Fossil. Phifer 7800 DayLite Max fabric. Earthy mid-tone gray. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DayLite Max", color: "Fossil", manufacturer: "Phifer", priceGroup: "B", fabricId: "fab_567", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335885/test-wws-fabrics/daylite-max-blackout-shades-fossil.jpg" },

  // ═══ BLACKOUT — EcoTherm (Phifer 7400, Group D) ═══
  { id: "wws-et-cotton", title: "Custom Blackout Roller Shade - EcoTherm Cotton", description: "Premium blackout roller shade in Cotton. Phifer 7400 EcoTherm fabric with thermal insulation. Blocks 99%+ light and reduces energy costs. Custom-made. Free shipping.", shadeType: "blackout", collection: "EcoTherm", color: "Cotton", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_594", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335838/test-wws-fabrics/ecotherm-blackout-shades-cotton.jpg" },
  { id: "wws-et-parchment", title: "Custom Blackout Roller Shade - EcoTherm Parchment", description: "Premium blackout roller shade in Parchment. Phifer 7400 EcoTherm fabric with thermal insulation. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "EcoTherm", color: "Parchment", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_593", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335839/test-wws-fabrics/ecotherm-blackout-shades-parchment.jpg" },
  { id: "wws-et-pebble", title: "Custom Blackout Roller Shade - EcoTherm Pebble", description: "Premium blackout roller shade in Pebble. Phifer 7400 EcoTherm fabric with thermal insulation. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "EcoTherm", color: "Pebble", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_591", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335843/test-wws-fabrics/ecotherm-blackout-shades-pebble.jpg" },
  { id: "wws-et-sesame", title: "Custom Blackout Roller Shade - EcoTherm Sesame", description: "Premium blackout roller shade in Sesame. Phifer 7400 EcoTherm fabric with thermal insulation. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "EcoTherm", color: "Sesame", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_592", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335841/test-wws-fabrics/ecotherm-blackout-shades-sesame.jpg" },
  { id: "wws-et-flint", title: "Custom Blackout Roller Shade - EcoTherm Flint", description: "Premium blackout roller shade in Flint. Phifer 7400 EcoTherm fabric with thermal insulation. Deep charcoal tone. Custom-made. Free shipping.", shadeType: "blackout", collection: "EcoTherm", color: "Flint", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_587", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335851/test-wws-fabrics/ecotherm-blackout-shades-flint.jpg" },

  // ═══ BLACKOUT — DesertFade (Texstyle Tempe, Group C) ═══
  { id: "wws-df-polar", title: "Custom Blackout Roller Shade - DesertFade Polar", description: "Premium blackout roller shade in Polar white. Texstyle Tempe fabric blocks 99%+ light. Clean modern aesthetic. Custom-made. Free shipping.", shadeType: "blackout", collection: "DesertFade", color: "Polar", manufacturer: "Texstyle", priceGroup: "C", fabricId: "fab_145", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759361980/test-wws-fabrics/desertfade-blackout-shades-polar.jpg" },
  { id: "wws-df-linen", title: "Custom Blackout Roller Shade - DesertFade Linen", description: "Premium blackout roller shade in Linen. Texstyle Tempe fabric. Natural warm tone. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DesertFade", color: "Linen", manufacturer: "Texstyle", priceGroup: "C", fabricId: "fab_144", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759361982/test-wws-fabrics/desertfade-blackout-shades-linen.jpg" },
  { id: "wws-df-cloud", title: "Custom Blackout Roller Shade - DesertFade Cloud", description: "Premium blackout roller shade in Cloud. Texstyle Tempe fabric. Soft white for bright spaces. Custom-made. Free shipping.", shadeType: "blackout", collection: "DesertFade", color: "Cloud", manufacturer: "Texstyle", priceGroup: "C", fabricId: "fab_142", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759361987/test-wws-fabrics/desertfade-blackout-shades-cloud.jpg" },
  { id: "wws-df-desert", title: "Custom Blackout Roller Shade - DesertFade Desert", description: "Premium blackout roller shade in Desert. Texstyle Tempe fabric. Warm sandy tone. Custom-made to your exact measurements. Free shipping.", shadeType: "blackout", collection: "DesertFade", color: "Desert", manufacturer: "Texstyle", priceGroup: "C", fabricId: "fab_141", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759361989/test-wws-fabrics/desertfade-blackout-shades-desert.jpg" },
  { id: "wws-df-ebony", title: "Custom Blackout Roller Shade - DesertFade Ebony", description: "Premium blackout roller shade in Ebony. Texstyle Tempe fabric. Rich dark tone for dramatic rooms. Custom-made. Free shipping.", shadeType: "blackout", collection: "DesertFade", color: "Ebony", manufacturer: "Texstyle", priceGroup: "C", fabricId: "fab_139", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759361994/test-wws-fabrics/desertfade-blackout-shades-ebony.jpg" },

  // ═══ LIGHT FILTERING — RenewWeave 3% (Texstyle Ambient Renew, Group B) ═══
  { id: "wws-rw-white-white", title: "Custom Light Filtering Shade - RenewWeave White/White", description: "Light filtering roller shade in White/White. 3% openness softens sunlight while maintaining your view. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "White/White", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_528", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335981/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-white.jpg" },
  { id: "wws-rw-white-gray", title: "Custom Light Filtering Shade - RenewWeave White/Gray", description: "Light filtering roller shade in White/Gray. 3% openness softens sunlight while maintaining your view. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "White/Gray", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_526", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335987/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-gray.jpg" },
  { id: "wws-rw-white-beige", title: "Custom Light Filtering Shade - RenewWeave White/Beige", description: "Light filtering roller shade in White/Beige. 3% openness. Warm neutral tone. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "White/Beige", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_525", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335990/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-beige.jpg" },
  { id: "wws-rw-gray-gray", title: "Custom Light Filtering Shade - RenewWeave Gray/Gray", description: "Light filtering roller shade in Gray/Gray. 3% openness with better glare reduction. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "Gray/Gray", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_523", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335995/test-wws-fabrics/renewweave-3p-light-filtering-shades-gray-gray.jpg" },
  { id: "wws-rw-black-gray", title: "Custom Light Filtering Shade - RenewWeave Black/Gray", description: "Light filtering roller shade in Black/Gray. 3% openness with superior glare reduction. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "Black/Gray", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_520", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336004/test-wws-fabrics/renewweave-3p-light-filtering-shades-black-gray.jpg" },
  { id: "wws-rw-black-black", title: "Custom Light Filtering Shade - RenewWeave Black/Black", description: "Light filtering roller shade in Black/Black. 3% openness with maximum glare reduction. Eco-friendly recycled fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "RenewWeave 3%", color: "Black/Black", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_518", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336009/test-wws-fabrics/renewweave-3p-light-filtering-shades-black-black.jpg" },

  // ═══ LIGHT FILTERING — PureShade 5% (Texstyle Kleenscreen, Group B) ═══
  { id: "wws-ps-pure-white", title: "Custom Light Filtering Shade - PureShade Pure White", description: "Light filtering roller shade in Pure White. 5% openness for bright, airy spaces. Anti-microbial Kleenscreen fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "PureShade 5%", color: "Pure White", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_467", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336090/test-wws-fabrics/pureshade-5p-light-filtering-shades-pure-white.jpg" },
  { id: "wws-ps-alloy", title: "Custom Light Filtering Shade - PureShade Alloy", description: "Light filtering roller shade in Alloy. 5% openness. Modern metallic tone. Anti-microbial Kleenscreen fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "PureShade 5%", color: "Alloy", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_465", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336096/test-wws-fabrics/pureshade-5p-light-filtering-shades-alloy.png" },
  { id: "wws-ps-barley", title: "Custom Light Filtering Shade - PureShade Barley", description: "Light filtering roller shade in Barley. 5% openness. Warm wheat tone. Anti-microbial Kleenscreen fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "PureShade 5%", color: "Barley", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_466", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336093/test-wws-fabrics/pureshade-5p-light-filtering-shades-barley.png" },
  { id: "wws-ps-ash", title: "Custom Light Filtering Shade - PureShade Ash", description: "Light filtering roller shade in Ash. 5% openness. Cool gray tone. Anti-microbial Kleenscreen fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "PureShade 5%", color: "Ash", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_463", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336103/test-wws-fabrics/pureshade-5p-light-filtering-shades-ash.png" },
  { id: "wws-ps-graphite", title: "Custom Light Filtering Shade - PureShade Graphite", description: "Light filtering roller shade in Graphite. 5% openness. Dark sophisticated tone. Anti-microbial Kleenscreen fabric. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "PureShade 5%", color: "Graphite", manufacturer: "Texstyle", priceGroup: "B", fabricId: "fab_461", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336110/test-wws-fabrics/pureshade-5p-light-filtering-shades-graphite.png" },

  // ═══ LIGHT FILTERING — Infinity Veil 3% (Phifer Infinity, Group C) ═══
  { id: "wws-iv-cotton", title: "Custom Light Filtering Shade - Infinity Veil Cotton", description: "Light filtering roller shade in Cotton. Phifer Infinity fabric with 3% openness. Soft natural white. Custom-made to your exact measurements. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Cotton", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_476", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336075/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-cotton.jpg" },
  { id: "wws-iv-almond", title: "Custom Light Filtering Shade - Infinity Veil Almond", description: "Light filtering roller shade in Almond. Phifer Infinity fabric with 3% openness. Warm neutral. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Almond", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_475", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336077/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-almond.jpg" },
  { id: "wws-iv-wheat", title: "Custom Light Filtering Shade - Infinity Veil Wheat", description: "Light filtering roller shade in Wheat. Phifer Infinity fabric with 3% openness. Golden warm tone. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Wheat", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_474", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336078/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-wheat.jpg" },
  { id: "wws-iv-stone", title: "Custom Light Filtering Shade - Infinity Veil Stone", description: "Light filtering roller shade in Stone. Phifer Infinity fabric with 3% openness. Cool gray. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Stone", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_473", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336080/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-stone.jpg" },
  { id: "wws-iv-nickel", title: "Custom Light Filtering Shade - Infinity Veil Nickel", description: "Light filtering roller shade in Nickel. Phifer Infinity fabric with 3% openness. Sleek metallic gray. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Nickel", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_471", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336083/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-nickel.jpg" },
  { id: "wws-iv-slate", title: "Custom Light Filtering Shade - Infinity Veil Slate", description: "Light filtering roller shade in Slate. Phifer Infinity fabric with 3% openness. Deep blue-gray. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "Infinity Veil 3%", color: "Slate", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_468", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759336087/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-slate.jpg" },

  // ═══ LIGHT FILTERING — SkyShade 1% (Phifer 5000, Group C) ═══
  { id: "wws-ss-bliss-cotton", title: "Custom Light Filtering Shade - SkyShade Bliss Cotton", description: "Light filtering roller shade in Bliss Cotton. Phifer 5000 SkyShade fabric with 1% openness for maximum UV protection while maintaining views. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "SkyShade 1%", color: "Bliss Cotton", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_619", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335791/test-wws-fabrics/skyshade-1p-light-filtering-shades-blisscotton.jpg" },
  { id: "wws-ss-bliss-frost", title: "Custom Light Filtering Shade - SkyShade Bliss Frost", description: "Light filtering roller shade in Bliss Frost. Phifer 5000 SkyShade fabric with 1% openness. Cool icy tone. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "SkyShade 1%", color: "Bliss Frost", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_618", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335792/test-wws-fabrics/skyshade-1p-light-filtering-shades-blissfrost.jpg" },
  { id: "wws-ss-linen-cream", title: "Custom Light Filtering Shade - SkyShade Linen Cream", description: "Light filtering roller shade in Linen Cream. Phifer 5000 SkyShade fabric with 1% openness. Warm elegant tone. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "SkyShade 1%", color: "Linen Cream", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_612", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335807/test-wws-fabrics/skyshade-1p-light-filtering-shades-linencream.jpg" },
  { id: "wws-ss-jute-fog", title: "Custom Light Filtering Shade - SkyShade Jute Fog", description: "Light filtering roller shade in Jute Fog. Phifer 5000 SkyShade fabric with 1% openness. Natural textured look. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "SkyShade 1%", color: "Jute Fog", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_608", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335814/test-wws-fabrics/skyshade-1p-light-filtering-shades-jutefog.jpg" },
  { id: "wws-ss-seaglass", title: "Custom Light Filtering Shade - SkyShade Seaglass Crystal", description: "Light filtering roller shade in Seaglass Crystal. Phifer 5000 SkyShade fabric with 1% openness. Unique coastal-inspired tone. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "SkyShade 1%", color: "Seaglass Crystal", manufacturer: "Phifer", priceGroup: "C", fabricId: "fab_609", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335812/test-wws-fabrics/skyshade-1p-light-filtering-shades-seaglasscrystal.jpg" },

  // ═══ LIGHT FILTERING — UltraBlock 0% (Phifer 8000, Group D) ═══
  { id: "wws-ub-snow", title: "Custom Light Filtering Shade - UltraBlock Snow", description: "Light filtering roller shade in Snow. Phifer 8000 UltraBlock fabric with 0% openness for maximum privacy while diffusing light beautifully. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "UltraBlock 0%", color: "Snow", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_566", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335887/test-wws-fabrics/ultrablock-0p-light-filtering-shades-snow.jpg" },
  { id: "wws-ub-eggshell", title: "Custom Light Filtering Shade - UltraBlock Eggshell", description: "Light filtering roller shade in Eggshell. Phifer 8000 UltraBlock fabric with 0% openness. Warm white with complete privacy. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "UltraBlock 0%", color: "Eggshell", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_565", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335889/test-wws-fabrics/ultrablock-0p-light-filtering-shades-eggshell.jpg" },
  { id: "wws-ub-silver", title: "Custom Light Filtering Shade - UltraBlock Silver", description: "Light filtering roller shade in Silver. Phifer 8000 UltraBlock fabric with 0% openness. Sleek metallic tone with complete privacy. Custom-made. Free shipping.", shadeType: "lightfiltering", collection: "UltraBlock 0%", color: "Silver", manufacturer: "Phifer", priceGroup: "D", fabricId: "fab_563", imageUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1759335892/test-wws-fabrics/ultrablock-0p-light-filtering-shades-silver.jpg" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildFeed(): string {
  const baseUrl = "https://worldwideshades.com";
  const items = PRODUCTS.map((p) => {
    const pricing = PRICES_48x72[p.priceGroup];
    const typeParam = p.shadeType === "blackout" ? "blackout" : "lightfiltering";
    const link = `${baseUrl}/builder?type=${typeParam}&fabric=${p.fabricId}&width=48&height=72`;
    const productType =
      p.shadeType === "blackout"
        ? "Home &gt; Window Treatments &gt; Roller Shades &gt; Blackout"
        : "Home &gt; Window Treatments &gt; Roller Shades &gt; Light Filtering";
    const customLabel0 = p.shadeType === "blackout" ? "Blackout" : "Light Filtering";
    const customLabel1 =
      pricing.sale <= 150 ? "Under $150" : pricing.sale <= 175 ? "$150-$175" : "$175+";

    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <title>${escapeXml(p.title)}</title>
      <description>${escapeXml(p.description)}</description>
      <link>${escapeXml(link)}</link>
      <g:image_link>${escapeXml(p.imageUrl)}</g:image_link>
      <g:price>${pricing.posted.toFixed(2)} USD</g:price>
      <g:sale_price>${pricing.sale.toFixed(2)} USD</g:sale_price>
      <g:brand>World Wide Shades</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:mpn>WWS-${escapeXml(p.id.replace("wws-", "").toUpperCase())}</g:mpn>
      <g:google_product_category>2613</g:google_product_category>
      <g:product_type>${productType}</g:product_type>
      <g:custom_label_0>${customLabel0}</g:custom_label_0>
      <g:custom_label_1>${customLabel1}</g:custom_label_1>
      <g:color>${escapeXml(p.color)}</g:color>
      <g:material>${escapeXml(p.collection)}</g:material>
      <g:shipping>
        <g:country>US</g:country>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:custom_label_2>${escapeXml(p.manufacturer)}</g:custom_label_2>
      <g:custom_label_3>48x72</g:custom_label_3>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>World Wide Shades - Custom Roller Shades</title>
    <link>https://worldwideshades.com</link>
    <description>Custom roller shades direct to your door. 700+ premium fabrics, blackout and light filtering, motorized options. Up to 50% off. Free shipping.</description>
${items.join("\n")}
  </channel>
</rss>`;
}

export async function GET() {
  const xml = buildFeed();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
