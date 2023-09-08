import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../button";

export default function Hero() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center md:w-1/2 xl:w-1/3">
      <Button className="text-gradient font-medium" role="secondary">
        AN INNOVATIVE AND EXCLUSIVE PANEL
      </Button>
      <h1 className="text-4xl font-medium">
        Have the best <span className="text-gradient">panel</span> on the
        current market
      </h1>
      <p className="text-tertiary">
        Integrate with your system and generate a great organization for your
        project
      </p>
      <Button
        className="flex items-center gap-2 !p-4 !px-8 font-medium"
        role="primary"
      >
        <FontAwesomeIcon icon={faCircleUser} />
        GET STARTED
      </Button>
    </div>
  );
}
