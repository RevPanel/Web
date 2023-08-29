import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { randomUUID } from "crypto";

export async function POST(req: Request, res: Response) {
  const { name, ip, username, password } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return error("Not logged in", 403);
  }

  if (!name || !ip || !username || !password) {
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

  /* todo: reactivate  try {
    await axios.get(`https://${ip}:8080/system/health`);
    return error("Server already exists", 400);
  } catch (e) {
    // works
  } */

  const server = await prisma.server.create({
    data: {
      ip,
      name,
      key: randomUUID(),
      owner: userId,
    },
  });

  return NextResponse.json({
    id: server.id,
  });
}
