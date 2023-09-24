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
      path: string[];
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const { id, path } = params;
  const { method } = req;

  const server = await prisma.server.findUnique({
    where: {
      id,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  try {
    const res = await axios({
      method,
      url: `http://${server.ip}:8080/${path.join("/")}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${server.key}`,
      },
      data: req.body ? JSON.stringify(req.body) : undefined,
    });

    return new NextResponse(JSON.stringify(res.data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(JSON.stringify(err.response.data), {
      status: err.response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export {
    handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT
};

