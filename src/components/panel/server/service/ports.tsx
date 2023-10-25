"use client";

import { Button, LinkButton } from "@/components/button";
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
      <div className="flex max-h-[15rem] flex-col gap-4 overflow-y-auto">
        {container?.ports.map((port: any) => (
          <Port key={port.id} name={port.name} port={port.publicPort} />
        ))}
      </div>
      <LinkButton
        href={`/panel/${props.serverId}/${props.id}/ports`}
        role="primary"
        className="mt-auto font-extrabold uppercase"
      >
        Manage Ports
      </LinkButton>
    </div>
  );
}
