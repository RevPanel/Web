"use client";

import { Button } from "@/components/button";
import { useFetcher } from "@/hooks/fetcher";
import { ServiceProps } from "@/types/service";
import Port from "../network/port";

export default function OpenPorts(props: ServiceProps) {
  const { data: container } = useFetcher(
    `/api/servers/${props.serverId}/containers/${props.id}`
  );

  return (
    <div className="card flex flex-col lg:w-1/2">
      <h1 className="font-light uppercase">
        Open Ports ({container?.ports.length})
      </h1>
      {container?.ports.map((port: any) => (
        <Port key={port.id} name={port.name} port={port.publicPort} />
      ))}
      <Button role="primary" className="mt-auto font-extrabold uppercase">
        Manage Ports
      </Button>
    </div>
  );
}
