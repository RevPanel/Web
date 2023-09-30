"use client";

import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SidebarTemplate, { accountSection } from "./sidebar-template";

export default function PanelSidebar() {
  return (
    <SidebarTemplate
      sections={[
        {
          title: "Servers",
          links: [
            {
              title: "Home",
              icon: faHome,
              href: "/panel",
            },
            {
              title: "Search",
              icon: faMagnifyingGlass,
              href: "/panel/#",
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
