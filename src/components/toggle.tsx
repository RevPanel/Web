import { InputHTMLAttributes } from "react";

export default function Toggle(props: InputHTMLAttributes<HTMLInputElement>) {
  const { type, ...rest } = props;

  return (
    <label className="switch">
      <input type="checkbox" {...rest} />
      <span className="slider round"></span>
    </label>
  );
}
