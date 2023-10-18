import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params: { id },
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
      id: id,
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

  if (server.ownerId === session.user.userId) {
    return new NextResponse(JSON.stringify(["*","owner"]), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  }

  if (!server.members.length) {
    return error("Unauthorized", 403);
  }

  return new NextResponse(JSON.stringify(server.members[0].permissions), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=60`,
    },
  });
}
