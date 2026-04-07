// Site-wide constants. Pricing lives in @/constants.ts (existing builder file).
// Re-export sale helpers so marketing pages use a single import.
export { isSaleActive, getSalePrice, SALE_CONFIG, PRICE_MARKUP } from "@/constants";

export const SITE = {
  name: "World Wide Shades",
  tagline: "Custom Window Shades Made Simple",
  domain: "worldwideshades.com",
  builderDomain: "builder.worldwideshades.com",
  phone: "(888) 123-4567",
  email: "hello@worldwideshades.com",
  social: {
    instagram: "https://instagram.com/worldwideshades",
    facebook: "https://facebook.com/worldwideshades",
    pinterest: "https://pinterest.com/worldwideshades",
    youtube: "https://youtube.com/@worldwideshades",
  },
} as const;

export const CLOUDINARY_CLOUD = "dcmlcfynd";

export function cloudinaryUrl(publicId: string, transforms = "f_auto,q_auto,w_800"): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transforms}/${publicId}`;
}
