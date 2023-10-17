import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { UserAction } from "@prisma/client";
import { randomUUID } from "crypto";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { name, description, ip } = await req.json();
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  if (!name || !ip) {
    return error("Missing required fields", 400);
  }

  const previous = await prisma.server.findFirst({
    where: {
      ip,
    },
  });

  if (previous) {
    return error("Server already exists", 400);
  }

  const server = await prisma.server.create({
    data: {
      ip,
      name,
      description,
      key: randomUUID(),
      ownerId: session.user.userId,
    },
  });

  await prisma.userLogs.create({
    data: {
      userId: session.user.userId,
      action: UserAction.CREATE_SEVRER,
      data: name,
    },
  });

  await prisma.user.update({
    where: {
      id: session.user.userId,
    },
    data: {
      serverCreated: true,
    },
  });

  return NextResponse.json({
    id: server.id,
    key: server.key,
    command: `echo ${server.key}`,
  });
}
