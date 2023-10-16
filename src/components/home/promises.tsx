import {
  faAnglesUp,
  faHeadphones,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../button";

export default function Promises() {
  return (
    <div id="promises" className="flex w-full flex-col items-center gap-2 px-8">
      <Button
        type="button"
        role="secondary"
        className="mx-auto w-fit uppercase md:m-0"
      >
        <span className="text-gradient">See what we work with</span>
      </Button>
      <h2 className="text-4xl font-extrabold">Our promises</h2>
      <h3 className="text-center text-xl text-tertiary">
        We always work with these promises in mind
      </h3>
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center md:w-4/5 lg:flex-row">
        <div className="flex flex-col items-center gap-4 lg:w-[30rem]">
          <div className="bg-gradient flex h-14 w-14 items-center justify-center rounded-xl text-3xl text-white">
            <FontAwesomeIcon icon={faStopwatch} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-2xl font-bold">Uptime</h4>
            <h5 className="w-3/4 text-tertiary">
              We always do our best to fix downtimes as soon as they happens
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 lg:w-[30rem]">
          <div className="bg-gradient flex h-14 w-14 items-center justify-center rounded-xl text-3xl text-white">
            <FontAwesomeIcon icon={faAnglesUp} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-2xl font-bold">Updated</h4>
            <h5 className="w-3/4 text-tertiary">
              We ship new features monthly to always keep our standards high.
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 lg:w-[30rem]">
          <div className="bg-gradient flex h-14 w-14 items-center justify-center rounded-xl text-3xl text-white">
            <FontAwesomeIcon icon={faHeadphones} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-2xl font-bold">We listen</h4>
            <h5 className="w-3/4 text-tertiary">
              You are at our first place as in priority. We always listen to
              feedbacks for reports and improvements.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
