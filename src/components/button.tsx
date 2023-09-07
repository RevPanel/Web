import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonRole = "primary" | "secondary" | "white";

function genClasses(role: ButtonRole) {
  switch (role) {
    case "primary":
      return "bg-gradient";
    case "secondary":
      return "bg-[#27272A] border border-[#3F3F46]";
    case "white":
      return "bg-white text-black border border-[#3F3F46]";
  }
}

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    role: ButtonRole;
  }
) {
  const { className, ...rest } = props;
  const roleClass = genClasses(props.role);

  return (
    <button
      className={
        roleClass + " text-white px-4 py-2 rounded-md " + (className || "")
      }
      {...rest}
    >
      {props.children}
    </button>
  );
}

export function LinkButton(
  props: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    role: ButtonRole;
  }
) {
  const { className, ...rest } = props;
  const roleClass = genClasses(props.role);

  return (
    <Link
      className={
        roleClass + " text-white px-4 py-2 rounded-md " + (className || "")
      }
      {...rest}
    >
      {props.children}
    </Link>
  );
}
