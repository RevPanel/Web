import octokit from "@/lib/github";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  {
    params: { token },
  }: {
    params: {
      token: string;
    };
  }
) {
  const script = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "RevPanel",
      repo: "Daemon",
      path: "install.sh",
    }
  );

  const server = await prisma.server.findFirst({
    where: {
      key: token,
    },
  });

  const { content } = script.data as any;
  const cleanContent = atob(content)
    .replace("${TOKEN}", token)
    .replace("${DOMAIN}", server?.ip || "127.0.0.1");

  return new NextResponse(cleanContent, {
    headers: {
      "content-type": "text/plain",
    },
  });
}
