import { UserButton } from "../auth";
import BellIcon from "../icons/Bell";
import RouteTitle from "./route-title";
import SidebarWrapper from "./sidebar-wrapper";

export default function BaseLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <SidebarWrapper sidebar={sidebar} />
      <div className="my-6 flex w-full flex-col gap-8 overflow-y-auto px-10">
        <div className="flex w-full justify-between">
          <RouteTitle />
          <div className="flex gap-4">
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-background-secondary p-4 text-3xl">
              <BellIcon />
            </button>
            <UserButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
