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
  title: "Atheria Panel",
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
        },
      }}
    >
      <html lang="en">
        <body
          className={
            font.className +
            " bg-background text-white flex min-h-screen flex-col items-center"
          }
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
