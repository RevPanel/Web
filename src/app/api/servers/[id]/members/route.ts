import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
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
    return error("Not logged in", 403);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: true,
      ownerId: true,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  return NextResponse.json(server.members);
}

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
    return error("Not logged in", 403);
  }

  const body = await req.json();
  if (!body.username) {
    return error("Missing username", 400);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      ownerId: true,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  if (server.members.some((user) => user.user.username === body.username)) {
    await prisma.serverMember.deleteMany({
      where: {
        serverId: params.id,
        user: {
          username: body.username,
        },
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    return error("User not found", 404);
  }

  await prisma.server.update({
    where: {
      id: params.id,
    },
    data: {
      members: {
        create: {
          user: {
            connect: {
              id: user.id,
            },
          },
          permissions: body.permissions,
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
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
    return error("Not logged in", 403);
  }

  const query = new URL(req.url).searchParams;
  const username = query.get("user");

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      ownerId: true,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  if (!username) {
    return error("Missing username", 400);
  }

  if (!server.members.some((user) => user.user.username === username)) {
    return error("User not found", 404);
  }

  await prisma.serverMember.deleteMany({
    where: {
      serverId: params.id,
      user: {
        username,
      },
    },
  });

  return NextResponse.json({ success: true });
}
