import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";

export default function Footer() {
  return (
    <footer className="mx-auto flex flex-col gap-8 border-t border-t-gray-900 py-4 md:w-4/5">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col gap-2">
          <p className="text-xl">RevPanel</p>
          <div className="flex gap-2">
            <LinkButton
              aria-label="Discord"
              role="secondary"
              href="https://discord.gg/nzVNM2uDaT"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </LinkButton>
            <LinkButton
              aria-label="GitHub"
              role="secondary"
              href="https://github.com/RevPanel"
            >
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
            <Link className="text-white" href="/tos">
              Terms of Service
            </Link>
            <Link className="text-white" href="/privacy">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-tertiary">Support</h2>
            <Link className="text-white" href="#">
              Support Center
            </Link>
            <Link className="text-white" href="https://status.revpanel.io">
              System Status
            </Link>
            <Link className="text-white" href="https://docs.revpanel.io">
              Documentation
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between border-t border-t-gray-900 pt-4 text-center text-tertiary md:flex-row">
        <p>Copyright &copy; RevPanel - 2023</p>
        <Link className="text-tertiary" href="mailto:contact@revpanel.io">
          contact@revpanel.io
        </Link>
      </div>
    </footer>
  );
}
