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
      href: "/account",
    },
    {
      title: "API Keys",
      icon: faKey,
      href: "/account/keys",
    },
    {
      title: "User Logs",
      icon: faAlignLeft,
      href: "/account/logs",
    },
    {
      title: "Logout",
      icon: faDoorOpen,
      href: "/logout",
    },
  ],
};

function comparePaths(current: string, expected: string) {
  // compare the last segment of the path
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
      <div className="border-b border-b-tertiary p-6">
        <h1 className="text-4xl font-extrabold">VPS Panel</h1>
      </div>
      {sections.map((section) => (
        <div key={section.title} className="ml-8">
          <p className="text-xl uppercase">{section.title}</p>
          <ul className="flex flex-col gap-3">
            {section.links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className={
                    "flex w-full items-center gap-2 text-xl text-white " +
                    (comparePaths(path, link.href)
                      ? "font-bold"
                      : "hover:font-semibold")
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="mr-2"
                    width={25}
                  />{" "}
                  {link.title}
                  {comparePaths(path, link.href) && (
                    <span className="ml-auto block h-8 w-1 rounded-xl bg-white"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
