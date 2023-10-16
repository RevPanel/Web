"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import Port from "@/components/panel/server/network/port";
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
            <h1 className="text-3xl font-extrabold">Open Ports</h1>
            <p>Click a port to manage it</p>
          </div>

          <Button onClick={onOpen} role="primary" className="!px-16 uppercase">
            Create new
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {container?.ports.map((port: any) => (
            <Port
              className="w-full bg-background-secondary"
              key={port.id}
              name={port.name}
              port={port.publicPort}
            />
          ))}
        </div>
      </div>

      <NewPortModal
        isOpen={isOpen}
        onClose={onClose}
        submit={(name, internal, publicPort) => {
          axios
            .put(`/api/servers/${server}/containers/${service}/ports`, {
              name,
              containerPort: internal,
              publicPort,
            })
            .then(() => mutate());
        }}
      />
    </div>
  );
}

function NewPortModal({
  isOpen,
  onClose,
  submit,
}: {
  isOpen: boolean;
  onClose: () => void;
  submit: (name: string, internalPort: number, publicPort: number) => void;
}) {
  const [name, setName] = useState("");
  const [internalPort, setInternalPort] = useState("");
  const [publicPort, setPublicPort] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a new port">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose();

          submit(name, parseInt(internalPort), parseInt(publicPort));
        }}
        className="mt-4 flex w-full flex-col gap-2"
      >
        <FormInput
          type="text"
          name="name"
          placeholder="Enter a name for this port"
          className="w-full !bg-background !py-4"
          bind={[name, setName]}
          required
        />
        <FormInput
          type="number"
          name="name"
          placeholder="Internal Port"
          className="w-full !bg-background !py-4"
          bind={[internalPort, setInternalPort]}
          required
        />
        <FormInput
          type="number"
          name="name"
          placeholder="Public Port"
          className="w-full !bg-background !py-4"
          bind={[publicPort, setPublicPort]}
          required
        />
        <Button role="primary" className="!px-16" type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}
