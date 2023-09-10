import { Button } from "@/components/button";
import Port from "../network/port";

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
