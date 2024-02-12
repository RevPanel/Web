import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/components/auth";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

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
    include: {
      ports: true,
    },
  });

  return NextResponse.json(images, {
    headers: {
      "cache-control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getUser();

  if (!session || !session.user.admin) {
    return error("Unauthorized", 401);
  }

  const body = await req.formData();

  const id = body.get("id") as string;
  const dockerImage = body.get("dockerImage") as string;
  const name = body.get("name") as string;
  const description = body.get("description") as string;
  const version = body.get("version") as string;
  const homepage = body.get("homepage") as string;
  const mountPath = body.get("mountPath") as string | null;
  const ports = body.get("ports") as string | null;
  const environments = body.get("environments") as string | null;

  if (!id || !dockerImage || !name || !description || !version || !homepage) {
    return error("Missing required fields", 400);
  }

  await prisma.imageConfiguration.create({
    data: {
      id,
      dockerImage,
      name,
      description,
      version,
      homepage,
      mountPath,
      ports: ports
        ? {
            createMany: {
              data: ports.split(",").map((port) => {
                const [name, portNumber] = port.split(":");

                return {
                  name,
                  containerPort: Number(portNumber),
                };
              }),
            },
          }
        : undefined,
      environments: environments?.split(","),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Image created",
  });
}
