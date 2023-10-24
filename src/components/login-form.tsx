"use client";

import Link from "next/link";
import { Button, LinkButton } from "./button";
import FormInput from "./input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);

  return (
    <form
      className="mx-auto mt-4 flex w-full flex-col gap-2 md:w-1/2 lg:w-1/3 2xl:w-1/5"
      action="/api/auth/login"
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          return router.refresh();
        }

        const json = await response.json();
        if (json.error) {
          if (json.is2fa) {
            setSuccess("Please enter your 2FA code");
            setTwoFactor(true);
            return;
          }

          return setError(json.error);
        }

        if (json.message) {
          setSuccess(json.message);
        }

        router.push("/panel");
      }}
    >
      {error && <p className="text-left text-red-500">{error}</p>}
      {success && <p className="text-left text-primary">{success}</p>}

      <FormInput
        required
        name="username"
        id="username"
        placeholder="Username"
        className={"w-full !p-4 !pl-6 " + (twoFactor ? "hidden" : "")}
        hidden={twoFactor}
      />
      <FormInput
        required
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        className={"w-full !p-4 !pl-6 " + (twoFactor ? "hidden" : "")}
        hidden={twoFactor}
      />
      {twoFactor && (
        <FormInput
          name="code"
          id="code"
          type="text"
          placeholder="Two Factor Code"
          className={"w-full !p-4 !pl-6"}
        />
      )}
      <div className="flex w-full justify-between">
        <Link href="/register" className="text-tertiary">
          Register
        </Link>
        <Link href="/password/reset" className="text-tertiary">
          Forgot Password?
        </Link>
      </div>
      <Button role="primary" type="submit" className="w-full">
        Login
      </Button>
      <div className="flex items-center gap-2">
        <span className="h-px w-full bg-tertiary"></span>
        <span className="w-full text-tertiary">Or login with</span>
        <span className="h-px w-full bg-tertiary"></span>
      </div>
      <div className="flex gap-2">
        <LinkButton
          href="/api/auth/login/discord"
          role="secondary"
          className="w-full flex-1"
        >
          Discord
        </LinkButton>
        <LinkButton
          href="/api/auth/login/github"
          role="secondary"
          className="w-full flex-1"
        >
          GitHub
        </LinkButton>
      </div>
      <LinkButton
        href="/api/auth/login/google"
        role="secondary"
        className="w-full flex-1"
      >
        Google
      </LinkButton>
    </form>
  );
}
