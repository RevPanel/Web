import { getAuthUrl } from "@/lib/lucia";
import { generateState } from "arctic";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      method: string;
    };
  }
) => {
  const state = generateState();
  const url = await getAuthUrl(state, params.method);
  if (!url) {
    return new Response(null, {
      status: 400,
    });
  }

  cookies().set(`${params.method.toLowerCase()}_oauth_state`, state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
