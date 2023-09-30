import { DockerTerminal } from "@/components/panel/server/terminal";

export default function ServerConsole(props: {
  params: {
    server: string;
    service: string;
  };
}) {
  return (
    <DockerTerminal id={props.params.service} serverId={props.params.server} />
  );
}
