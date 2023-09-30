import { SVGProps, memo } from "react";

function Restart(
  props: SVGProps<SVGSVGElement> & {
    gradient?: "true" | "false";
  }
) {
  return (
    <svg viewBox="0 0 32 31" fill="none" {...props}>
      <path
        d="M19 3.412c0 1.56-1.343 2.823-3 2.823s-3-1.264-3-2.823c0-1.56 1.343-2.824 3-2.824s3 1.264 3 2.824zm-3 21.647c-1.657 0-3 1.264-3 2.823 0 1.56 1.343 2.824 3 2.824s3-1.264 3-2.824c0-1.559-1.343-2.823-3-2.823zm13-12.235c-1.657 0-3 1.264-3 2.823 0 1.56 1.343 2.824 3 2.824s3-1.265 3-2.824c0-1.56-1.343-2.823-3-2.823zM6 15.647c0-1.56-1.343-2.823-3-2.823s-3 1.264-3 2.823c0 1.56 1.343 2.824 3 2.824s3-1.265 3-2.824zm.808 5.828c-1.657 0-3 1.264-3 2.824 0 1.56 1.343 2.823 3 2.823 1.656 0 3-1.264 3-2.823 0-1.56-1.344-2.824-3-2.824zm18.384 0c-1.657 0-3 1.264-3 2.824 0 1.56 1.343 2.823 3 2.823s3-1.264 3-2.823c0-1.56-1.343-2.824-3-2.824zM6.808 4.172c-1.657 0-3 1.264-3 2.823 0 1.56 1.343 2.824 3 2.824 1.656 0 3-1.264 3-2.824 0-1.559-1.344-2.823-3-2.823z"
        fill={
          props.gradient === "true" ? "url(#prefix__paint0_linear_5_301)" : "currentColor"
        }
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_5_301"
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

const RestartIcon = memo(Restart);
export default RestartIcon;
