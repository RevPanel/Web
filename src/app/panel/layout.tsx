import BaseLayout from "@/components/panel/layout-base";

export default function ServersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
