import { Button } from "@/components/button";
import ServerContainer from "@/components/panel/server";

export default function ServersHome() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Button
        role="primary"
        className="mb-4 ml-auto px-20 py-4 font-extrabold uppercase"
      >
        Add new machine
      </Button>
      <ServerContainer />
      <ServerContainer />
      <ServerContainer />
    </div>
  );
}
