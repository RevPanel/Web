function UsageBar({
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

export default function TrafficUsage() {
  return (
    <div className="card lg:w-2/3">
      <h1 className="font-light uppercase">Traffic Usage</h1>
      <UsageBar title="Inbound" used={0} total={20} />
      <UsageBar title="Outbound" used={0} total={20} />
      <UsageBar title="Total" used={0} total={40} />
    </div>
  );
}
