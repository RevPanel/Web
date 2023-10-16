import Link from "next/link";
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
      <div className="my-6 flex min-h-[94vh] w-full flex-col gap-8 overflow-y-auto px-10">
        <div className="flex w-full justify-between ">
          <RouteTitle />
          <div className="flex gap-4">
            {/* todo <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-background-secondary p-4 text-3xl">
              <BellIcon />
            </button> */}
            <UserButton />
          </div>
        </div>
        {children}
        <div className="mt-auto flex w-full flex-col justify-between border-t border-t-gray-900 pt-4 text-center text-tertiary md:flex-row">
          <p>Copyright &copy; RevPanel - 2023</p>
          <Link className="text-tertiary" href="mailto:contact@revpanel.io">
            contact@revpanel.io
          </Link>
        </div>
      </div>
    </div>
  );
}
