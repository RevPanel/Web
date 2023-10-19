"use client";

import { Button } from "@/components/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PlanButton({ plan }: { plan: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        if (plan === "free") {
            router.push("/#pricing");
            return;
        }

        const { data } = await axios.get("/api/stripe/portal");
        router.push(data.url);
      }}
      role="primary"
      className="mt-auto w-1/2 !p-4 !px-8 text-center font-medium"
    >
      Change plan
    </Button>
  );
}
