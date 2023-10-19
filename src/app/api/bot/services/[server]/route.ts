import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  {
    params: { server: serverId },
  }: {
    params: {
      server: string;
    };
  }
) {
  const authorization = req.headers.get("authorization");
  if (!authorization) return error("No authorization header", 401);

  const token = authorization.split(" ")[1];
  if (!token) return error("No token provided", 401);

  if (token !== process.env.ADMIN_KEY) {
    return error("Invalid token", 401);
  }

  const server = await prisma.server.findFirst({
    where: {
      id: serverId,
    },
  });

  if (!server) return error("Server not found", 404);

  try {
    const res = await axios.get(
      `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
        server.ip
      }:8080/containers/list`,
      {
        headers: {
          Authorization: `Bearer ${server.key}`,
          "Panel-User": "panel",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(err.response.data);
  }
}
