import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const webhook = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (webhook.type) {
    case "customer.subscription.deleted":
    case "customer.subscription.updated":
    case "customer.subscription.created":
      const subscription = webhook.data.object;
      const status = subscription.status;

      if (status !== "active" && status !== "trialing") {
        const user = await prisma.user.findUnique({
          where: { stripeId: subscription.customer as string },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: null },
          });
        }
      } else {
        const plan = subscription.items.data[0].price.lookup_key!.split("-")[0];
        const user = await prisma.user.findUnique({
          where: { stripeId: subscription.customer as string },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: plan },
          });
        }
      }
      break;
  }

  return NextResponse.json({ received: true });
}
