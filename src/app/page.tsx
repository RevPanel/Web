import Button from "@/components/button";
import Logo from "@/components/logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col w-full p-6 gap-10">
      <Image
        src="/blur.svg"
        alt="blur"
        className="absolute top-0 left-0 w-full h-full -z-10"
        draggable={false}
        width={100}
        height={100}
        placeholder="empty"
      />

      <Logo />
      <div className="mx-auto text-center">
        <h1 className="font-extrabold text-5xl">
          The panel <span className="text-gradient">everyone</span> can use
        </h1>
        <h2 className="text-[#A5A5A5]">
          Do not pay for a System Administrator when you can do it yourself with
          our panel
        </h2>
        <Button className="mt-4 font-bold">Install with one click</Button>
      </div>
    </main>
  );
}
