"use client";

import { Button } from "@/components/button";
import Image from "next/image";
import { useRef } from "react";

export default function UpdateAvatar() {
  const fileRef = useRef<HTMLInputElement>(null);
  // todo: handle file upload

  return (
    <div className="relative h-[200px] w-[200px]">
      <Image
        src="/lorenzo0111.png"
        width={200}
        height={200}
        draggable={false}
        alt="logoProfile"
        className="rounded-xl"
      />
      <input type="file" hidden ref={fileRef} />
      <div className="absolute bottom-14 left-0 flex w-full flex-col items-center">
        <Button
          onClick={() => fileRef.current?.click()}
          className="mx-auto !px-8"
          role="primary"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
