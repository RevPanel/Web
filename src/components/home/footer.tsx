import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";

export default function Footer() {
  return (
    <footer className="md:w-3/4 mx-auto flex flex-col gap-8 border-t border-t-gray-900 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">VPS Panel</h1>
          <div className="flex gap-2">
            <LinkButton role="secondary" href="/discord">
              <FontAwesomeIcon icon={faDiscord} />
            </LinkButton>
            <LinkButton role="secondary" href="/github">
              <FontAwesomeIcon icon={faGithub} />
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full text-tertiary flex flex-col md:flex-row justify-between border-t border-t-gray-900 pt-4">
        <p>Copyright &copy; VPS Panel - 2023</p>
        <Link className="text-tertiary" href="mailto:contact@vpspanel.com">
          contact@vpspanel.com
        </Link>
      </div>
    </footer>
  );
}
