import { SVGProps, memo } from "react";

function Start(
  props: SVGProps<SVGSVGElement> & {
    gradient?: boolean;
  }
) {
  return (
    <svg viewBox="0 0 32 31" fill="none" {...props}>
      <path
        d="M30.315 13.215L5.172.975C3.129-.02 0 .945 0 3.404v24.475c0 2.206 2.907 3.535 5.172 2.43l25.143-12.235c2.243-1.088 2.25-3.77 0-4.859z"
        fill={
          props.gradient ? "url(#prefix__paint0_linear_5_296)" : "currentColor"
        }
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_5_296"
          x1={0}
          y1={15.647}
          x2={32}
          y2={15.647}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C082FF" />
          <stop offset={1} stopColor="#7967FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const StartIcon = memo(Start);
export default StartIcon;
