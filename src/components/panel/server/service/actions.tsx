"use client";

import RestartIcon from "@/components/icons/Restart";
import StartIcon from "@/components/icons/Start";
import StopIcon from "@/components/icons/Stop";
import type { ServiceProps, SessionProps } from "@/types/service";

async function run(action: string, props: ServiceProps) {
  fetch(`/api/servers/${props.serverId}/containers/${props.id}/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function QuickActions(props: ServiceProps & SessionProps) {
  return (
    <div className="card">
      <h1 className="font-light uppercase">Quick Actions</h1>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-xl font-bold">
            Hey, {props.session?.user?.name}!
          </h1>
          <p className="font-light">What do you want to do now?</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              run("start", props);
            }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
          >
            <StartIcon gradient="true" />
          </button>
          <button
            onClick={() => {
              run("stop", props);
            }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
          >
            <StopIcon gradient="true" />
          </button>
          <button
            onClick={() => {
              run("restart", props);
            }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
          >
            <RestartIcon gradient="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
