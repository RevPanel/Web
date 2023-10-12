import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";
import axios from "axios";
import * as context from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

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

  await auth.updateUserAttributes(session.user.userId, {
    avatarUrl: url,
  });

  return NextResponse.json({
    url,
  });
}
