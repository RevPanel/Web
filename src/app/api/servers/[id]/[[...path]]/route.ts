import { keyOwner } from "@/lib/keys";
import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

async function handler(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
      path: string[];
    };
  }
) {
  let userId;
  let admin = false;

  if (req.headers.has("Authorization")) {
    const key = req.headers.get("Authorization")?.split(" ")[1];
    const address = req.headers.get("x-real-ip") || req.ip;
    const k = await keyOwner(key, address);

    if (!k) {
      return error("Unauthorized", 403);
    }

    userId = k.id;
    admin = k.admin;
  } else {
    const authRequest = auth.handleRequest(req.method, context);
    const session = await authRequest.validate();

    if (!session) {
      return error("Not logged in", 403);
    }

    userId = session.user.userId;
    admin = session.user.admin || false;
  }

  const { id, path } = params;
  const { method } = req;
  const query = new URL(req.url).searchParams;

  const server = await prisma.server.findUnique({
    where: {
      id,
    },
    select: {
      ownerId: true,
      ip: true,
      key: true,
      members: {
        where: {
          userId: userId,
        },
      },
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  let permissions = ["*", "owner"];
  if (server.ownerId !== userId && !admin) {
    if (server.members.length === 0) return error("Unauthorized", 403);

    const member = server.members[0];
    permissions = member.permissions;
  }

  try {
    const body =
      req.method !== "GET" &&
      req.body != null &&
      req.headers.get("Content-Type")?.includes("application/json")
        ? await req.json()
        : undefined;

    const res = await axios({
      method,
      url: `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
        server.ip
      }:8080/${path.join("/")}${query ? `?${query.toString()}` : ""}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${server.key}`,
        "Panel-User": userId,
        "Panel-User-Permissions": JSON.stringify(permissions),
      },
      data: body ? JSON.stringify(body) : undefined,
      timeout: 10000,
    });

    return new NextResponse(
      res.headers["content-type"]?.toString().includes("application/json")
        ? JSON.stringify(res.data)
        : res.data || "",
      {
        status: res.status,
        headers: {
          "Content-Type":
            res.headers["content-type"]?.toString() || "Application/Json",
          "Content-Disposition": res.headers["content-disposition"]?.toString(),
          "Content-Transfer-Encoding":
            res.headers["content-transfer-encoding"]?.toString(),
          "Content-Length": res.headers["content-length"]?.toString(),
        },
      }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify(
        err.response?.data || { error: "Could not reach the external server" }
      ),
      {
        status: err.response?.status || 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
