"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { PlausibleEvents } from "@/types/plausible";
import { default as axios } from "axios";
import { usePlausible } from "next-plausible";
import Link from "next/link";
import { useState } from "react";

export default function CreateServer() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ip, setIp] = useState("");
  const [command, setCommand] = useState("");
  const [error, setError] = useState("");
  const plausible = usePlausible<PlausibleEvents>();

  return (
    <>
      <Button
        onClick={onOpen}
        role="primary"
        className="mb-4 ml-auto px-20 py-4 font-extrabold uppercase"
      >
        Add new machine
      </Button>
      <Modal title="Add a new machine" isOpen={isOpen} onClose={onClose}>
        {!command && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const { data } = await axios.post("/api/servers/create", {
                  name,
                  description,
                  ip,
                });

                plausible("serverCreate");
                setCommand(data.command);
              } catch (e: any) {
                setError(e.response.data.message);
              }
            }}
            className="mt-2 flex w-full flex-col gap-2"
          >
            {error && <p className="text-red-500">{error}</p>}
            <FormInput
              type="text"
              placeholder="Name"
              className="w-full !bg-background"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              type="text"
              placeholder="Description"
              className="w-full !bg-background"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormInput
              type="text"
              placeholder="IP Address"
              className="w-full !bg-background"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <p>
              Please refer to our{" "}
              <Link href="https://docs.revpanel.io/installation">
                documentation
              </Link>{" "}
              before proceeding.
            </p>
            <Button type="submit" role="primary" className="mt-2 w-full">
              Add machine
            </Button>
          </form>
        )}
        {command && (
          <div>
            <p className="text-xl font-bold">
              You are 1 command away from the success!
            </p>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(command);
              }}
              role="secondary"
              className="my-2"
            >
              {command}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
