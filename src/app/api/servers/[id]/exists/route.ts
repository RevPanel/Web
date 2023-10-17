import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import * as context from "next/headers";
import { NextResponse } from "next/server";

async function handler(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  let userId;
  let admin = false;

  if (req.headers.has("Authorization")) {
    const key = req.headers.get("Authorization")?.split(" ")[1];
    if (key === process.env.ADMIN_KEY) {
      admin = true;
    } else {
      const k = await prisma.apiKey.findUnique({
        where: {
          key,
        },
      });

      if (!k) {
        return error("Unauthorized", 403);
      }

      userId = k.ownerId;
    }
  } else {
    const authRequest = auth.handleRequest(req.method, context);
    const session = await authRequest.validate();

    if (!session) {
      return error("Not logged in", 403);
    }

    userId = session.user.userId;
  }

  const { id } = params;
  const query = new URL(req.url).searchParams;

  if (!query.has("id")) {
    return error("Missing ID", 400);
  }

  const server = await prisma.server.findUnique({
    where: {
      id,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (!admin && server.ownerId !== userId) {
    return error("Unauthorized", 403);
  }

  try {
    const res = await axios.get(
      `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
        server.ip
      }:8080/containers/${query.get("id")}/exists`,
      {
        headers: {
          Authorization: `Bearer ${server.key}`,
          "Panel-User": admin ? "panel" : userId,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(true);
  }
}

export { handler as GET };
