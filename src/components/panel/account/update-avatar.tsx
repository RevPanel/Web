import { Button } from "@/components/button";
import Image from "next/image";

export default function UpdateAvatar() {
  return (
    <div className="relative w-[200px] h-[200px]">
      <Image
        src="/lorenzo0111.png"
        width={200}
        height={200}
        draggable={false}
        alt="logoProfile"
        className="rounded-xl"
      />
      <div className="absolute bottom-2 left-0 w-full flex flex-col items-center">
        <Button className="mx-auto !px-12" role="primary">
          Upload
        </Button>
      </div>
    </div>
  );
}
