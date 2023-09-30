import { InputHTMLAttributes } from "react";

export default function FormInput(
  props: InputHTMLAttributes<HTMLInputElement> & {
    bind?: [string, (value: string) => void];
  }
) {
  const { className, bind, ...rest } = props;

  return (
    <input
      className={
        "block w-fit min-w-[20rem] rounded-xl bg-background-secondary px-4 py-2 text-white " +
        (className || "")
      }
      value={bind ? bind[0] : undefined}
      onChange={(e) => {
        bind && bind[1](e.target.value);
      }}
      {...rest}
    >
      {props.children}
    </input>
  );
}
