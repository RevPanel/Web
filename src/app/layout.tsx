import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ProgressWrapper from "@/components/progress-wrapper";

config.autoAddCss = false;

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevPanel",
  description: "The panel everyone can use",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
