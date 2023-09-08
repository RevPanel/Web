import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";
import Logo from "../logo";

export default function Navbar() {
  return (
    <div className="m-4 mx-auto flex w-3/4 items-center justify-between md:m-0 md:mx-auto">
      <Logo />
      <div className="hidden items-center gap-4 md:flex">
        <Link className="text-tertiary" href="#">
          Enterprise
        </Link>
        <Link className="text-tertiary" href="#">
          Plans
        </Link>
        <Link className="text-tertiary" href="#">
          Discord
        </Link>
        <Link className="text-tertiary" href="#">
          About Us
        </Link>
      </div>
      <LinkButton
        href="/app"
        role="secondary"
        className="hidden uppercase md:flex"
      >
        Client Portal
      </LinkButton>
      <FontAwesomeIcon icon={faBars} className="text-2xl md:hidden" />
    </div>
  );
}
