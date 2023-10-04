"use client";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignLeft,
  faDoorOpen,
  faKey,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RouteSection = {
  title: string;
  links: RouteLink[];
};

type RouteLink = {
  title: string;
  href: string;
  icon: IconProp;
};

export const accountSection: RouteSection = {
  title: "Account",
  links: [
    {
      title: "Account",
      icon: faUserCircle,
      href: "/panel/account",
    },
    {
      title: "API Keys",
      icon: faKey,
      href: "/panel/account/keys",
    },
    {
      title: "User Logs",
      icon: faAlignLeft,
      href: "/panel/account/logs",
    },
    {
      title: "Logout",
      icon: faDoorOpen,
      href: "/logout",
    },
  ],
};

function comparePaths(current: string, expected: string) {
  const currentSplit = current.split("/");
  const expectedSplit = expected.split("/");

  if (currentSplit.length === 3) {
    return expectedSplit.pop() === "";
  }

  return currentSplit.pop() === expectedSplit.pop();
}

export default function SidebarTemplate({
  sections,
}: {
  sections: RouteSection[];
}) {
  const path = usePathname();

  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-extrabold">VPS Panel</h1>
      </div>
      {sections.map((section) => (
        <div key={section.title} className="mx-4">
          <ul className="flex flex-col gap-2">
            {section.links.map((link) => (
              <li
                key={link.title}
                className={
                  "rounded-lg p-2 pl-4 hover:bg-background/60 " +
                  (comparePaths(path, link.href) ? "bg-background/60" : "")
                }
              >
                <Link
                  href={link.href}
                  className={
                    "flex w-full items-center gap-2 text-lg text-white " +
                    (comparePaths(path, link.href) ? "font-bold" : "")
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
