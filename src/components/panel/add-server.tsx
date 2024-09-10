"use client";

import useDisclosure from "@/hooks/disclosure";
import { Button } from "../button";
import FormInput from "../input";
import Modal from "../modal";

export default function AddServer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button className="ml-auto w-1/4" role="primary" onClick={onOpen}>
        Add server
      </Button>

      <Modal title="Add server" isOpen={isOpen} onClose={onClose}>
        <p className="text-tertiary">
          Run the following command to setup the panel
        </p>
        <FormInput
          readOnly
          className="w-full !bg-background"
          value="curl -fsSL https://revpanel.io/api/installer | sudo bash"
        />
      </Modal>
    </>
  );
}
