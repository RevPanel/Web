import octokit from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const daemon = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: "RevPanel",
      repo: "Daemon",
    }
  );

  const { tag_name, body, name } = daemon.data;

  return NextResponse.json({
    title: name,
    version: tag_name,
    description: body,
  });
}
