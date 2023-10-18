import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import UAParser from "ua-parser-js";

export const GET = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const sessions = await auth.getAllUserSessions(session.user.userId);
  const mapped = sessions.map((s) => {
    const ua = new UAParser(s.user_agent);
    const mapped = {
      sessionId: s.sessionId,
      address: s.address,
      name: ua.getBrowser().name,
      state: s.state,
    };

    if (s.sessionId === session.sessionId) {
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
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const query = new URL(req.nextUrl).searchParams;
  const id = query.get("id");

  if (!id) {
    return error("Missing session id", 400);
  }

  const sessions = await auth.getAllUserSessions(session.user.userId);
  const found = sessions.find((s) => s.sessionId === id);

  if (!found) {
    return error("Session not found", 404);
  }

  await auth.invalidateSession(id);

  return NextResponse.json({
    success: true,
  });
}
