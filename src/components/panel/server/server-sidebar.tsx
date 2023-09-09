"use client";

import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SidebarTemplate, { accountSection } from "../sidebar-template";

export default function ServerSidebar() {
  return (
    <SidebarTemplate
      sections={[
        {
          title: "Services",
          links: [
            {
              title: "Home",
              icon: faHome,
              href: "/panel",
              active: true,
            },
            {
              title: "Search",
              icon: faMagnifyingGlass,
              href: "/panel/#",
              active: false,
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
