import { getSession } from "@/components/auth";
import QuickActions from "@/components/panel/server/service/actions";
import AuditLogs from "@/components/panel/server/service/logs";
import OpenPorts from "@/components/panel/server/service/ports";
import Stats from "@/components/panel/server/service/stats";
import TrafficUsage from "@/components/panel/server/service/traffic";

export default async function ServiceDashboard(props: {
  params: {
    server: string;
    service: string;
  };
}) {
  const session = await getSession();

  return (
    <div className="flex w-full flex-col gap-8 lg:gap-4">
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex h-full flex-col gap-8 lg:w-1/2 lg:gap-4">
          <QuickActions
            serverId={props.params.server}
            id={props.params.service}
            session={session}
          />
          <Stats serverId={props.params.server} id={props.params.service} />
        </div>
        <OpenPorts serverId={props.params.server} id={props.params.service} />
      </div>
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <AuditLogs serverId={props.params.server} id={props.params.service} />
        <TrafficUsage />
      </div>
    </div>
  );
}
