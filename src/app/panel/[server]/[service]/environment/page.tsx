"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { useFetcher } from "@/hooks/fetcher";
import axios from "axios";
import { useState } from "react";

export default function Ports({
  params: { server, service },
}: {
  params: {
    server: string;
    service: string;
  };
}) {
  const { data: container, mutate } = useFetcher(
    `/api/servers/${server}/containers/${service}`
  );
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Environment Variables</h1>
            <p>Click an env to manage it</p>
          </div>

          <Button onClick={onOpen} role="primary" className="!px-16 uppercase">
            Create new
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {container?.environments.map((env: any) => (
            <Env
              className="w-full bg-background-secondary"
              key={env.id}
              name={env.key}
              value={env.value}
            />
          ))}
        </div>
      </div>

      <NewEnvModal
        isOpen={isOpen}
        onClose={onClose}
        submit={(key, value) => {
          axios
            .post(`/api/servers/${server}/containers/${service}/env`, {
              key,
              value,
            })
            .then(() => mutate());
        }}
      />
    </div>
  );
}

function NewEnvModal({
  isOpen,
  onClose,
  submit,
}: {
  isOpen: boolean;
  onClose: () => void;
  submit: (key: string, value: string) => void;
}) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a new port">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose();

          submit(key, value);
        }}
        className="mt-4 flex w-full flex-col gap-2"
      >
        <FormInput
          type="text"
          name="key"
          placeholder="Key"
          className="w-full !bg-background !py-4"
          bind={[key, setKey]}
          required
        />
        <FormInput
          type="text"
          name="value"
          placeholder="Value"
          className="w-full !bg-background !py-4"
          bind={[value, setValue]}
          required
        />
        <Button role="primary" className="!px-16" type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

function Env({
  className,
  name,
  value,
}: {
  className?: string;
  name: string;
  value: string;
}) {
  return (
    <div
      className={
        "flex min-h-[5.25rem] items-center gap-4 rounded-xl bg-background p-4 text-tertiary " +
        (className || "")
      }
    >
      <p>
        {name}={value}
      </p>
    </div>
  );
}
