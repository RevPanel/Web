"use client";

import { Button } from "@/components/button";
import { useFetcher } from "@/hooks/fetcher";
import RecentConnection from "./connection";

export default function NetworkManager({ server }: { server: string }) {
  const { data } = useFetcher(`/api/servers/${server}/system/network/list`);
  // todo: check again after the api is done

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Open Ports</h1>
            <p>Click a port to manage it</p>
          </div>

          <Button role="primary" className="!px-16 uppercase">
            Create new
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* <Port className="w-1/2 flex-1 bg-background-secondary" />
          <Port className="w-1/2 flex-1 bg-background-secondary" />
          <Port className="w-1/2 flex-1 bg-background-secondary" /> */}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h1 className="text-3xl font-extrabold">Recent Connections</h1>

        <div className="flex flex-col gap-4">
          <RecentConnection />
          <RecentConnection />
          <RecentConnection />
        </div>
      </div>
    </div>
  );
}
