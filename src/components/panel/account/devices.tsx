"use client";

import { Button } from "@/components/button";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { useFetcher } from "@/hooks/fetcher";
import axios from "axios";

export function Device({
  id,
  name,
  status,
  ip,
  background,
  mutate,
}: {
  id: string;
  name: string;
  status: "idle" | "active" | "current";
  ip: string;
  background?: boolean;
  mutate: () => void;
}) {
  return (
    <div
      className={
        "flex h-32 flex-col rounded-xl p-4 " +
        (background ? "bg-background" : "bg-background-secondary")
      }
    >
      <div className="flex">
        <h2 className="mr-5 font-extrabold">{name}</h2>
        <p className="text-gradient ml-auto uppercase">
          {status === "current"
            ? "Current"
            : status === "active"
            ? "Online"
            : "Offline"}
        </p>
      </div>
      <p>IP Address: {ip}</p>
      <button
        onClick={() => {
          axios.delete(`/api/auth/sessions?id=${id}`).then(() => mutate());
        }}
        className="text-gradient mx-auto mt-auto"
      >
        Disconnect
      </button>
    </div>
  );
}

export function Devices() {
  const { data: sessions, mutate } = useFetcher<
    {
      sessionId: string;
      name: string;
      state: "idle" | "active";
      address: string;
      current?: boolean;
    }[]
  >("/api/auth/sessions");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="my-4 flex h-32 flex-col flex-wrap gap-4 overflow-hidden md:flex-row">
        {sessions
          ?.slice(0, 3)
          .map((session) => (
            <Device
              id={session.sessionId}
              key={session.sessionId}
              name={session.name}
              status={session.current === true ? "current" : session.state}
              ip={session.address}
              mutate={mutate}
            />
          ))}
      </div>
      <Button onClick={onOpen} role="primary" className="mt-auto w-full h-14">
        View More
      </Button>
      <Modal title="Device List" onClose={onClose} isOpen={isOpen}>
        <div className="mt-4 flex flex-col gap-4">
          {sessions?.map((session) => (
            <Device
              id={session.sessionId}
              key={session.sessionId}
              name={session.name}
              status={session.current === true ? "current" : session.state}
              ip={session.address}
              background
              mutate={mutate}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}
