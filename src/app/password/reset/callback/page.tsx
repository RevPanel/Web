import { Button } from "@/components/button";
import Form from "@/components/form";
import FormInput from "@/components/input";
import { notFound } from "next/navigation";

export default async function Page(props: {
  searchParams: {
    token?: string;
  };
}) {
  if (!props.searchParams.token) {
    return notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Reset your password</h1>
      <p className="text-tertiary">Insert your new password and confirm</p>
      <Form
        className="mx-auto mt-4 flex flex-col gap-2 md:w-1/2 lg:w-1/3 xl:w-1/5"
        action="/api/auth/password/reset/callback"
        redirect="/"
      >
        <FormInput
          type="text"
          name="resetToken"
          id="resetToken"
          hidden
          value={props.searchParams.token}
          readOnly
          className="hidden"
        />
        <FormInput
          required
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="New password"
          className="w-full !p-4 !pl-6 !min-w-0"
        />
        <Button role="primary" type="submit" className="w-full">
          Change password
        </Button>
      </Form>
    </div>
  );
}
