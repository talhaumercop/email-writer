import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      console.error("Missing STRIPE_SECRET_KEY");
      return new Response(JSON.stringify({ error: "Server misconfiguration: STRIPE_SECRET_KEY missing" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const stripe = new Stripe(secret, { apiVersion: "2025-09-30.clover" });

    const { amount, userId, userEmail, plan = "PRO" } = await req.json();

    if (!amount || typeof amount !== "number") {
      return new Response(JSON.stringify({ error: "Amount is required and must be a number" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        ...(userId ? { userId } : {}),
        ...(userEmail ? { userEmail } : {}),
        plan,
      },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("create-payment-intent error:", err?.stack || err?.message || err);
    return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}