import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/account/", "/checkout/", "/cart/", "/order-confirmation/", "/track-order/", "/admin/"] }],
    sitemap: "https://worldwideshades.com/sitemap.xml",
  };
}
