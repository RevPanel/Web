import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ProgressWrapper from "@/components/progress-wrapper";
import PlausibleProvider from "next-plausible";

config.autoAddCss = false;

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevPanel",
  description:
    "RevPanel is a dashboard that allows users to easily manage their servers without any system administration knowledge.",
  themeColor: "#C082FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain="revpanel.io"
          customDomain="https://stats.revpanel.io"
        />
      </head>
      <body
        className={
          font.className +
          " flex min-h-screen flex-col items-center bg-background text-white"
        }
      >
        <ProgressWrapper />
        {children}
      </body>
    </html>
  );
}
