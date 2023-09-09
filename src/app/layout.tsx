import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: "bg-gradient text-white",
          footerActionLink: "text-secondary",
          card: "bg-background-secondary",
          formFieldInput: "bg-background",
          userButtonAvatarBox: "rounded-xl w-14 h-14",
          userButtonTrigger: "rounded-xl",
          userButtonTrigger__open: "rounded-xl",
        },
      }}
    >
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
    </ClerkProvider>
  );
}
