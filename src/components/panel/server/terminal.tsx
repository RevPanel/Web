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
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import socketIO, { Socket } from "socket.io-client";

hljs.addPlugin({
  "after:highlight": function (data) {
    const highlightedCode = data.value;
    const modifiedCode = highlightedCode
      .replace("**rv_red**", '<span class="text-red-500">')
      .replace("**/rv_red**", "</span>");
    data.value = modifiedCode;
  },
});
hljs.addPlugin({
  "after:highlight": function (data) {
    const highlightedCode = data.value;
    const modifiedCode = highlightedCode.replace("**rv_parent**", "> ");
    data.value = modifiedCode;
  },
});
hljs.registerLanguage("accesslog", accesslog);

export function DockerTerminal(props: ServiceProps) {
  const [socketInstance, setSocket] = useState<Socket | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (socketInstance) return;
    axios
      .get(`/api/servers/${props.serverId}/containers/${props.id}/logs`)
      .then(async ({ data }) => {
        const split = data.split("\n");
        if (split[split.length - 1] === "") split.pop();
        setLines(split);

        const { data: settings } = await axios.post(
          `/api/servers/${props.serverId}/socket?type=service`,
          {}
        );
        if (socketInstance) return;

        const socket = socketIO(`${settings.ip}/containers`, {
          auth: {
            token: settings.token,
          },
        });

        socket.on("connect", () => {
          setSocket(socket);

          socket.on("message", (data: string) => {
            setLines((lines) => [...lines, data.split("\r")[0]]);
          });

          socket.emit("subscribe", {
            id: props.id,
          });

          socket.on("disconnect", () => {
            socket.removeAllListeners();
          });
        });
      });
  }, [props.id, props.serverId, socketInstance]);

  useEffect(() => {
    if (!pathname.endsWith("/console")) socketInstance?.disconnect();
  }, [pathname, socketInstance]);

  return (
    <TerminalWrapper
      lines={lines}
      submit={(command) => {
        socketInstance?.emit("execute", {
          id: props.id,
          command: command.split(" "),
        });
      }}
    />
  );
}

export function SSHTerminal({ server }: { server: string }) {
  const [socketInstance, setSocket] = useState<Socket | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (socketInstance) return;
    axios
      .post(`/api/servers/${server}/socket?type=server`, {})
      .then(async ({ data }) => {
        const socket = socketIO(`${data.ip}/terminal`, {
          auth: {
            token: data.token,
          },
        });

        socket.on("connect", () => {
          setLines((lines) => [
            ...lines,
            "[RevPanel] Connected to remote server",
          ]);
          setSocket(socket);

          socket.on("data", (data: string) => {
            setLines((lines) => {
              return [...lines, data.split("\r")[0]];
            });
          });

          socket.on("error", (data: string) => {
            setLines((lines) => [
              ...lines,
              "**rv_red**" + data.split("\r")[0] + "**/rv_red**",
            ]);
          });

          socket.emit("create");

          socket.on("disconnect", () => {
            socket.removeAllListeners();
          });
        });
      });
  }, [server, socketInstance]);

  useEffect(() => {
    if (!pathname.endsWith("/console")) socketInstance?.disconnect();
  }, [pathname, socketInstance]);

  return (
    <TerminalWrapper
      lines={lines}
      submit={(command) => {
        setLines((lines) => {
          const line = lines
            .filter((line) => line.startsWith("**rv_parent**"))
            .pop();
          const dir = line?.replace("**rv_parent**", "").trim() || "~";

          const newLines = lines.filter(
            (line) => !line.startsWith("**rv_parent**")
          );

          return [...newLines, `${dir} > ` + command];
        });

        socketInstance?.emit("execute", {
          command: command,
        });

        if (command === "clear")
          setTimeout(() => {
            setLines([]);
          }, 100);
      }}
    />
  );
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
        <div
          ref={ref}
          className="h-[60vh] w-full overflow-y-auto p-4 md:h-[70vh]"
        >
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
