import StartIcon from "@/components/icons/Start";

export default function TaskManager() {
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
            <div className="flex items-center justify-between">
              <div>Discord</div>
              <div>
                <StartIcon width={20} height={20} className="text-white" />
              </div>
              <div>10%</div>
              <div>60%</div>
              <div>10MB</div>
              <div>2,5MBps</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
