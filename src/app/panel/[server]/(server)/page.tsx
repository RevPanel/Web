"use client";

import { LinkButton } from "@/components/button";
import ServerContainer from "@/components/panel/server";
import { useFetcher } from "@/hooks/fetcher";
import useServer from "@/hooks/server";
import { Describable } from "@/types/service";

function ServerChart() {
  return (
    <div className="card flex w-full flex-col gap-2 p-2 lg:w-auto lg:last:hidden xl:last:flex">
      <div className="m-4 flex gap-2">
        <div
          className="daisy-radial-progress bg-background text-secondary"
          style={
            {
              "--value": 70,
            } as any
          }
        ></div>

        <div>
          <h3 className="text-xl">CPU</h3>
          <h2 className="text-2xl font-bold">2.3%</h2>
          <p>10 GB of 100 GB used</p>
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

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-4 flex flex-wrap justify-between gap-2 lg:flex-nowrap">
        <ServerChart />
        <ServerChart />
        <ServerChart />
        <ServerChart />
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
