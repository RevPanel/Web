import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  {
    params: { token },
  }: {
    params: {
      token: string;
    };
  }
) {
  const server = await prisma.server.findFirst({
    where: {
      key: token,
    },
  });

  if (!server) {
    return error("Invalid token", 404);
  }

  const { domain } = await req.json();
  if (!domain) {
    return error("Missing domain", 400);
  }

  await prisma.server.update({
    where: {
      id: server.id,
    },
    data: {
      ip: domain
        .replace("https://", "")
        .replace("http://", "")
        .replace("/", ""),
    },
  });

  let env = "";
  env += "DATABASE_PASSWORD='" + randomUUID() + "'";
  env += "\n";
  env += "API_TOKEN='" + token + "'";
  env += "\n";
  env += "SERVER_ID='" + server.id + "'";

  return new NextResponse(env, {
    headers: {
      "content-type": "text/plain",
    },
  });
}
