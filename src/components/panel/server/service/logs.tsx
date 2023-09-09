import StartIcon from "@/components/icons/Start";

function LogBar() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-background p-4">
      <StartIcon className="h-8 w-6" />
      <p>Server Started</p>
      <p className="ml-auto text-tertiary">10:00</p>
    </div>
  );
}

export default function AuditLogs() {
  return (
    <div className="card lg:w-1/3">
      <h1 className="font-light uppercase">Audit Logs</h1>
      <LogBar />
      <LogBar />
      <LogBar />
    </div>
  );
}
