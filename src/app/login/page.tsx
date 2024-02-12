import { getUser } from "@/components/auth";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getUser();
  if (session) redirect("/");

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-10 text-center md:px-0">
      <h1 className="text-4xl font-bold">Login into your account</h1>
      <p className="text-tertiary">
        Insert your credentials and get back to your panel
      </p>
      <LoginForm />
    </div>
  );
}
