import { auth } from "@/lib/lucia";
import * as context from "next/headers";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      code: string;
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  const { code } = params;
  if (session.user.emailToken === code) {
    await auth.updateUserAttributes(session.user.userId, {
      emailVerified: true,
      emailToken: null,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  return new Response(null, {
    status: 400,
  });
}
