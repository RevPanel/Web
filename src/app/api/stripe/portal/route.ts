import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
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

  const portal = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: `${process.env.APP_URL}/panel/account`,
  });

  return NextResponse.json({ id: portal.id, url: portal.url });
}
