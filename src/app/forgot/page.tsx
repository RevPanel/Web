import { Button, LinkButton } from "@/components/button";
import Form from "@/components/form";
import FormInput from "@/components/input";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Reset your password</h1>
      <p className="text-tertiary">
        Don't remember your password? Change it easily
      </p>
      <Form
        className="mx-auto mt-4 flex flex-col gap-2 md:w-1/2 lg:w-1/3 xl:w-1/5"
        action="/api/auth/login"
      >
        <FormInput
          required
          name="username"
          id="username"
          placeholder="Email"
          className="w-full !p-4 !pl-6"
        />
        <Button role="primary" type="submit" className="w-full">
          Send email
        </Button>
      </Form>
    </div>
  );
}
