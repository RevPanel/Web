"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import { PlausibleEvents } from "@/types/plausible";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDocker, faNode } from "@fortawesome/free-brands-svg-icons";
import {
  faAnglesLeft,
  faCode,
  faDatabase,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { usePlausible } from "next-plausible";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// TODO: Use correct image ids

function Range({
  name,
  bind,
  options,
}: {
  name: string;
  bind: [number, (value: number) => void];
  options: number[];
}) {
  return (
    <div className="flex w-1/3 flex-col gap-2">
      <label className="text-xs">{name}</label>

      <input
        type="range"
        min={0}
        max={options[options.length - 1]}
        value={bind[0]}
        onChange={(e) => bind[1](parseInt(e.target.value))}
        className="daisy-range daisy-range-primary daisy-range-xs"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {options.map((option) => (
          <span key={option}>{option}</span>
        ))}
      </div>
    </div>
  );
}

function ServiceType({
  name,
  icon,
  image,
}: {
  name: string;
  icon: IconProp;
  image: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      onClick={() => {
        if (image === "marketplace") {
          router.push(`${pathname.split("/").slice(0, -1).join("/")}/packages`);
          return;
        }

        router.push(pathname + `?image=${image}`);
      }}
      className="card flex h-52 w-52 flex-col items-center justify-center"
    >
      <FontAwesomeIcon icon={icon} className="text-8xl" />
      <h1 className="text-xl font-extrabold">{name}</h1>
    </button>
  );
}

export default function Page({
  params,
}: {
  params: {
    server: string;
  };
}) {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);
  const [error, setError] = useState("");
  const plausible = usePlausible<PlausibleEvents>();

  if (!search.has("image"))
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold">Select the service type</h1>
        <div className="flex flex-wrap items-center justify-center gap-10">
          <ServiceType name="Static Website" icon={faCode} image="static" />
          <ServiceType name="Docker Image" icon={faDocker} image="docker" />
          <ServiceType name="Node App" icon={faNode} image="node" />
          <ServiceType
            name="Database Server"
            icon={faDatabase}
            image="database"
          />
          <ServiceType
            name="Open Marketplace"
            icon={faShoppingBag}
            image="marketplace"
          />
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Link href={pathname} className="flex items-center gap-2 text-tertiary">
        <FontAwesomeIcon icon={faAnglesLeft} className="text-2xl" />
        Back to Image Selection
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          plausible("serviceCreate", {
            props: {
              image: search.get("image") || "",
            },
          });
          
          axios
            .post(`/api/servers/${params.server}/containers/create`, {
              name,
              memory,
              disk,
              image: search.get("image"),
            })
            .then(({ data }) => {
              router.push(`/panel/${params.server}/${data.id}`);
            })
            .catch((err) => setError(err.response.data.message));
        }}
        className="m-auto flex w-3/4 flex-col gap-4"
      >
        <h1 className="text-center text-4xl font-extrabold">
          Select the service type
        </h1>
        {error && <p className="text-center font-bold text-red-500">{error}</p>}
        <div className="card flex w-full flex-row items-center justify-between">
          <h1 className="text-xl font-extrabold">Name</h1>
          <FormInput
            bind={[name, setName]}
            placeholder="Name"
            className="!min-w-0 !bg-background"
          />
        </div>
        <div className="card flex w-full flex-row items-center justify-between">
          <h1 className="text-xl font-extrabold">Allocate memory</h1>
          <Range
            name="Memory"
            bind={[memory, setMemory]}
            options={[25, 50, 75, 100]}
          />
        </div>
        <div className="card flex w-full flex-row items-center justify-between">
          <h1 className="text-xl font-extrabold">Allocate Disk</h1>
          <Range name="Disk" bind={[disk, setDisk]} options={[1, 5, 10, 15]} />
        </div>
        <Button type="submit" role="primary">
          Continue
        </Button>
      </form>
    </div>
  );
}
