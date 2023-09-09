import BaseLayout from "@/components/panel/layout-base";
import ServerSidebar from "@/components/panel/server/server-sidebar";

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout sidebar={<ServerSidebar />}>{children}</BaseLayout>;
}
