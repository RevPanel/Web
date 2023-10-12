"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = ({
  children,
  action,
  className,
  redirect,
}: {
  children: React.ReactNode;
  action: string;
  className?: string;
  redirect?: string;
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
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
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
