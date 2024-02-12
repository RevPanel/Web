import { getUser } from "@/components/auth";
import { lucia } from "@/lib/lucia";
import { error } from "@/utils/responses";
import { NextResponse, type NextRequest } from "next/server";
import UAParser from "ua-parser-js";

export const GET = async (req: NextRequest) => {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const sessions = await lucia.getUserSessions(session.user.id);
  const mapped = sessions.map((s) => {
    const ua = new UAParser(s.user_agent);
    const mapped = {
      sessionId: s.id,
      address: s.address,
      name: ua.getBrowser().name,
    };

    if (s.id === session.session.id) {
      return {
        current: true,
        ...mapped,
      };
    }

    return mapped;
  });

  return NextResponse.json(mapped);
};

export async function DELETE(req: NextRequest) {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const query = new URL(req.nextUrl).searchParams;
  const id = query.get("id");

  if (!id) {
    return error("Missing session id", 400);
  }

  const sessions = await lucia.getUserSessions(session.user.id);
  const found = sessions.find((s) => s.id === id);

  if (!found) {
    return error("Session not found", 404);
  }

  await lucia.invalidateSession(id);

  return NextResponse.json({
    success: true,
  });
}
