import { getUser } from "@/components/auth";
import { Button, LinkButton } from "@/components/button";
import Form from "@/components/form";
import FormInput from "@/components/input";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getUser();
  if (session) redirect("/");

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-10 text-center md:px-0">
      <h1 className="text-4xl font-bold">Register a new account</h1>
      <p className="text-tertiary">
        Create a new account now and start using our services
      </p>
      <Form
        className="mx-auto mt-4 flex w-full flex-col gap-2 md:w-1/2 lg:w-1/3 2xl:w-1/5"
        action="/api/auth/register"
      >
        <div className="flex w-full gap-2">
          <FormInput
            required
            name="name"
            id="name"
            placeholder="Name"
            className="!w-1/2 !min-w-[0] !p-4 !pl-6"
          />
          <FormInput
            required
            name="username"
            id="username"
            placeholder="Username"
            className="!w-1/2 !min-w-[0] !p-4 !pl-6"
          />
        </div>
        <FormInput
          required
          name="email"
          id="email"
          placeholder="Email"
          type="email"
          className="w-full !p-4 !pl-6"
        />
        <FormInput
          required
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          className="w-full !p-4 !pl-6"
        />
        <FormInput
          required
          name="confirm_password"
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          className="w-full !p-4 !pl-6"
        />
        <div className="flex w-full justify-between">
          <Link href="/login" className="text-tertiary">
            Already have an account? <span className="text-primary">Login</span>
          </Link>
        </div>
        <Button role="primary" type="submit" className="w-full">
          Register
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
      </Form>
    </div>
  );
}
