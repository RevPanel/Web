"use client";

import { faHome } from "@fortawesome/free-solid-svg-icons";
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
          ],
        },
        accountSection,
      ]}
    />
  );
}
