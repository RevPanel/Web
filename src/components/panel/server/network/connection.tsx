import {
  faClock,
  faDoorOpen,
  faLaptop,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecentConnection() {
  return (
    <div className="card flex w-full flex-col flex-wrap items-center justify-between md:flex-row">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faLaptop} className="text-2xl" />
        <p>127.0.0.1</p>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-10">
        <p className="flex items-center gap-4">
          <FontAwesomeIcon icon={faLocationArrow} className="text-2xl" /> Italy
        </p>
        <p className="flex items-center gap-4">
          <FontAwesomeIcon icon={faClock} className="text-2xl" /> 12:35
        </p>
        <p className="flex items-center gap-4">
          <FontAwesomeIcon icon={faDoorOpen} className="text-2xl" /> 25565
        </p>
      </div>
      <p className="text-gradient">Minecraft</p>
    </div>
  );
}
