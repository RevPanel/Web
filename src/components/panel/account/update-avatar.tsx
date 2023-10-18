"use client";

import { Button } from "@/components/button";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";

export default function UpdateAvatar({
  avatar,
  name,
}: {
  avatar?: string | null;
  name: string;
}) {
  const [avatarUrl, setAvatarUrl] = useState(
    avatar ||
      `https://ui-avatars.com/api/?name=${name}&background=7967FF&size=150`
  );
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex h-[150px] w-[150px] flex-col items-center md:h-[200px] md:w-[200px]">
      <Image
        src={avatarUrl}
        width={150}
        height={150}
        quality={100}
        draggable={false}
        alt="logoProfile"
        className="rounded-xl"
      />
      <input
        type="file"
        hidden
        ref={fileRef}
        onChange={() => {
          const file = fileRef.current?.files?.[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          axios.postForm("/api/auth/update/avatar", formData).then((res) => {
            setAvatarUrl(res.data.url);
          });
        }}
      />
      <div className="absolute bottom-4 left-0 flex w-full flex-col items-center md:bottom-14">
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
