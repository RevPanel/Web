import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

config.autoAddCss = false;

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VPS Panel",
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
        {children}
      </body>
    </html>
  );
}
