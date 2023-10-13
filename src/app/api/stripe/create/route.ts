import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { plans } from "@/types/plans";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { plan } = await req.json();
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
  }

  if (!plan) {
    return error("No plan provided", 400);
  }

  const selectedPlan = plans.find((p) => p.name === plan);
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
