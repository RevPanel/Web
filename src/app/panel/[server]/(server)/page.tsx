"use client";

import { Button } from "@/components/button";
import ServerContainer from "@/components/panel/server";
import { useFetcher } from "@/hooks/fetcher";
import useServer from "@/hooks/server";
import { Describable } from "@/types/service";
import Image from "next/image";

function ServerChart() {
  return (
    <div className="card flex w-full flex-col gap-2 p-2 lg:w-auto lg:last:hidden xl:last:flex">
      <div className="m-4 flex gap-2">
        <div>
          <div className="block h-20 w-20 rounded-full bg-tertiary"></div>
        </div>
        <div>
          <h3 className="text-xl">CPU</h3>
          <h2 className="text-2xl font-bold">2.3%</h2>
          <p>10 GB of 100 GB used</p>
        </div>
      </div>
      <Image src="/chart.svg" width={300} height={100} alt="chart" />
    </div>
  );
}

export default function ServicesHome() {
  const server = useServer();
  const {
    data: services,
  }: {
    data?: Describable[];
  } = useFetcher(`/api/servers/${server}/containers/list`);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-4 flex flex-wrap justify-between gap-2 lg:flex-nowrap">
        <ServerChart />
        <ServerChart />
        <ServerChart />
        <ServerChart />
      </div>

      <Button
        role="primary"
        className="mb-4 ml-auto px-20 py-4 font-extrabold uppercase"
      >
        Add new service
      </Button>
      {services?.map((service) => (
        <ServerContainer key={service.id} {...service} serverId={server} />
      ))}
    </div>
  );
}
