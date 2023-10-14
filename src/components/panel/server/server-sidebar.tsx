"use client";

import {
  faBox,
  faDumpsterFire,
  faFile,
  faGears,
  faHome,
  faTasks,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import SidebarTemplate, { accountSection } from "../sidebar-template";

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
            },
            {
              title: "Terminal",
              icon: faTerminal,
              href: `/panel/${server}/console`,
            },
            {
              title: "File Manager",
              icon: faFile,
              href: `/panel/${server}/files`,
            },
            {
              title: "Packages",
              icon: faBox,
              href: `/panel/${server}/packages`,
            },
            {
              title: "Task Manager",
              icon: faTasks,
              href: `/panel/${server}/tasks`,
            },
            {
              title: "Settings",
              icon: faGears,
              href: `/panel/${server}/settings`,
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
