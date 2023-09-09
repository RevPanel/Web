import RestartIcon from "@/components/icons/Restart";
import StartIcon from "@/components/icons/Start";
import StopIcon from "@/components/icons/Stop";

export default function QuickActions() {
  return (
    <div className="card">
      <h1 className="font-light uppercase">Quick Actions</h1>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-xl font-bold">Hey, Michele!</h1>
          <p className="font-light">Waht do you want to do now?</p>
        </div>
        <div className="flex gap-4">
          <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4">
            <StartIcon gradient />
          </button>
          <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4">
            <StopIcon gradient />
          </button>
          <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-background p-4">
            <RestartIcon gradient />
          </button>
        </div>
      </div>
    </div>
  );
}
