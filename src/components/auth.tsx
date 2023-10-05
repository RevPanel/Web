import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import Link from "next/link";
import { cache } from "react";
import UserIcon from "./icons/User";

export const getSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export async function SignedIn({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) return null;

  return <>{children}</>;
}

export async function SignedOut({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (session) return null;

  return <>{children}</>;
}

export function UserButton() {
  return (
    <Link
      href="/account"
      className="flex h-14 w-14 items-center justify-center rounded-xl bg-background-secondary p-4 text-3xl"
    >
      <UserIcon />
    </Link>
  );
}
