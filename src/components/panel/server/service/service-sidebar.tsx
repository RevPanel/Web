"use client";

import {
  faDumpsterFire,
  faFile,
  faHome,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import SidebarTemplate, { accountSection } from "../../sidebar-template";

export default function ServiceSidebar() {
  return (
    <SidebarTemplate
      sections={[
        {
          title: "Server Settings",
          links: [
            {
              title: "Dashboard",
              icon: faHome,
              href: "/panel",
              active: true,
            },
            {
              title: "Console",
              icon: faTerminal,
              href: "/panel/console",
              active: false,
            },
            {
              title: "File Manager",
              icon: faFile,
              href: "/panel/files",
              active: false,
            },
            {
              title: "Port Manager",
              icon: faDumpsterFire,
              href: "/panel/ports",
              active: false,
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
