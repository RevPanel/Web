import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { auth } from "@clerk/nextjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { name, description, ip } = await req.json();
  const { userId } = auth();

  if (!userId) {
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
      owner: userId,
    },
  });

  return NextResponse.json({
    id: server.id,
    key: server.key,
    command: `echo ${server.key}`,
  });
}
