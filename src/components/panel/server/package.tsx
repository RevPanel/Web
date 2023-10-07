"use client";

import { Button, LinkButton } from "@/components/button";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { ImageInfo } from "@/types/service";
import Link from "next/link";

export default function PackageCard(props: ImageInfo) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="card h-64 w-80 text-center">
      <h1 className="text-2xl font-bold">{props.name}</h1>
      <p className="text-justify">{props.description}</p>

      <div className="mt-auto flex w-full gap-2">
        <LinkButton
          href={`./add?image=${props.id}`}
          role="primary"
          className="mt-auto w-full"
        >
          Create
        </LinkButton>
        <Button onClick={onOpen} role="secondary" className="w-full uppercase">
          Info
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="card w-96">
          <h1 className="text-2xl font-bold">
            {props.name}{" "}
            <Link href={props.homepage || "#"}>[{props.version}]</Link>
          </h1>
          <p className="text-justify">{props.description}</p>
          <p className="text-left text-xl font-bold">Ports:</p>
          <ul className="list-inside list-disc text-left">
            {props.ports.map((port) => (
              <li key={port.id}>
                {port.containerPort}: {port.name}
              </li>
            ))}
          </ul>
          <LinkButton
            href={`./add?image=${props.id}`}
            role="primary"
            className="mt-auto w-full"
          >
            Create
          </LinkButton>
        </div>
      </Modal>
    </div>
  );
}
