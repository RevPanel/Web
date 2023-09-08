import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";
import Logo from "../logo";

export default function Navbar() {
  return (
    <div className="w-3/4 mx-auto flex justify-between items-center m-4 md:m-0 md:mx-auto">
      <Logo />
      <div className="hidden md:flex gap-4 items-center">
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
        className="uppercase hidden md:flex"
      >
        Client Portal
      </LinkButton>
      <FontAwesomeIcon icon={faBars} className="md:hidden text-2xl" />
    </div>
  );
}
