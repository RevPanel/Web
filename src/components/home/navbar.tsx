import Link from "next/link";
import { SignedIn, SignedOut } from "../auth";
import { LinkButton } from "../button";
import Logo from "../logo";

export default function Navbar() {
  return (
    <div className="m-4 mx-auto flex w-3/4 items-center justify-between p-4 md:m-0 md:mx-auto">
      <Logo />
      <div className="hidden items-center gap-4 md:flex">
        <Link className="text-tertiary" href="/#promises">
          Promises
        </Link>
        <Link className="text-tertiary" href="/#pricing">
          Pricing
        </Link>
        <Link className="text-tertiary" href="https://discord.gg/nzVNM2uDaT">
          Discord
        </Link>
        <Link className="text-tertiary" href="https://docs.revpanel.io">
          Docs
        </Link>
      </div>
      <SignedIn>
        <LinkButton href="/panel" role="secondary" className="uppercase">
          Panel
        </LinkButton>
      </SignedIn>
      <SignedOut>
        <LinkButton href="/login" role="secondary" className="uppercase">
          Login
        </LinkButton>
      </SignedOut>
    </div>
  );
}
