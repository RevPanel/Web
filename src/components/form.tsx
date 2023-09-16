"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = ({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action: string;
  className?: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
      }}
    >
      {error && <p className="text-red-500 text-left">{error}</p>}
      {children}
    </form>
  );
};

export default Form;
