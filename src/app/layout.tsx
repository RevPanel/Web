import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
            inter.className +
            " bg-background text-white flex min-h-screen flex-col items-center"
          }
        >
          <Image
            src="/blur.svg"
            alt="blur"
            className="absolute top-0 left-0 w-full h-full -z-10"
            draggable={false}
            width={100}
            height={100}
            placeholder="empty"
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
