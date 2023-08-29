import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;

  return (
    <button
      className={
        "bg-gradient text-white px-4 py-2 rounded-md min-w-[20rem] " +
        (className || "")
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
  }
) {
  const { className, ...rest } = props;

  return (
    <Link
      className={
        "bg-gradient text-white px-4 py-2 rounded-md w-fit min-w-[20rem] block " +
        (className || "")
      }
      {...rest}
    >
      {props.children}
    </Link>
  );
}
