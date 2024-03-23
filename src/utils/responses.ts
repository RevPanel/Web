import { NextResponse } from "next/server";

export function error(message: string, status: number) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
