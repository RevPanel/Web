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
        "block w-fit min-w-[10rem] rounded-xl bg-background-secondary px-4 py-2 text-white daisy-input xl:min-w-[20rem] " +
        (className || "")
      }
      value={bind ? bind[0] : undefined}
      onChange={
        bind
          ? (e) => {
              bind[1](e.target.value);
            }
          : undefined
      }
      {...rest}
    >
      {props.children}
    </input>
  );
}
