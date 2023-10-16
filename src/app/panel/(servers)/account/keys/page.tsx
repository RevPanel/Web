"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import { useFetcher } from "@/hooks/fetcher";
import { faKey, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ApiKey } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

function CreateKey({ mutate }: { mutate: any }) {
  const [description, setDescription] = useState("");
  const [ips, setIps] = useState("");
  const [key, setKey] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        axios
          .post("/api/keys", {
            description,
            ips: ips.length > 0 ? ips.split("\n") : undefined,
          })
          .then((res) => {
            setKey(res.data.key);
            mutate();
          });
      }}
      className="flex flex-col gap-4 rounded-xl bg-background-secondary p-4 lg:w-1/2"
    >
      <h1 className="text-3xl font-extrabold uppercase">Create api key</h1>
      {key && (
        <button
          type="button"
          onClick={() => {
            window.navigator.clipboard.writeText(key);
          }}
          className="w-full rounded-xl bg-background"
        >
          <p className="p-4 font-medium">
            The key has been created successfully: {key}
          </p>
        </button>
      )}
      <FormInput
        required
        name="description"
        id="description"
        placeholder="Description"
        className="w-full !bg-background !p-4 !pl-6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        className="rounded-x daisy-textarea resize-none p-2 pl-6 text-base"
        placeholder="Allowed IPs"
        value={ips}
        onChange={(e) => setIps(e.target.value)}
        rows={5}
      />
      <Button
        type="submit"
        role="primary"
        className="mt-4 w-full !p-4 !px-8 font-medium"
      >
        Create
      </Button>
    </form>
  );
}

export default function Page() {
  const { data: keys, mutate } = useFetcher<ApiKey[]>("/api/keys");

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <CreateKey mutate={mutate} />
      <div className="flex flex-col gap-4 rounded-xl bg-background-secondary p-4 lg:w-1/2">
        <h1 className="text-3xl font-extrabold uppercase">Api keys</h1>
        {keys && keys.length > 0 ? (
          <div className="flex w-full flex-col gap-2">
            {keys.map((key, i) => (
              <div key={i} className="flex w-full items-center gap-2">
                <div className="flex w-full justify-between rounded-xl bg-background p-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faKey} />
                    <p>{key.description}</p>
                  </div>
                  <p>{key.key}</p>
                </div>
                <button
                  onClick={() => {
                    axios
                      .delete(`/api/keys/?id=${key.id}`)
                      .then(() => mutate());
                  }}
                  className="hover:text-primary"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No API keys exist for this account.</p>
        )}
      </div>
    </div>
  );
}
