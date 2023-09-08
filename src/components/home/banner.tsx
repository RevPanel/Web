import { Button } from "../button";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative md:w-3/4 md:h-96 p-8 py-14 md:py-4 md:p-4 mx-auto bg-background-secondary rounded-xl flex flex-col gap-2 justify-center items-center text-center">
      <Image
        src="/dots.svg"
        className="absolute top-0 left-0"
        alt="dots"
        width="100"
        height="100"
      />
      <h3 className="text-tertiary">
        More than 1000+ companies using our dashboard
      </h3>
      <h1 className="text-gradient md:w-1/2 text-3xl font-bold">
        The Future has arrived, the best dashboard for your company
      </h1>
      <Button role="white" className="font-medium uppercase !p-4 !px-8">
        <span className="text-black">Get the Dashboard</span>
      </Button>
      <Image
        src="/dots.svg"
        className="absolute bottom-0 right-0"
        alt="dots"
        width="100"
        height="100"
      />
    </div>
  );
}
