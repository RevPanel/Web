"use client";

import {
  faDumpsterFire,
  faFile,
  faHome,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import SidebarTemplate, { accountSection } from "../../sidebar-template";

export default function ServiceSidebar() {
  const { server, service } = useParams();

  const baseUrl = `/panel/${server}/${service}`;

  return (
    <SidebarTemplate
      sections={[
        {
          title: "Server Settings",
          links: [
            {
              title: "Dashboard",
              icon: faHome,
              href: `${baseUrl}`,
            },
            {
              title: "Console",
              icon: faTerminal,
              href: `${baseUrl}/console`,
              permission: "service.terminal"
            },
            {
              title: "File Manager",
              icon: faFile,
              href: `${baseUrl}/files`,
              permission: "service.files"
            },
            {
              title: "Port Manager",
              icon: faDumpsterFire,
              href: `${baseUrl}/ports`,
              permission: "service.edit"
            },
          ],
        },
        accountSection,
      ]}
    />
  );
}
