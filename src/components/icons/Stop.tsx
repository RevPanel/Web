import { SVGProps, memo } from "react";

function Stop(
  props: SVGProps<SVGSVGElement> & {
    gradient?: boolean;
  }
) {
  return (
    <svg viewBox="0 0 32 31" fill="none" {...props}>
      <path
        d="M16 .53C7.161.53 0 7.27 0 15.587c0 8.319 7.161 15.06 16 15.06s16-6.741 16-15.06S24.839.53 16 .53zm6.194 19.916c0 .534-.465.971-1.033.971H10.84c-.568 0-1.033-.437-1.033-.971V10.73c0-.535.465-.972 1.033-.972H21.16c.568 0 1.032.437 1.032.972v9.715z"
        fill={
          props.gradient ? "url(#prefix__paint0_linear_5_297)" : "currentColor"
        }
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_5_297"
          x1={0}
          y1={15.588}
          x2={32}
          y2={15.588}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C082FF" />
          <stop offset={1} stopColor="#7967FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const StopIcon = memo(Stop);
export default StopIcon;
