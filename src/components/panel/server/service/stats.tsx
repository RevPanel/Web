"use client";

import { useFetcher } from "@/hooks/fetcher";
import { ServiceProps } from "@/types/service";
import { useMemo } from "react";

function StatBar({
  title,
  used,
  total,
  unit
}: {
  title: string;
  used: number;
  total: number;
  unit: string;
}) {
  const percent = useMemo(() => {
    return Math.round((used / total) * 100 || 0);
  }, [used, total]);

  return (
    <div>
      <div className="flex w-full justify-between">
        <h1 className="font-light">{title}</h1>
        <p>{percent}%</p>
      </div>
      <div className="relative block h-4 w-full rounded-xl bg-background">
        <div
          className="bg-gradient absolute left-0 top-0 h-4 rounded-xl"
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
      <p>
        {Math.round(used)} {unit} of {Math.round(total)} {unit} used
      </p>
    </div>
  );
}

export default function Stats(props: ServiceProps) {
  const { data: stats } = useFetcher<{
    offline: boolean;
    cpu: {
      cores: number;
      usage: number;
    };
    memory: {
      total: number;
      usage: number;
    };
  }>(`/api/servers/${props.serverId}/containers/${props.id}/stats`);

  return (
    <div className="card">
      <h1 className="font-light uppercase">Stats</h1>
      <StatBar
        title="Memory"
        used={(stats?.memory.usage || 0) / 1000000000}
        total={(stats?.memory.total || 0) / 1000000000}
        unit="GB"
      />
      <StatBar
        title="CPU"
        used={stats?.cpu.usage || 0}
        total={stats?.cpu.cores || 0}
        unit="cores"
      />
    </div>
  );
}
