"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Batch Image Generator for Google Shopping
 * 
 * Replicates the exact Visualizer rendering logic:
 * 1. Loads the default room image
 * 2. For each fabric, loads the texture from Cloudinary
 * 3. Draws white underlay (0.85) + repeating pattern (scale 0.15)
 * 4. Composites room + shade overlay
 * 5. Outputs downloadable JPEGs
 */

const ROOM_IMAGE = "https://res.cloudinary.com/dcmlcfynd/image/upload/v1763580287/Visualizer_image_vsbovk.webp";

// Standard rectangle selection (calibrated from Visualizer.tsx)
const SEL = { x: 0.257, y: 0.158, w: 0.540, h: 0.393 };
const TEXTURE_SCALE = 0.15;
const WHITE_UNDERLAY = 0.85;

interface ProductDef {
  id: string;
  name: string;
  category: "Blackout" | "Light Filtering";
  textureUrl: string;
}

const PRODUCTS: ProductDef[] = [
  // BLACKOUT — BreezeGuard (Phifer 7500)
  { id: "wws-bg-cloud", name: "BreezeGuard Cloud", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335854/test-wws-fabrics/breezeguard-blackout-shades-cloud.jpg" },
  { id: "wws-bg-ice", name: "BreezeGuard Ice", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335852/test-wws-fabrics/breezeguard-blackout-shades-ice.jpg" },
  { id: "wws-bg-porcelain", name: "BreezeGuard Porcelain", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335855/test-wws-fabrics/breezeguard-blackout-shades-porcelain.jpg" },
  { id: "wws-bg-dune", name: "BreezeGuard Dune", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335857/test-wws-fabrics/breezeguard-blackout-shades-dune.jpg" },
  { id: "wws-bg-stone", name: "BreezeGuard Stone", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335859/test-wws-fabrics/breezeguard-blackout-shades-stone.jpg" },
  { id: "wws-bg-limestone", name: "BreezeGuard Limestone", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335860/test-wws-fabrics/breezeguard-blackout-shades-limestone.jpg" },
  { id: "wws-bg-mist", name: "BreezeGuard Mist", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335862/test-wws-fabrics/breezeguard-blackout-shades-mist.jpg" },
  { id: "wws-bg-nimbus", name: "BreezeGuard Nimbus", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335864/test-wws-fabrics/breezeguard-blackout-shades-nimbus.jpg" },
  { id: "wws-bg-tundra", name: "BreezeGuard Tundra", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335865/test-wws-fabrics/breezeguard-blackout-shades-tundra.jpg" },
  { id: "wws-bg-odyssey", name: "BreezeGuard Odyssey", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335867/test-wws-fabrics/breezeguard-blackout-shades-odyssey.jpg" },

  // BLACKOUT — DayLite Max (Phifer 7800)
  { id: "wws-dm-blanco", name: "DayLite Max Blanco", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335872/test-wws-fabrics/daylite-max-blackout-shades-blanco.jpg" },
  { id: "wws-dm-almond", name: "DayLite Max Almond", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335873/test-wws-fabrics/daylite-max-blackout-shades-almond.jpg" },
  { id: "wws-dm-dove", name: "DayLite Max Dove", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335877/test-wws-fabrics/daylite-max-blackout-shades-dove.jpg" },
  { id: "wws-dm-fleece", name: "DayLite Max Fleece", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335881/test-wws-fabrics/daylite-max-blackout-shades-fleece.jpg" },
  { id: "wws-dm-fossil", name: "DayLite Max Fossil", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335885/test-wws-fabrics/daylite-max-blackout-shades-fossil.jpg" },

  // BLACKOUT — EcoTherm (Phifer 7400)
  { id: "wws-et-cotton", name: "EcoTherm Cotton", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335838/test-wws-fabrics/ecotherm-blackout-shades-cotton.jpg" },
  { id: "wws-et-parchment", name: "EcoTherm Parchment", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335839/test-wws-fabrics/ecotherm-blackout-shades-parchment.jpg" },
  { id: "wws-et-pebble", name: "EcoTherm Pebble", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335843/test-wws-fabrics/ecotherm-blackout-shades-pebble.jpg" },
  { id: "wws-et-sesame", name: "EcoTherm Sesame", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335841/test-wws-fabrics/ecotherm-blackout-shades-sesame.jpg" },
  { id: "wws-et-flint", name: "EcoTherm Flint", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335851/test-wws-fabrics/ecotherm-blackout-shades-flint.jpg" },

  // BLACKOUT — DesertFade (Texstyle Tempe)
  { id: "wws-df-polar", name: "DesertFade Polar", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759361980/test-wws-fabrics/desertfade-blackout-shades-polar.jpg" },
  { id: "wws-df-linen", name: "DesertFade Linen", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759361982/test-wws-fabrics/desertfade-blackout-shades-linen.jpg" },
  { id: "wws-df-cloud", name: "DesertFade Cloud", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759361987/test-wws-fabrics/desertfade-blackout-shades-cloud.jpg" },
  { id: "wws-df-desert", name: "DesertFade Desert", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759361989/test-wws-fabrics/desertfade-blackout-shades-desert.jpg" },
  { id: "wws-df-ebony", name: "DesertFade Ebony", category: "Blackout", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759361994/test-wws-fabrics/desertfade-blackout-shades-ebony.jpg" },

  // LIGHT FILTERING — RenewWeave 3% (Texstyle)
  { id: "wws-rw-white-white", name: "RenewWeave White-White", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335981/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-white.jpg" },
  { id: "wws-rw-white-gray", name: "RenewWeave White-Gray", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335987/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-gray.jpg" },
  { id: "wws-rw-white-beige", name: "RenewWeave White-Beige", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335990/test-wws-fabrics/renewweave-3p-light-filtering-shades-white-beige.jpg" },
  { id: "wws-rw-gray-gray", name: "RenewWeave Gray-Gray", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335995/test-wws-fabrics/renewweave-3p-light-filtering-shades-gray-gray.jpg" },
  { id: "wws-rw-black-gray", name: "RenewWeave Black-Gray", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336004/test-wws-fabrics/renewweave-3p-light-filtering-shades-black-gray.jpg" },
  { id: "wws-rw-black-black", name: "RenewWeave Black-Black", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336009/test-wws-fabrics/renewweave-3p-light-filtering-shades-black-black.jpg" },

  // LIGHT FILTERING — PureShade 5% (Texstyle)
  { id: "wws-ps-pure-white", name: "PureShade Pure White", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336090/test-wws-fabrics/pureshade-5p-light-filtering-shades-pure-white.jpg" },
  { id: "wws-ps-alloy", name: "PureShade Alloy", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336096/test-wws-fabrics/pureshade-5p-light-filtering-shades-alloy.png" },
  { id: "wws-ps-barley", name: "PureShade Barley", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336093/test-wws-fabrics/pureshade-5p-light-filtering-shades-barley.png" },
  { id: "wws-ps-ash", name: "PureShade Ash", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336103/test-wws-fabrics/pureshade-5p-light-filtering-shades-ash.png" },
  { id: "wws-ps-graphite", name: "PureShade Graphite", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336110/test-wws-fabrics/pureshade-5p-light-filtering-shades-graphite.png" },

  // LIGHT FILTERING — Infinity Veil 3% (Phifer)
  { id: "wws-iv-cotton", name: "Infinity Veil Cotton", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336075/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-cotton.jpg" },
  { id: "wws-iv-almond", name: "Infinity Veil Almond", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336077/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-almond.jpg" },
  { id: "wws-iv-wheat", name: "Infinity Veil Wheat", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336078/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-wheat.jpg" },
  { id: "wws-iv-stone", name: "Infinity Veil Stone", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336080/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-stone.jpg" },
  { id: "wws-iv-nickel", name: "Infinity Veil Nickel", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336083/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-nickel.jpg" },
  { id: "wws-iv-slate", name: "Infinity Veil Slate", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759336087/test-wws-fabrics/infinity-veil-3p-light-filtering-shades-slate.jpg" },

  // LIGHT FILTERING — SkyShade 1% (Phifer 5000)
  { id: "wws-ss-bliss-cotton", name: "SkyShade Bliss Cotton", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335791/test-wws-fabrics/skyshade-1p-light-filtering-shades-blisscotton.jpg" },
  { id: "wws-ss-bliss-frost", name: "SkyShade Bliss Frost", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335792/test-wws-fabrics/skyshade-1p-light-filtering-shades-blissfrost.jpg" },
  { id: "wws-ss-linen-cream", name: "SkyShade Linen Cream", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335807/test-wws-fabrics/skyshade-1p-light-filtering-shades-linencream.jpg" },
  { id: "wws-ss-jute-fog", name: "SkyShade Jute Fog", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335814/test-wws-fabrics/skyshade-1p-light-filtering-shades-jutefog.jpg" },
  { id: "wws-ss-seaglass", name: "SkyShade Seaglass Crystal", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335812/test-wws-fabrics/skyshade-1p-light-filtering-shades-seaglasscrystal.jpg" },

  // LIGHT FILTERING — UltraBlock 0% (Phifer 8000)
  { id: "wws-ub-snow", name: "UltraBlock Snow", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335887/test-wws-fabrics/ultrablock-0p-light-filtering-shades-snow.jpg" },
  { id: "wws-ub-eggshell", name: "UltraBlock Eggshell", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335889/test-wws-fabrics/ultrablock-0p-light-filtering-shades-eggshell.jpg" },
  { id: "wws-ub-silver", name: "UltraBlock Silver", category: "Light Filtering", textureUrl: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_1000,c_scale/v1759335892/test-wws-fabrics/ultrablock-0p-light-filtering-shades-silver.jpg" },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

function createTiledTexture(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth * 2;
  canvas.height = img.naturalHeight * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  // 2×2 mirror tile for seamless repeat
  ctx.drawImage(img, 0, 0);
  ctx.save(); ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0); ctx.restore();
  ctx.save(); ctx.translate(0, canvas.height); ctx.scale(1, -1);
  ctx.drawImage(img, 0, 0); ctx.restore();
  ctx.save(); ctx.translate(canvas.width, canvas.height); ctx.scale(-1, -1);
  ctx.drawImage(img, 0, 0); ctx.restore();
  return canvas;
}

function renderProduct(
  roomImg: HTMLImageElement,
  textureCanvas: HTMLCanvasElement,
  category: "Blackout" | "Light Filtering",
  outputWidth = 1200
): string {
  const aspect = roomImg.naturalHeight / roomImg.naturalWidth;
  const W = outputWidth;
  const H = Math.round(W * aspect);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Draw room
  ctx.drawImage(roomImg, 0, 0, W, H);

  // Calculate selection in pixels
  const px = SEL.x * W;
  const py = SEL.y * H;
  const pw = SEL.w * W;
  const ph = SEL.h * H;

  // Clip to selection area
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.clip();

  // White underlay
  ctx.fillStyle = `rgba(255, 255, 255, ${WHITE_UNDERLAY})`;
  ctx.fillRect(px, py, pw, ph);

  // Fabric pattern fill
  try {
    const pattern = ctx.createPattern(textureCanvas, "repeat");
    if (pattern) {
      const matrix = new DOMMatrix();
      matrix.translateSelf(px, py);
      matrix.scaleSelf(TEXTURE_SCALE, TEXTURE_SCALE);
      pattern.setTransform(matrix);
      ctx.globalAlpha = category === "Light Filtering" ? 0.9 : 1.0;
      ctx.fillStyle = pattern;
      ctx.fillRect(px, py, pw, ph);
    }
  } catch (e) {
    console.warn("Pattern failed:", e);
  }

  ctx.restore();
  return canvas.toDataURL("image/jpeg", 0.92);
}

interface GeneratedImage {
  id: string;
  name: string;
  dataUrl: string;
  status: "pending" | "generating" | "done" | "error";
}

export default function GenerateImagesPage() {
  const [roomImg, setRoomImg] = useState<HTMLImageElement | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>(
    PRODUCTS.map((p) => ({ id: p.id, name: p.name, dataUrl: "", status: "pending" }))
  );
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load room image on mount
  useEffect(() => {
    loadImage(ROOM_IMAGE).then(setRoomImg).catch((e) => console.error("Room image failed:", e));
  }, []);

  const generate = useCallback(async () => {
    if (!roomImg) return;
    setRunning(true);

    for (let i = 0; i < PRODUCTS.length; i++) {
      const product = PRODUCTS[i];
      setImages((prev) =>
        prev.map((img, idx) => (idx === i ? { ...img, status: "generating" } : img))
      );

      try {
        const textureImg = await loadImage(product.textureUrl);
        const tiled = createTiledTexture(textureImg);
        const dataUrl = renderProduct(roomImg, tiled, product.category);

        setImages((prev) =>
          prev.map((img, idx) => (idx === i ? { ...img, dataUrl, status: "done" } : img))
        );
      } catch (e) {
        console.error(`Failed: ${product.name}`, e);
        setImages((prev) =>
          prev.map((img, idx) => (idx === i ? { ...img, status: "error" } : img))
        );
      }

      setProgress(i + 1);
      // Brief pause to let UI update
      await new Promise((r) => setTimeout(r, 100));
    }

    setRunning(false);
  }, [roomImg]);

  const downloadOne = (img: GeneratedImage) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = `${img.id}.jpg`;
    a.click();
  };

  const downloadAll = () => {
    images.filter((i) => i.status === "done").forEach((img, idx) => {
      setTimeout(() => downloadOne(img), idx * 200);
    });
  };

  const doneCount = images.filter((i) => i.status === "done").length;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        Google Shopping Image Generator
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Generates 50 product images using the exact Visualizer rendering logic.
        Room image + fabric texture overlay at 0.15 scale.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button
          onClick={generate}
          disabled={running || !roomImg}
          style={{
            padding: "10px 24px",
            background: running ? "#ccc" : "#c8a165",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: running ? "default" : "pointer",
          }}
        >
          {running ? `Generating... ${progress}/${PRODUCTS.length}` : "Generate All 50 Images"}
        </button>

        {doneCount > 0 && (
          <button
            onClick={downloadAll}
            style={{
              padding: "10px 24px",
              background: "#0c0c0c",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Download All ({doneCount})
          </button>
        )}
      </div>

      {running && (
        <div style={{ height: 4, background: "#eee", borderRadius: 2, marginBottom: 24 }}>
          <div
            style={{
              height: "100%",
              width: `${(progress / PRODUCTS.length) * 100}%`,
              background: "#c8a165",
              borderRadius: 2,
              transition: "width 0.3s",
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              overflow: "hidden",
              background: "#fafafa",
            }}
          >
            <div style={{ aspectRatio: "4/3", background: "#f0f0f0", position: "relative" }}>
              {img.dataUrl ? (
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    fontSize: 12,
                  }}
                >
                  {img.status === "generating" ? "Rendering..." : "Pending"}
                </div>
              )}
            </div>
            <div style={{ padding: "8px 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{img.name}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{img.id}</div>
              {img.dataUrl && (
                <button
                  onClick={() => downloadOne(img)}
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: "#c8a165",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
