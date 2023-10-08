import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const image = await prisma.imageConfiguration.findUnique({
    where: {
      id: params.id,
    },
    include: {
      ports: true,
    },
  });

  return new NextResponse(JSON.stringify(image), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
