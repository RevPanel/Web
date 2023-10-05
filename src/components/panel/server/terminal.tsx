"use client";

import type { ServiceProps } from "@/types/service";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import socketIO, { Socket } from "socket.io-client";

export function DockerTerminal(props: ServiceProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`/api/servers/${props.serverId}/containers/${props.id}/logs`)
      .then(({ data }) => {
        setLines(data.split("\n"));

        const socket = socketIO("http://172.27.3.36:8080/containers");

        socket.on("connect", () => {
          setSocket(socket);

          socket.on("message", (data) => {
            setLines((lines) => [...lines, data]);
          });

          socket.emit("subscribe", {
            id: props.id,
          });
        });
      });
  }, [props]);

  return (
    <TerminalWrapper
      lines={lines}
      submit={(command) => {
        socket?.emit("execute", {
          id: props.id,
          command: command.split(" "),
        });
      }}
    />
  );
}

export function SSHTerminal() {
  return <TerminalWrapper lines={[]} submit={() => {}} />;
}

function TerminalWrapper({
  lines,
  submit,
}: {
  lines: string[];
  submit: (command: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");

  useEffect(() => {
    ref.current?.scroll({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  return (
    <div className="w-full rounded-xl bg-background-secondary">
      <div ref={ref} className="h-[70vh] w-full overflow-y-auto p-4">
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!command) return;

          submit(command);
          setCommand("");
        }}
      >
        <input
          type="text"
          className="w-full rounded-xl border-2 border-primary bg-transparent p-2"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
      </form>
    </div>
  );
}
