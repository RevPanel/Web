"use client";

import StartIcon from "@/components/icons/Start";
import { useFetcher } from "@/hooks/fetcher";

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
  const {
    data,
    mutate,
  }: {
    data?: Task[];
    mutate: () => void;
  } = useFetcher(`/api/servers/${server}/system/process/list`);

  return (
    <div className="w-full">
      <div className="card relative w-full overflow-x-auto p-4">
        <div className="min-w-[25rem]">
          <div className="flex justify-between">
            <div className="font-bold">Name</div>
            <div className="font-bold">Status</div>
            <div className="font-bold">CPU</div>
            <div className="font-bold">Memory</div>
            <div className="font-bold">Disk</div>
            <div className="font-bold">Network</div>
          </div>
          <div className="flex h-[70vh] w-full flex-col gap-2 overflow-y-auto">
            {data?.map((task) => (
              <div key={task.pid} className="flex items-center justify-between">
                <div>{task.command.split("/").pop()?.split(" ").shift()}</div>
                <div>
                  <StartIcon width={20} height={20} className="text-white" />
                </div>
                <div>{task.cpu}%</div>
                <div>{task.memory}%</div>
                <div>10MB</div>
                <div>2,5MBps</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
