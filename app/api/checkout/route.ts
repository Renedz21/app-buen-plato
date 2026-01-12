import { type NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

/**
 * Checkout API Route
 *
 * Creates a Polar checkout session for subscription purchases.
 *
 * Usage: GET /api/checkout?productId=xxx
 * Returns: Redirect to Polar checkout page
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const successUrl = `${request.nextUrl.origin}/dashboard?checkout=success&checkout_id={CHECKOUT_ID}`;

    // Create checkout session
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl,
    });

    // Redirect to checkout URL
    return NextResponse.redirect(checkout.url);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
