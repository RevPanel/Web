import * as React from "react";

function Plus(
  props: React.SVGProps<SVGSVGElement> & {
    gradient?: "true" | "false";
  }
) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M14 6.462v1.076H7.538V14H6.462V7.538H0V6.462h6.462V0h1.076v6.462H14z"
        fill={
          props.gradient === "true"
            ? "url(#prefix__paint0_linear_49_1051)"
            : "currentColor"
        }
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_49_1051"
          x1={0}
          y1={7}
          x2={14}
          y2={7}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C082FF" />
          <stop offset={1} stopColor="#7967FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const PlusIcon = React.memo(Plus);
export default PlusIcon;
