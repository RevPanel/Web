import ServerContainer from "@/components/panel/server";
import CreateServer from "@/components/panel/server/server-create";

export default function ServersHome() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CreateServer />
      <ServerContainer />
      <ServerContainer />
      <ServerContainer />
    </div>
  );
}
