import QuickActions from "@/components/panel/server/service/actions";
import AuditLogs from "@/components/panel/server/service/logs";
import OpenPorts from "@/components/panel/server/service/ports";
import Stats from "@/components/panel/server/service/stats";
import TrafficUsage from "@/components/panel/server/service/traffic";

export default function ServiceDashboard() {
  return (
    <div className="flex w-full flex-col gap-8 lg:gap-4">
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex h-full flex-col gap-8 lg:w-1/2 lg:gap-4">
          <QuickActions />
          <Stats />
        </div>
        <OpenPorts />
      </div>
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <AuditLogs />
        <TrafficUsage />
      </div>
    </div>
  );
}
