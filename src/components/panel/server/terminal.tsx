"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import type { ServiceProps } from "@/types/service";
import { faCopy, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import hljs from "highlight.js/lib/core";
import accesslog from "highlight.js/lib/languages/accesslog";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import socketIO, { Socket } from "socket.io-client";

hljs.registerLanguage("accesslog", accesslog);

export function DockerTerminal(props: ServiceProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`/api/servers/${props.serverId}/containers/${props.id}/logs`)
      .then(({ data }) => {
        setLines(data.split("\n"));

        // todo: change ip
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
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    ref.current?.scroll({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const highlightedCode = hljs.highlight(lines.join("\n"), {
    language: "accesslog",
  }).value;

  return (
    <div className="w-full rounded-xl bg-background-secondary">
      <ContextMenuTrigger id="console_cm">
        <div ref={ref} className="h-[70vh] w-full overflow-y-auto p-4">
          <pre
            className=" overflow-x-auto whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          ></pre>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id="console_cm">
        <MenuItem
          onClick={(_, { line }: { line: string }) => {
            navigator.clipboard.writeText(line);
          }}
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2" /> Copy
        </MenuItem>
        {/* <MenuItem>
          <FontAwesomeIcon icon={faQuestion} className="mr-2" /> Ask AI
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            onOpen();
          }}
        >
          <FontAwesomeIcon icon={faWarning} className="mr-2" /> Create tracker
        </MenuItem>
      </ContextMenu>

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
          className="w-full rounded-xl border-2 border-primary bg-transparent p-2 py-3 outline-none"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command"
        />
      </form>

      <Modal title="Create error tracker" onClose={onClose} isOpen={isOpen}>
        <div className="flex w-full flex-col gap-2">
          <h2 className="text-xl font-bold">
            Create a new pattern to be warned about
          </h2>
          <FormInput
            placeholder="Name"
            type="text"
            name="name"
            className="w-full !bg-background"
            required
          />

          <FormInput
            placeholder="Regex pattern"
            type="text"
            name="regex"
            className="w-full !bg-background"
            required
          />

          <Button
            role="primary"
            className="w-full"
            onClick={() => {
              onClose();
            }}
          >
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
}
