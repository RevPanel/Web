"use client";

import { Button } from "@/components/button";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { useFetcher } from "@/hooks/fetcher";

export function Device({
  name,
  status,
  ip,
  background,
}: {
  name: string;
  status: "idle" | "active";
  ip: string;
  background?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col rounded-xl p-4 " +
        (background ? "bg-background" : "bg-background-secondary")
      }
    >
      <div className="flex">
        <h2 className="font-extrabold">{name}</h2>
        <p className="text-gradient ml-auto uppercase">
          {status ? "Online" : "Offline"}
        </p>
      </div>
      <p>IP Address: {ip}</p>
      <button className="text-gradient mx-auto mt-auto">Disconnect</button>
    </div>
  );
}

export function Devices() {
  const { data: sessions } = useFetcher<
    {
      sessionId: string;
      name: string;
      state: "idle" | "active";
      address: string;
    }[]
  >("/api/auth/sessions");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="my-4 flex h-full flex-col gap-4 md:flex-row">
        {sessions
          ?.slice(0, 3)
          .map((session) => (
            <Device
              key={session.sessionId}
              name={session.name}
              status={session.state}
              ip={session.address}
            />
          ))}
      </div>
      <Button onClick={onOpen} role="primary" className="mt-auto w-full">
        View More
      </Button>
      <Modal title="Device List" onClose={onClose} isOpen={isOpen}>
        <div className="mt-4 flex flex-col gap-4">
          {sessions?.map((session) => (
            <Device
              key={session.sessionId}
              name={session.name}
              status={session.state}
              ip={session.address}
              background
            />
          ))}
        </div>
      </Modal>
    </>
  );
}
