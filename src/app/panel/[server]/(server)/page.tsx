"use client";

import { LinkButton } from "@/components/button";
import ServerContainer from "@/components/panel/server";
import { useFetcher } from "@/hooks/fetcher";
import useServer from "@/hooks/server";
import { Describable, SystemStats } from "@/types/service";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBarsProgress,
  faHardDrive,
  faMemory,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

function ServerChart({
  total,
  used,
  unit,
  label,
  showPercent = true,
  icon,
}: {
  total: number;
  used: number;
  unit: string;
  label: string;
  icon: IconProp;
  showPercent?: boolean;
}) {
  const percent = useMemo(() => {
    const p = Math.min(Math.round((used / total) * 100), 100);
    return Number.isNaN(p) ? 0 : p;
  }, [used, total]);

  return (
    <div className="card flex w-80 flex-col gap-2 p-2">
      <div className="m-4 flex gap-3">
        <div
          className="daisy-radial-progress min-h-[80px] min-w-[80px] bg-background text-secondary"
          style={
            {
              "--value": percent,
            } as any
          }
        >
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>

        <div>
          <h3 className="text-xl">{label}</h3>
          <h2 className="text-2xl font-bold">
            {percent}
            {showPercent && "%"}
          </h2>
          <p>
            {Math.round(used)} {unit}{" "}
            {showPercent && `of ${Math.round(total)} ${unit}`} used
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesHome() {
  const server = useServer();
  const { data: services } = useFetcher<Describable[]>(
    `/api/servers/${server}/containers/list`
  );
  const { data: stats } = useFetcher<SystemStats>(
    `/api/servers/${server}/system/stats`
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-4 flex flex-wrap justify-around gap-2 xl:justify-between">
        <ServerChart
          label="CPU"
          total={stats?.cpu.cores || 0}
          used={stats?.cpu.usage || 0}
          unit="cores"
          icon={faMicrochip}
        />
        <ServerChart
          label="Memory"
          total={(stats?.memory.total || 0) / 1000000000}
          used={(stats?.memory.usage || 0) / 1000000000}
          unit="GB"
          icon={faMemory}
        />
        <ServerChart
          label="Disk"
          total={(stats?.disk.total || 0) / 1000000000}
          used={(stats?.disk.usage || 0) / 1000000000}
          unit="GB"
          icon={faHardDrive}
        />
        <ServerChart
          label="Processes"
          total={100}
          used={stats?.processes || 0}
          unit="processes"
          showPercent={false}
          icon={faBarsProgress}
        />
      </div>

      <LinkButton
        href={`/panel/${server}/add`}
        role="primary"
        className="mb-4 ml-auto px-20 py-4 font-extrabold uppercase"
      >
        Add new service
      </LinkButton>
      {services?.map((service) => (
        <ServerContainer key={service.id} {...service} serverId={server} />
      ))}
    </div>
  );
}
