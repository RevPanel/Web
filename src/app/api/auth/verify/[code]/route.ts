import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";

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
  const session = await getUser();

  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const { code } = params;
  if (user?.emailToken === code) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
        emailToken: null,
      },
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
