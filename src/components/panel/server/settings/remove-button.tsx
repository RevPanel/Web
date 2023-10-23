"use client";

import { Button } from "@/components/button";
import axios from "axios";

export default function RemoveButton({ server }: { server: string }) {
  return (
    <Button
      onClick={() => {
        axios.post(`/api/servers/${server}/system/uninstall`);
      }}
      role="secondary"
      className="w-full uppercase"
    >
      Remove server
    </Button>
  );
}
