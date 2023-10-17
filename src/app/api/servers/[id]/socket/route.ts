import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import * as context from "next/headers";
import { NextResponse } from "next/server";

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
    return error("Unauthorized", 403);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id as string,
    },
    include: {
      members: {
        where: {
          userId: session.user.userId,
        },
      },
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  try {
    const { data } = await axios.post(
      `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
        server.ip
      }:8080/sockets/create`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${server.key}`,
          "Panel-User": session.user.userId,
          "Panel-User-Permissions": JSON.stringify(
            server.members[0]?.permissions || ["*"]
          ),
        },
      }
    );

    return NextResponse.json({
      token: data.token,
      ip: `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
        server.ip
      }:8080`,
    });
  } catch (e) {
    console.log(e);
    return error("Something went wrong", 500);
  }
}
