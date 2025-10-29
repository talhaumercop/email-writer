import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paymentIntentId } = await req.json();

    // Verify payment intent was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Update user plan
    const user = await db.user.update({
      where: { id: session.user.id },
      data: {
        plan: "PRO",
        credits: { increment: 100 },
      },
    });

    return NextResponse.json({ 
      success: true,
      plan: user.plan,
      credits: user.credits
    });

  } catch (error: any) {
    console.error("Plan upgrade error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upgrade plan" },
      { status: 500 }
    );
  }
}