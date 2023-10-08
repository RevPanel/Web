import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = new URL(req.nextUrl).searchParams;
  const filter = query.get("q");
  const id = query.get("id");

  const images = await prisma.imageConfiguration.findMany({
    where: {
      name: filter
        ? {
            contains: filter,
            mode: "insensitive",
          }
        : undefined,
      id: id || undefined,
    },
    orderBy: {
      name: "asc",
    },
    take: 10,
    select: {
      name: true,
      id: true,
    },
  });

  return new NextResponse(JSON.stringify(images), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
