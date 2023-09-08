import { InputHTMLAttributes } from "react";

export default function FormInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const { className, ...rest } = props;

  return (
    <input
      className={
        "block w-fit min-w-[20rem] rounded-md border-2 border-primary bg-background px-4 py-2 text-white " +
        (className || "")
      }
      {...rest}
    >
      {props.children}
    </input>
  );
}
