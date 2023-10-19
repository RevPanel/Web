import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { plans } from "@/types/plans";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { plan, yearly } = await req.json();
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
  }

  if (!plan) {
    return error("No plan provided", 400);
  }

  const selectedPlan = plans.find((p) => p.name.toLowerCase() === plan);
  if (!selectedPlan) {
    return error("Invalid plan", 400);
  }

  if (selectedPlan.name === "Free") {
    return error("You already have the free plan", 400);
  }

  const prices = await stripe.prices.list({
    lookup_keys: [
      selectedPlan.name.toLowerCase() + "-" + (yearly ? "year" : "month"),
    ],
    expand: ["data.product"],
  });

  if (!prices.data.length) {
    return error("Invalid plan", 400);
  }

  let stripeId = session.user.stripeId;
  if (!stripeId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
      metadata: {
        userId: session.user.userId,
      },
    });

    await prisma.user.update({
      where: { id: session.user.userId },
      data: { stripeId: customer.id },
    });

    stripeId = customer.id;
  }

  const checkout = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    customer: stripeId,
    mode: "subscription",
    success_url: `${process.env.APP_URL}/`,
    cancel_url: `${process.env.APP_URL}/#pricing`,
  });

  return NextResponse.json({ id: checkout.id, url: checkout.url });
}
