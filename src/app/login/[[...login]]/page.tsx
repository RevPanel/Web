import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
