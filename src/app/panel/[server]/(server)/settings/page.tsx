import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Toggle from "@/components/toggle";
import Image from "next/image";

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-1/2 xl:w-1/3">
        <div className="card w-full p-4">
          <h1 className="font-bold">Server Name</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet. Et suscipit molestiae ut cumque commodi
            sit culpa explicabo.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Name</h1>
          <FormInput placeholder="Name" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Description</h1>
          <FormInput placeholder="Description" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Manage Collaborators</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet. Et suscipit molestiae ut cumque commodi
            sit culpa explicabo. Est magnam incidunt eum dolorem veniam est
            impedit aliquid a error nostrum quo nemo eius sit animi asperiores
            sit iure inventore.
          </p>
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <Image
                src="/lorenzo0111.png"
                width={30}
                height={30}
                className="rounded-full"
                alt="lorenzo0111"
              />
              <Image
                src="/lorenzo0111.png"
                width={30}
                height={30}
                className="rounded-full"
                alt="lorenzo0111"
              />
            </div>
            <Button role="primary" className="uppercase">
              Add new
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Notifications</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="card w-full p-4">
          <h1 className="font-bold">Version</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet. Et suscipit molestiae ut cumque commodi
            sit culpa explicabo. Est magnam incidunt eum dolorem veniam est
            impedit aliquid a error nostrum quo nemo eius sit animi asperiores
            sit iure inventore.
          </p>
          <div className="mt-6 flex gap-2">
            <Button role="primary">Check new version</Button>
            <Button role="secondary">v 1.0</Button>
          </div>
        </div>
        <Button role="secondary" className="uppercase">
          Remove server
        </Button>
      </div>
    </div>
  );
}
