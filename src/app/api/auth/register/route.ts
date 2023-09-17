import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        error: "Passwords do not match",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: {
        email,
        username: username.toLowerCase(),
        name,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Username already taken",
      },
      {
        status: 400,
      }
    );
  }
};
