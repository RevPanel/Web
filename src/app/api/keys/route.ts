import { NextResponse, type NextRequest } from "next/server";
import * as context from "next/headers";
import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
  }

  const keys = await prisma.apiKey.findMany({
    where: {
      ownerId: session.user.userId,
    },
  });

  return NextResponse.json(
    keys.map((key) => ({
      ...key,
      key: key.key.slice(0, 2) + "******" + key.key.slice(-2),
    }))
  );
};

export const POST = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
  }

  const { description, ips } = await req.json();
  if (!description) {
    return error("Missing description", 400);
  }

  let ipList: string[] = [];
  if (ips && Array.isArray(ips)) {
    ipList = ips.map((ip) => ip.trim());
  }

  const key = await prisma.apiKey.create({
    data: {
      description,
      ownerId: session.user.userId,
      ips: ipList,
    },
  });

  return NextResponse.json(key);
};

export const DELETE = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Unauthorized", 401);
  }

  const query = new URL(req.nextUrl).searchParams;
  const id = query.get("id");

  if (!id) {
    return error("Missing id", 400);
  }

  const key = await prisma.apiKey.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!key || key.ownerId !== session.user.userId) {
    return error("Key not found", 404);
  }

  await prisma.apiKey.delete({
    where: {
      id: key.id,
    },
  });

  return NextResponse.json(key);
};
