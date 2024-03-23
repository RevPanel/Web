import octokit from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const script = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "RevPanel",
      repo: "Daemon",
      path: "scripts/install.sh",
    }
  );

  const { content } = script.data as any;
  const cleanContent = atob(content);

  return new NextResponse(cleanContent, {
    headers: {
      "content-type": "text/plain",
    },
  });
}
