import type { Server } from "@prisma/client";
import { NextResponse } from "next/server";

export function error(message: string, status: number) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function removeKey(server: Server): ServerWithoutKey {
  const { key, ...rest } = server;
  return { ...rest };
}

export function removeKeys(server: Server[]): ServerWithoutKey[] {
  return server.map(removeKey);
}

export type ServerWithoutKey = Omit<Server, "key">;
