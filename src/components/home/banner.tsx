import Image from "next/image";
import { LinkButton } from "../button";
import StartIcon from "../icons/Start";

export default function Banner() {
  return (
    <div className="my-4 flex w-full justify-center px-8">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-xl bg-background-secondary p-8 py-14 text-center md:h-96 md:w-4/5 md:p-4 md:py-4">
        <Image
          src="/dots.svg"
          className="absolute left-0 top-0"
          alt="dots"
          width="100"
          height="100"
        />
        <h3 className="text-tertiary">
          More than 1000+ machines are connected to our panel
        </h3>
        <h1 className="text-gradient text-3xl font-bold md:w-1/2">
          We&apos;ll pay your first month to let you enjoy the whole experience
        </h1>
        <LinkButton
          href="/panel"
          role="white"
          className="flex gap-2 !p-4 !px-8 font-medium uppercase"
        >
          <StartIcon width={20} className="text-black" />
          <span className="text-black">Start Now</span>
        </LinkButton>
        <Image
          src="/dots.svg"
          className="absolute bottom-0 right-0"
          alt="dots"
          width="100"
          height="100"
        />
      </div>
    </div>
  );
}
