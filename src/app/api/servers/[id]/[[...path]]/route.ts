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
  let userId;

  if (req.headers.has("Authorization")) {
    const key = req.headers.get("Authorization")?.split(" ")[1];

    const k = await prisma.apiKey.findUnique({
      where: {
        key,
      },
    });

    if (!k) {
      return error("Unauthorized", 403);
    }

    userId = k.ownerId;
  } else {
    const authRequest = auth.handleRequest(req.method, context);
    const session = await authRequest.validate();

    if (!session) {
      return error("Not logged in", 403);
    }

    userId = session.user.userId;
  }

  const { id, path } = params;
  const { method } = req;
  const query = new URL(req.url).searchParams;

  const server = await prisma.server.findUnique({
    where: {
      id,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== userId) {
    return error("Unauthorized", 403);
  }

  try {
    const body =
      req.method !== "GET" && req.body !== null ? await req.json() : undefined;

    const res = await axios({
      method,
      url: `http://${server.ip}:8080/${path.join("/")}${
        query ? `?${query.toString()}` : ""
      }`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${server.key}`,
        "Panel-User": userId,
      },
      data: body ? JSON.stringify(body) : undefined,
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
