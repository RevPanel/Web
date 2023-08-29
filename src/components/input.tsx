import { InputHTMLAttributes } from "react";

export default function FormInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const { className, ...rest } = props;

  return (
    <input
      className={
        "bg-background border-2 border-primary text-white px-4 py-2 rounded-md w-fit min-w-[20rem] block " +
        (className || "")
      }
      {...rest}
    >
      {props.children}
    </input>
  );
}
