"use client";

import {
  faAlignLeft,
  faBox,
  faDumpsterFire,
  faFile,
  faGears,
  faHome,
  faMagnifyingGlass,
  faTasks,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import SidebarTemplate, { accountSection } from "../sidebar-template";
import { useParams } from "next/navigation";

export default function ServerSidebar() {
  const { server } = useParams();

  return (
    <SidebarTemplate
      sections={[
        {
          title: "Server Settings",
          links: [
            {
              title: "Home",
              icon: faHome,
              href: `/panel/${server}/`,
              active: true,
            },
            {
              title: "Terminal",
              icon: faTerminal,
              href: `/panel/${server}/console`,
              active: false,
            },
            {
              title: "File Manager",
              icon: faFile,
              href: `/panel/${server}/files`,
              active: false,
            },
            {
              title: "Network",
              icon: faDumpsterFire,
              href: `/panel/${server}/network`,
              active: false,
            },
            {
              title: "Packages",
              icon: faBox,
              href: `/panel/${server}/packages`,
              active: false,
            },
            {
              title: "Task Manager",
              icon: faTasks,
              href: `/panel/${server}/tasks`,
              active: false,
            },
            {
              title: "Logs",
              icon: faAlignLeft,
              href: `/panel/${server}/logs`,
              active: false,
            },
            {
              title: "Settings",
              icon: faGears,
              href: `/panel/${server}/settings`,
              active: false,
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
