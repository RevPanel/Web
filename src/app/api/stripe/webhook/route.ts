import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { error } from "@/utils/responses";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const webhook = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (webhook.type === "checkout.session.completed") {
    const session = webhook.data.object as Stripe.Checkout.Session;

    const checkout = await prisma.checkoutSession.findUnique({
      where: { id: session.id },
    });

    if (!checkout) {
      return error("Checkout session not found", 404);
    }

    await prisma.user.update({
      where: { id: checkout.userId },
      data: { plan: checkout.plan, renewDate: new Date() },
    });

    await prisma.checkoutSession.delete({
      where: { id: checkout.id },
    });
  }

  return NextResponse.json({ received: true });
}
