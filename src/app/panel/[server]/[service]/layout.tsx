import BaseLayout from "@/components/panel/layout-base";
import ServiceSidebar from "@/components/panel/server/service/service-sidebar";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout sidebar={<ServiceSidebar />}>{children}</BaseLayout>;
}
