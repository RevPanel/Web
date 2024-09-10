import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const script = await fetch(
    "https://raw.githubusercontent.com/RevPanel/Scripts/main/install.sh"
  );

  const content = await script.text();

  return new NextResponse(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
