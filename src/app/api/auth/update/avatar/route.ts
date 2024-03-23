import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return error("No file provided", 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const formData = new FormData();

  formData.append(
    "files",
    new Blob([buffer], {
      type: file.type,
    }),
    file.name
  );

  const { data: imageData } = await axios.post(
    `${process.env.NEXT_PUBLIC_IMAGECDN_URL}upload`,
    formData,
    {
      headers: {
        Authorization: process.env.IMAGECDN_SECRET,
      },
    }
  );

  const image = imageData.images[0];
  const url = `${process.env.NEXT_PUBLIC_IMAGECDN_URL}${image.id}`;

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      avatarUrl: url,
    },
  });

  return NextResponse.json({
    url,
  });
}
