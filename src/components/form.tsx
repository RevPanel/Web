"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = ({
  children,
  action,
  className,
  redirect,
  type = "form",
}: {
  children: React.ReactNode;
  action: string;
  className?: string;
  redirect?: string;
  type?: "form" | "json";
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <form
      action={action}
      method="post"
      className={className}
      onSubmit={async (e) => {
        e.preventDefault();
        let body;

        if (type === "json") {
          const formData = new FormData(e.target as HTMLFormElement);
          body = Object.fromEntries(formData.entries());
        } else {
          body = new FormData(e.currentTarget);
        }

        const response = await fetch(action, {
          method: "POST",
          body: type === "json" ? JSON.stringify(body) : (body as FormData),
          headers:
            type === "json"
              ? {
                  "Content-Type": "application/json",
                }
              : undefined,
          redirect: "manual",
        });

        if (response.status === 0) {
          return router.refresh();
        }

        const json = await response.json();
        if (json.error) {
          return setError(json.error);
        }

        if (json.message) {
          setSuccess(json.message);
        }

        if (redirect) {
          router.push(redirect);
        }
      }}
    >
      {error && <p className="text-left text-red-500">{error}</p>}
      {success && <p className="text-left text-primary">{success}</p>}
      {children}
    </form>
  );
};

export default Form;
