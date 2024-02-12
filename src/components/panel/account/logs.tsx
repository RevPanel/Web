"use client";

import PlusIcon from "@/components/icons/Plus";
import RestartIcon from "@/components/icons/Restart";
import StartIcon from "@/components/icons/Start";
import StopIcon from "@/components/icons/Stop";
import TickIcon from "@/components/icons/Tick";
import TickOffIcon from "@/components/icons/TickOff";
import { useFetcher } from "@/hooks/fetcher";
import { AuditLog, ServiceProps } from "@/types/service";
import { capitalize } from "@/utils/text";
import moment from "moment";

export function LogBar(props: AuditLog) {
  let icon;

  switch (props.action) {
    case "START":
      icon = <StartIcon className="h-8 w-6" />;
      break;
    case "STOP":
      icon = <StopIcon className="h-8 w-6" />;
      break;
    case "RESTART":
      icon = <RestartIcon className="h-8 w-6" />;
      break;
    default:
      icon = <TickOffIcon className="h-8 w-6" />;
      break;
  }

  return (
    <div className="flex items-center gap-4 rounded-xl bg-background p-4">
      {icon}
      <p>{capitalize(props.action)?.replace("_", " ")}</p>
      <p className="word-break ml-auto overflow-hidden text-ellipsis whitespace-nowrap text-tertiary">
        {moment(props.createdAt).fromNow()}
      </p>
    </div>
  );
}

export default function AuditLogs(props: ServiceProps) {
  const { data: logs } = useFetcher<AuditLog[]>(
    `/api/server/audit/${props.id}`
  );

  return (
    <div className="card lg:w-1/3">
      <h1 className="font-light uppercase">Audit Logs</h1>
      <div className="flex max-h-[14rem] flex-col gap-4 overflow-y-auto">
        {logs?.map((log: AuditLog) => <LogBar key={log.id} {...log} />)}
      </div>
    </div>
  );
}
