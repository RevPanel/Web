"use client";

import { ServiceProps } from "@/types/service";

function StatBar({
  title,
  used,
  total,
}: {
  title: string;
  used: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex w-full justify-between">
        <h1 className="font-light">{title}</h1>
        <p>{(used / total) * 100}%</p>
      </div>
      <div className="relative block h-4 w-full rounded-xl bg-background">
        <div
          className="bg-gradient absolute left-0 top-0 h-4 rounded-xl"
          style={{
            width: `${(used / total) * 100}%`,
          }}
        ></div>
      </div>
      <p>
        {used} GB of {total} GB Used
      </p>
    </div>
  );
}

export default function Stats(props: ServiceProps) {
  // todo: complete

  return (
    <div className="card">
      <h1 className="font-light uppercase">Stats</h1>
      <StatBar title="Memory" used={50} total={100} />
      <StatBar title=" SpaDiskce" used={50} total={100} />
    </div>
  );
}
