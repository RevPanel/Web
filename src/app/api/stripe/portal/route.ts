import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { error } from "@/utils/responses";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getUser();

  if (!session) {
    return error("Unauthorized", 401);
  }

  let stripeId = session.user.stripeId;
  if (!stripeId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
      metadata: {
        userId: session.user.id,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeId: customer.id },
    });

    stripeId = customer.id;
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: `${process.env.APP_URL}/panel/account`,
  });

  return NextResponse.redirect(portal.url, { status: 302 });
}
