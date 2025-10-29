import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // Stripe needs raw body for signature verification
  },
};

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing Stripe signature", { status: 400 });

  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { userId, userEmail } = paymentIntent.metadata || {};

      if (!userId && !userEmail) {
        console.warn("Webhook: missing user metadata");
        return NextResponse.json({ received: true });
      }

      const user = await db.user.findFirst({
        where: { OR: [{ id: userId }, { email: userEmail }] },
      });

      if (!user) {
        console.warn("Webhook: user not found");
        return NextResponse.json({ received: true });
      }

      // Only upgrade if not already PRO
      if (user.plan !== "PRO") {
        await db.user.update({
          where: { id: user.id },
          data: {
            plan: "PRO",
            credits: { increment: 100 },
          },
        });
        console.log(`Webhook: Upgraded user ${user.id} to PRO`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}