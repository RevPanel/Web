import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";

export default function Footer() {
  return (
    <footer className="mx-auto flex flex-col gap-8 border-t border-t-gray-900 py-4 md:w-4/5">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">RevPanel</h1>
          <div className="flex gap-2">
            <LinkButton aria-label="Discord" role="secondary" href="/discord">
              <FontAwesomeIcon icon={faDiscord} />
            </LinkButton>
            <LinkButton aria-label="GitHub" role="secondary" href="/github">
              <FontAwesomeIcon icon={faGithub} />
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">About</h2>
            <Link className="text-white" href="#">
              About Us
            </Link>
            <Link className="text-white" href="#">
              Terms of Service
            </Link>
            <Link className="text-white" href="#">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">Support</h2>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Support Center
            </Link>
            <Link className="text-white" href="#">
              FAQ
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
      <div className="flex w-full flex-col justify-between border-t border-t-gray-900 pt-4 text-tertiary md:flex-row">
        <p>Copyright &copy; RevPanel - 2023</p>
        <Link className="text-tertiary" href="mailto:contact@revpanel.io">
          contact@revpanel.io
        </Link>
      </div>
    </footer>
  );
}
