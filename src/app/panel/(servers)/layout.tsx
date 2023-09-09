import BaseLayout from "@/components/panel/layout-base";
import PanelSidebar from "@/components/panel/panel-sidebar";

export default function ServersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout sidebar={<PanelSidebar />}>{children}</BaseLayout>;
}
