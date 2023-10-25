"use client";

import RestartIcon from "@/components/icons/Restart";
import StartIcon from "@/components/icons/Start";
import StopIcon from "@/components/icons/Stop";
import type { ServiceProps, SessionProps } from "@/types/service";
import axios from "axios";
import { useEffect, useState } from "react";

async function run(action: string, props: ServiceProps) {
  axios.post(`/api/servers/${props.serverId}/containers/${props.id}/${action}`);
}

export default function QuickActions(props: ServiceProps & SessionProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message || message === "") return;

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  return (
    <>
      {message && (
        <div className="card flex h-10 w-full flex-col justify-center bg-primary p-0">
          <p className="m-auto text-center text-xl">{message}</p>
        </div>
      )}

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
                setMessage("Server started successfully!");
              }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
            >
              <StartIcon gradient="true" />
            </button>
            <button
              onClick={() => {
                run("stop", props);
                setMessage("Server stopped successfully!");
              }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
            >
              <StopIcon gradient="true" />
            </button>
            <button
              onClick={() => {
                run("restart", props);
                setMessage("Server restarted successfully!");
              }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4"
            >
              <RestartIcon gradient="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
