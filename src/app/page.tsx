import { Button, LinkButton } from "@/components/button";
import Logo from "@/components/logo";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col w-full p-6 gap-10">
      <Logo />
      <div className="mx-auto text-center flex flex-col items-center">
        <h1 className="font-extrabold text-5xl">
          The panel <span className="text-gradient">everyone</span> can use
        </h1>
        <h2 className="text-[#A5A5A5]">
          Do not pay for a System Administrator when you can do it yourself with
          our panel
        </h2>
        <SignedIn>
          <LinkButton href="/panel" className="mt-4 font-bold">
            Login into the dashboard
          </LinkButton>
        </SignedIn>
        <SignedOut>
          <SignInButton afterSignInUrl="/panel" afterSignUpUrl="/panel">
            <Button className="mt-4 font-bold">Install with one click</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  );
}
