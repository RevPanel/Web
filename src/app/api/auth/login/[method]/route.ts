import { discordAuth, getAuthUrl } from "@/lib/lucia";
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
  const authUrl = await getAuthUrl(params.method);
  if (!authUrl) {
    return new Response(null, {
      status: 400,
    });
  }

  const [url, state] = authUrl;

  cookies().set(`${params.method.toLowerCase()}_oauth_state`, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
