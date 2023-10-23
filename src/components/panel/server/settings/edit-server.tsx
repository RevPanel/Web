"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const permissionList: readonly {
  value: string;
  label: string;
}[] = [
  { value: "*", label: "[Danger] Administrator" },

  { value: "service.create", label: "Create Services" },
  { value: "service.delete", label: "Delete Services" },
  { value: "service.manage", label: "Manage Services Actions" },
  { value: "service.edit", label: "Edit Services" },
  { value: "service.files", label: "Access Services Files" },
  { value: "service.terminal", label: "Access Services Terminal" },

  { value: "server.files", label: "Access Server Files" },
  { value: "server.terminal", label: "Access Server Terminal" },
  { value: "server.tasks", label: "Access Server Task Manager" },
  { value: "server.logs", label: "Access Server Logs" },
];

export default function EditServer(server: {
  id: string;
  name: string;
  description: string | null;
  members: {
    user: {
      name: string;
      avatarUrl: string | null;
      username: string;
    };
    permissions: string[];
  }[];
}) {
  const router = useRouter();
  const [name, setName] = useState(server.name);
  const [description, setDescription] = useState(server.description || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<{
    username: string;
    permissions: string[];
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          axios
            .post(`/api/servers/${server.id}/info`, {
              name,
              description,
            })
            .catch((e) => setError(e.response.data.error))
            .then(() => setSuccess("Server information updated!"));
        }}
        className="card lg:w-1/2 xl:w-2/5"
      >
        <h1 className="text-2xl font-bold">Server Information</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-primary">{success}</p>}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Name</h1>
          <FormInput
            className="w-full !bg-background"
            placeholder="Name"
            bind={[name, setName]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Description</h1>
          <FormInput
            className="w-full !bg-background"
            placeholder="Description"
            bind={[description, setDescription]}
          />
        </div>
        <Button type="submit" role="primary" className="mt-auto">
          Save
        </Button>
      </form>

      <div className="card lg:w-1/2 xl:w-3/5">
        <h1 className="text-2xl font-extrabold">Manage Collaborators</h1>
        <div className="flex max-h-[12rem] flex-col gap-2 overflow-y-auto">
          {server.members.map((member) => (
            <div key={member.user.username} className="flex items-center gap-4">
              <button
                onClick={() => {
                  setEditing({
                    username: member.user.username,
                    permissions: member.permissions,
                  });
                  onOpen();
                }}
                className="flex w-full items-center gap-4 rounded-xl bg-background px-4 py-2"
              >
                <Image
                  src={member.user.avatarUrl || "/logo.png"}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="avatar"
                />

                {member.user.username}
              </button>
              <button
                onClick={() => {
                  axios
                    .delete(
                      `/api/servers/${server.id}/members?user=${member.user.username}`
                    )
                    .then(() => router.refresh());
                }}
                className="transition-all hover:text-primary"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            onOpen();
          }}
          role="primary"
          className="mt-auto"
        >
          Add Collaborator
        </Button>
      </div>

      <InviteModal
        isOpen={isOpen}
        onClose={onClose}
        server={server.id}
        editing={editing}
      />
    </div>
  );
}

function InviteModal({
  isOpen,
  onClose,
  server,
  editing,
}: {
  isOpen: boolean;
  onClose: () => void;
  server: string;
  editing: {
    username: string;
    permissions: string[];
  } | null;
}) {
  const [username, setUsername] = useState(editing?.username || "");
  const [permissions, setPermissions] = useState<
    readonly {
      value: string;
      label: string;
    }[]
  >(
    editing?.permissions.map(
      (p) => permissionList.find((perm) => perm.value === p)!
    ) || []
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editing) {
      setUsername(editing.username);
      setPermissions(
        editing.permissions.map(
          (p) => permissionList.find((perm) => perm.value === p)!
        )
      );
    }
  }, [editing]);

  return (
    <Modal title="Add/Manage Collaborator" isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setError("");
          setSuccess("");

          axios
            .post(`/api/servers/${server}/members`, {
              username,
              permissions: permissions.map((p) => p.value),
            })
            .then(() => setSuccess("Collaborator added!"))
            .catch((e) => setError(e.response.data.error));
        }}
        className="mt-4 flex flex-col gap-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-primary">{success}</p>}
        <FormInput
          required
          className="w-full !bg-background"
          placeholder="Username"
          bind={[username, setUsername]}
        />
        <Select
          instanceId="member-add"
          isMulti
          classNames={{
            control: () => "!bg-background !border-none py-2 !rounded-xl",
            input: () => "!text-white",
            option: (state) =>
              state.isFocused || state.isSelected
                ? "!bg-primary"
                : "!bg-background",
            multiValue: () => "!bg-primary",
            menu: () => "!bg-background",
            singleValue: () => "!text-white",
          }}
          options={permissionList}
          value={permissions}
          onChange={(e) => setPermissions(e)}
        />
        <p>
          You can learn more about user permissions by{" "}
          <Link href="https://docs.revpanel.io/servers/users">
            clicking here
          </Link>
          .
        </p>
        <Button type="submit" role="primary" className="mt-auto">
          Add Collaborator
        </Button>
      </form>
    </Modal>
  );
}
