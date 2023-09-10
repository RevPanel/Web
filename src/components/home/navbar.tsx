import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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
        <Link className="text-tertiary" href="#">
          Pricing
        </Link>
        <Link className="text-tertiary" href="#">
          Discord
        </Link>
        <Link className="text-tertiary" href="#">
          Support
        </Link>
      </div>
      <SignedIn>
        <LinkButton
          href="/panel"
          role="secondary"
          className="hidden uppercase md:flex"
        >
          Panel
        </LinkButton>
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/panel" afterSignUpUrl="/panel">
          <LinkButton
            href="/panel"
            role="secondary"
            className="hidden uppercase md:flex"
          >
            Login
          </LinkButton>
        </SignInButton>
      </SignedOut>
      <button className="md:hidden">
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
    </div>
  );
}
