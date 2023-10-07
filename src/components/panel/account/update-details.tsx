"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import axios from "axios";
import { useState } from "react";

export default function UpdateDetails({
  defaultName,
  defaultEmail,
}: {
  defaultName: string;
  defaultEmail: string;
}) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        axios
          .post("/api/auth/update", {
            name,
            email,
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      }}
      className="w-full"
    >
      {error && <p className="text-red-500">{error}</p>}
      <FormInput
        required
        name="name"
        id="name"
        placeholder="Name"
        className="w-full !p-4 !pl-6"
        bind={[name, setName]}
      />
      <FormInput
        required
        name="email"
        id="email"
        placeholder="Email*"
        className="mt-4 w-full !p-4 !pl-6"
        bind={[email, setEmail]}
      />
      <Button
        type="submit"
        role="primary"
        className="mt-4 w-full !p-4 !px-8 font-medium"
      >
        Save details
      </Button>
      <p className="text-gradient mt-2">
        * Editing the email requires an additional confirmation
      </p>
    </form>
  );
}
