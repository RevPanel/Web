import type { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
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
