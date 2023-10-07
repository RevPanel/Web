"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import axios from "axios";
import { useState } from "react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("/api/auth/password", {
            currentPassword,
            newPassword,
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      }}
      className="w-full xl:w-1/2"
    >
      <h1 className="w-fit text-3xl font-extrabold uppercase">
        Update your password
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4 flex w-full flex-col gap-4">
        <FormInput
          required
          type="password"
          name="current-password"
          id="current-password"
          placeholder="Current password"
          className="w-full !p-4 !pl-6"
          bind={[currentPassword, setCurrentPassword]}
        />
        <FormInput
          required
          type="password"
          name="new-password"
          id="new-password"
          placeholder="New password"
          className="w-full !p-4 !pl-6"
          bind={[newPassword, setNewPassword]}
        />
      </div>
      <Button
        type="submit"
        role="primary"
        className="mt-4 w-full !p-4 !px-8 font-medium"
      >
        Update password
      </Button>
    </form>
  );
}
