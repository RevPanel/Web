"use client";

import { useState } from "react";

export default function SidebarWrapper({
  sidebar,
}: {
  sidebar: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-10 flex min-h-screen min-w-[20rem] flex-col gap-2 bg-background-secondary md:static"
      style={{
        left: open ? "0" : "-100rem",
      }}
    >
      {sidebar}
      <button className="bg-gradient fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-xl p-4 text-3xl md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
