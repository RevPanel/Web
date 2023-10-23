"use client";

import { Button } from "@/components/button";
import { useFetcher } from "@/hooks/fetcher";
import axios from "axios";

export default function ServerUpdater({ server }: { server: string }) {
  const { data: system } = useFetcher<{
    version: string;
  }>(`/api/servers/${server}/system/health`);

  return (
    <div className="card lg:w-1/2 xl:w-3/5">
      <h1 className="text-3xl font-extrabold">Version</h1>
      <p className="text-justify xl:w-2/3">
        The panel daemon automatically updates itself to the latest version.
        Sometimes, you may need to manually update the panel daemon. Click the
        button below to check for new versions and eventually update the panel
        daemon.
      </p>
      <div className="mt-auto flex gap-2">
        <Button
          onClick={() => {
            axios.post(`/api/servers/${server}/system/update`);
          }}
          role="primary"
        >
          Check new version
        </Button>
        <Button role="secondary">v{system?.version || "??"}</Button>
      </div>
    </div>
  );
}
