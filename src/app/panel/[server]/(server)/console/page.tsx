import { SSHTerminal } from "@/components/panel/server/terminal";

export default function ServerConsole({
  params: { server },
}: {
  params: { server: string };
}) {
  return <SSHTerminal server={server} />;
}
