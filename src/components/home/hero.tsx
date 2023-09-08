import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../button";

export default function Hero() {
  return (
    <div className="md:w-1/2 xl:w-1/3 mx-auto flex flex-col gap-4 text-center items-center justify-center">
      <Button className="text-gradient font-medium" role="secondary">
        AN INNOVATIVE AND EXCLUSIVE PANEL
      </Button>
      <h1 className="font-medium text-4xl">
        Have the best <span className="text-gradient">panel</span> on the
        current market
      </h1>
      <p className="text-tertiary">
        Integrate with your system and generate a great organization for your
        project
      </p>
      <Button
        className="font-medium !p-4 !px-8 flex items-center gap-2"
        role="primary"
      >
        <FontAwesomeIcon icon={faCircleUser} />
        GET STARTED
      </Button>
    </div>
  );
}
