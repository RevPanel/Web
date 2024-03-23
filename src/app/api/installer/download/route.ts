import octokit from "@/lib/github";
import { error } from "@/utils/responses";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const release = await octokit.request(
      "GET /repos/{owner}/{repo}/releases/latest",
      {
        owner: "RevPanel",
        repo: "Web",
      }
    );

    const archive = release?.data.assets.find(
      (asset) => asset.name === "panel.tar.gz"
    );

    if (!archive) {
      return error("Failed to find the latest release", 500);
    }

    const asset = await octokit.request(
      "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
      {
        owner: "RevPanel",
        repo: "Web",
        asset_id: archive.id,
        headers: {
          accept: "application/octet-stream",
        },
      }
    );

    // Due to accept: "application/octet-stream", the response is an ArrayBuffer
    return new Response(asset.data as any, {
      headers: {
        "Content-Type": "application/gzip",
        "Content-Disposition": `attachment; filename=panel.tar.gz`,
      },
    });
  } catch (e) {
    console.log(e);
    return error("Failed to find the latest release", 500);
  }
}
