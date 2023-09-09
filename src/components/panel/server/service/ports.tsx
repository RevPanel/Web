import { Button } from "@/components/button";

function Port() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-background p-4 text-tertiary">
      <p>Minecraft</p>
      <p>(25565)</p>
      <p className="text-gradient ml-auto">Open</p>
    </div>
  );
}

export default function OpenPorts() {
  return (
    <div className="card flex flex-col lg:w-1/2">
      <h1 className="font-light uppercase">Open Ports (3)</h1>
      <Port />
      <Port />
      <Port />
      <Button role="primary" className="mt-auto font-extrabold uppercase">
        Manage Ports
      </Button>
    </div>
  );
}
