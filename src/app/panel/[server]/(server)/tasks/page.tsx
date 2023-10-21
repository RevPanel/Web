"use client";

import { useFetcher } from "@/hooks/fetcher";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

type Task = {
  pid: number;
  cpu: number;
  memory: number;
  command: string;
};

export default function TaskManager({
  params: { server },
}: {
  params: {
    server: string;
  };
}) {
  const { data, mutate, error } = useFetcher<Task[]>(
    `/api/servers/${server}/system/process/list`
  );

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 rounded-lg bg-red-500 p-4 text-white">
          {error.response?.data?.message || "An error occurred!"}
        </div>
      )}
      <div className="card relative w-full overflow-x-auto p-4">
        <table className="h-[70vh] w-full overflow-y-auto">
          <tbody>
            <tr
              className={
                !data?.length ? "flex items-start justify-between" : ""
              }
            >
              <td className="font-bold min-w-[5rem]">Name</td>
              <td className="font-bold min-w-[5rem]">Status</td>
              <td className="font-bold min-w-[5rem]">CPU</td>
              <td className="font-bold min-w-[5rem]">Memory</td>
              <td className="font-bold min-w-[5rem]">Disk</td>
              <td className="font-bold min-w-[5rem]">Network</td>
            </tr>

            {data?.map((task) => (
              <ContextMenuTrigger
                key={task.pid}
                id="task_cm"
                renderTag={"tr"}
                collect={() => ({ pid: task.pid })}
              >
                <td>{task.command.split("/").pop()?.split(" ").shift()}</td>
                <td>Running</td>
                <td>{task.cpu}%</td>
                <td>{task.memory}%</td>
                <td>10MB</td>
                <td>2,5MBps</td>
              </ContextMenuTrigger>
            ))}
          </tbody>
        </table>

        <ContextMenu id="task_cm">
          <MenuItem
            onClick={async (_, { pid }: { pid: number }) => {
              await axios.post(
                `/api/servers/${server}/system/process/${pid}/kill`,
                {}
              );
              mutate();
            }}
          >
            <FontAwesomeIcon icon={faCross} /> Kill
          </MenuItem>
        </ContextMenu>
      </div>
    </div>
  );
}
