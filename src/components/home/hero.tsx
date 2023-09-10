import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, LinkButton } from "../button";

export default function Hero() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center md:w-1/2 xl:w-1/3">
      <Button className="text-gradient font-medium" role="secondary">
        THE BEST PANEL ON THE MARKET
      </Button>
      <h1 className="text-4xl font-medium">
        The panel <span className="text-gradient">everyone</span> can use
      </h1>
      <p className="text-tertiary">
        Do not pay for a System Administrator when you can do it yourself with
        our panel
      </p>
      <SignedIn>
        <LinkButton
          href="/panel"
          className="flex items-center gap-2 !p-4 !px-8 font-medium"
          role="primary"
        >
          <FontAwesomeIcon icon={faCircleUser} />
          DASHBOARD
        </LinkButton>
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/panel" afterSignUpUrl="/panel">
          <Button
            className="flex items-center gap-2 !p-4 !px-8 font-medium"
            role="primary"
          >
            <FontAwesomeIcon icon={faCircleUser} />
            GET STARTED
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
