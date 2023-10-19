import octokit from "@/lib/github";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const script = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "RevPanel",
      repo: "Daemon",
      path: "docker-compose.yml",
    }
  );

  const { content } = script.data as any;

  return new NextResponse(atob(content), {
    headers: {
      "content-type": "text/plain",
    },
  });
}
