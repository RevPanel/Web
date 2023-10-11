import stripe from "@/lib/stripe";
import { error } from "@/utils/responses";
import { NextResponse } from "next/server";
import * as context from "next/headers";
import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";

const plans = [
  {
    plan: "premium",
    price: 5.99,
    description: "Premium plan",
  },
  {
    plan: "pro",
    price: 12.99,
    description: "Pro plan",
  },
];

export async function POST(req: Request) {
  const { plan } = await req.json();
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!plan) {
    return error("No plan provided", 400);
  }

  const selectedPlan = plans.find((p) => p.plan === plan);
  if (!selectedPlan) {
    return error("Invalid plan", 400);
  }

  const checkout = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: selectedPlan.description,
          },
          unit_amount: selectedPlan.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.APP_URL}/`,
    cancel_url: `${process.env.APP_URL}/`,
  });

  await prisma.checkoutSession.create({
    data: {
      id: checkout.id,
      userId: session.user.userId,
      plan: plan,
    },
  });

  return NextResponse.json({ id: checkout.id, url: checkout.url });
}
