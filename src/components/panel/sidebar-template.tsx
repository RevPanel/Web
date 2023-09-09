import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignLeft,
  faDoorOpen,
  faKey,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type RouteSection = {
  title: string;
  links: RouteLink[];
};

type RouteLink = {
  title: string;
  href: string;
  icon: IconProp;
  active: boolean;
};

export const accountSection: RouteSection = {
  title: "Account",
  links: [
    {
      title: "Account",
      icon: faUserCircle,
      href: "/account",
      active: false,
    },
    {
      title: "API Keys",
      icon: faKey,
      href: "/account/keys",
      active: false,
    },
    {
      title: "User Logs",
      icon: faAlignLeft,
      href: "/account/logs",
      active: false,
    },
    {
      title: "Logout",
      icon: faDoorOpen,
      href: "/logout",
      active: false,
    },
  ],
};

export default function SidebarTemplate({
  sections,
}: {
  sections: RouteSection[];
}) {
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
                    (link.active ? "font-bold" : "hover:font-semibold")
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="mr-2"
                    width={25}
                  />{" "}
                  {link.title}
                  {link.active && (
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
