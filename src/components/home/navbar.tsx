"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LinkButton } from "../button";
import Logo from "../logo";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div>
      <div
        ref={ref}
        className="fixed z-10 flex h-screen min-h-screen min-w-[20rem] flex-col gap-2 bg-background-secondary p-4 md:hidden"
        style={{
          left: open ? "0" : "-20rem",
          transition: "left 0.5s ease-in-out",
        }}
      >
        <Link
          href="/#promises"
          className="flex w-full items-center gap-2 rounded-lg p-2 pl-4 text-lg text-white"
        >
          <p>Promises</p>
        </Link>
        <Link
          href="/#pricing"
          className="flex w-full items-center gap-2 rounded-lg p-2 pl-4 text-lg text-white"
        >
          <p>Pricing</p>
        </Link>
        <Link
          href="https://discord.gg/nzVNM2uDaT"
          className="flex w-full items-center gap-2 rounded-lg p-2 pl-4 text-lg text-white"
        >
          <p>Discord</p>
        </Link>
        <Link
          href="https://docs.revpanel.io"
          className="flex w-full items-center gap-2 rounded-lg p-2 pl-4 text-lg text-white"
        >
          <p>Docs</p>
        </Link>
        {loggedIn ? (
          <LinkButton href="/panel" role="primary" className="uppercase">
            Panel
          </LinkButton>
        ) : (
          <LinkButton href="/login" role="primary" className="uppercase">
            Login
          </LinkButton>
        )}
      </div>
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
        {loggedIn ? (
          <LinkButton
            href="/panel"
            role="secondary"
            className="hidden uppercase md:flex"
          >
            Panel
          </LinkButton>
        ) : (
          <LinkButton
            href="/login"
            role="secondary"
            className="hidden uppercase md:flex"
          >
            Login
          </LinkButton>
        )}

        <button
          type="button"
          onClick={() => setOpen((state) => !state)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
