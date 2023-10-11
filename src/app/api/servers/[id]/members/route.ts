import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: true,
      ownerId: true,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  return NextResponse.json(server.members);
}

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const body = await req.json();
  if (!body.userId) {
    return error("Missing userId", 400);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: true,
      ownerId: true,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  if (server.members.some((user) => user.userId === body.userId)) {
    return error("User is already a member", 400);
  }

  await prisma.server.update({
    where: {
      id: params.id,
    },
    data: {
      members: {
        create: {
          userId: body.userId,
          permissions: body.permissions,
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}
