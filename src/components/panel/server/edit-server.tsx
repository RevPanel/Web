"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Image from "next/image";
import { useState } from "react";

export default function EditServer(server: {
  name: string;
  description: string | null;
  members: {
    user: {
      username: string;
    };
  }[];
}) {
  const [name, setName] = useState(server.name);
  const [description, setDescription] = useState(server.description || "");

  return (
    <div className="flex flex-col gap-4 lg:w-1/2 xl:w-1/3">
      <div className="card w-full p-4">
        <h1 className="font-bold">{server.name}</h1>
        <p className="text-justify">{server.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Name</h1>
        <FormInput placeholder="Name" bind={[name, setName]} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Description</h1>
        <FormInput
          placeholder="Description"
          bind={[description, setDescription]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Manage Collaborators</h1>
        <p className="text-justify">
          Invite and manage collaborators for your server:
        </p>
        {server.members.map((member) => (
          <button
            key={member.user.username}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              width={32}
              height={32}
            />
            <p>{member.user.username}</p>
          </button>
        ))}

        <Button role="primary" className="uppercase">
          Add new
        </Button>
      </div>
    </div>
  );
}
