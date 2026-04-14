import { NextResponse } from "next/server";

// Apple Pay domain verification
// Proxies Stripe's domain association file so Apple can verify this domain
export async function GET() {
  try {
    const res = await fetch(
      "https://stripe.com/files/apple-pay/apple-developer-merchantid-domain-association",
      { next: { revalidate: 86400 } }
    );
    const text = await res.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse("", { status: 500 });
  }
}
