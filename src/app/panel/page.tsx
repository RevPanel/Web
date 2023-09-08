"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button role="primary" onClick={() => onOpen()} className="m-auto">
        Add server
      </Button>
      <Modal title="Add server" isOpen={isOpen} onClose={() => onClose()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios.post("/api/servers/create", {
              name,
              ip,
              username,
              password,
            });
          }}
          className="flex w-full flex-col gap-1"
        >
          <label className="mt-4 text-white">Server name</label>
          <FormInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            type="text"
            placeholder="Server name"
          />
          <label className="text-white">Server IP</label>
          <FormInput
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full"
            type="text"
            placeholder="Server IP"
          />
          <label className="text-white">Server Credentials</label>
          <div className="flex w-full gap-4">
            <FormInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              type="text"
              placeholder="Username"
            />
            <FormInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button role="primary" type="submit" className="mt-4">
            Add server
          </Button>
        </form>
      </Modal>
    </div>
  );
}
