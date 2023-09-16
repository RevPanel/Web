import * as React from "react";

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" {...props}>
      <path
        d="M12.5 14.063a7.033 7.033 0 007.031-7.032A7.033 7.033 0 0012.5 0a7.033 7.033 0 00-7.031 7.031 7.033 7.033 0 007.031 7.032zm6.25 1.562h-2.69a8.51 8.51 0 01-7.12 0H6.25A6.25 6.25 0 000 21.875v.781A2.344 2.344 0 002.344 25h20.312A2.344 2.344 0 0025 22.656v-.781a6.25 6.25 0 00-6.25-6.25z"
        fill="url(#prefix__paint0_linear_134_394)"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_134_394"
          x1={0}
          y1={12.5}
          x2={25}
          y2={12.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C082FF" />
          <stop offset={1} stopColor="#7967FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const UserIcon = React.memo(User);
export default UserIcon;
