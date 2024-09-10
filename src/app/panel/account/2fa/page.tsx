import { getUser } from "@/components/auth";
import { Button } from "@/components/button";
import Form from "@/components/form";
import FormInput from "@/components/input";
import { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { encodeHex } from "oslo/encoding";
import { createTOTPKeyURI } from "oslo/otp";

async function generate(user: User) {
  const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));
  const uri = createTOTPKeyURI("RevPanel", user.email, twoFactorSecret);

  return {
    secret: encodeHex(twoFactorSecret),
    uri,
    qr: `https://quickchart.io/qr?text=${encodeURIComponent(uri)}`,
  };
}

export default async function Page() {
  const session = await getUser();
  if (!session) return notFound();

  if (session?.user.twoFactorEnabled) {
    return (
      <div className="m-auto flex flex-col items-center justify-center">
        <h1 className="text-2xl font-extrabold">2fa is already enabled</h1>
      </div>
    );
  }

  const secret = await generate(session.user);

  return (
    <div className="m-auto flex w-1/3 flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-3xl font-extrabold">Setup your security!</h1>
      <p>Setup your two factor authentication by scanning the qrcode below.</p>
      <Image
        src={secret.qr}
        width={200}
        height={200}
        alt="2fa QR code"
        className="rounded-xl"
      />
      <div>
        <p>{secret.secret}</p>
        <Link href={secret.uri} className="text-tertiary">
          [Click to open]
        </Link>
      </div>
      <Form action="/api/auth/2fa/setup">
        <input
          type="password"
          name="secret"
          id="secret"
          hidden
          className="hidden"
          value={secret.secret}
          readOnly
        />
        <div className="flex w-full">
          <FormInput
            type="text"
            name="code"
            id="code"
            placeholder="Enter the code from your app"
            className="rounded-r-none"
          />
          <Button type="submit" role="primary" className="rounded-l-none">
            Verify
          </Button>
        </div>
      </Form>
    </div>
  );
}
