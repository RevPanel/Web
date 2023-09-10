import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ServerContainer() {
  return (
    <Link
      href="/panel/server"
      className="flex flex-col items-center justify-between rounded-xl bg-background-secondary px-6 py-4 text-white md:flex-row"
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faServer} className="text-4xl" />
        <div className="flex flex-col">
          <h1 className="w-fit text-xl font-bold">Server Name</h1>
          <p>Server description</p>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <p>CPU: 10%</p>
        <p>CPU: 10%</p>
        <p>CPU: 10%</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-gradient block h-5 w-5 rounded-full"></span>
        <p>Online</p>
      </div>
    </Link>
  );
}
