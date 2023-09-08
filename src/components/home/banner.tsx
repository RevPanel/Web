import Image from "next/image";
import { LinkButton } from "../button";

export default function Banner() {
  return (
    <div className="relative mx-auto my-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-background-secondary p-8 py-14 text-center md:h-96 md:w-4/5 md:p-4 md:py-4">
      <Image
        src="/dots.svg"
        className="absolute left-0 top-0"
        alt="dots"
        width="100"
        height="100"
      />
      <h3 className="text-tertiary">
        More than 1000+ companies using our dashboard
      </h3>
      <h1 className="text-gradient text-3xl font-bold md:w-1/2">
        The Future has arrived, the best dashboard for your company
      </h1>
      <LinkButton
        href="#"
        role="white"
        className="!p-4 !px-8 font-medium uppercase"
      >
        <span className="text-black">Get the Dashboard</span>
      </LinkButton>
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
