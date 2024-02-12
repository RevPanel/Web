import { getUser } from "@/components/auth";
import { Button } from "@/components/button";
import FormInput from "@/components/input";
import prisma from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

export default async function ActivatePage({
  searchParams: { appUrl },
}: {
  searchParams: {
    appUrl: string;
  };
}) {
  const session = await getUser();
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="m-auto">
      <h1 className="mb-2 text-center text-3xl font-extrabold">
        Activate your panel
      </h1>

      <form
        action={async (data) => {
          "use server";

          const name = data.get("name");
          if (!name || typeof name !== "string" || !appUrl) {
            return;
          }

          const serverToken = generateId(32);

          try {
            await prisma.server.create({
              data: {
                name: name,
                url: appUrl,
                ownerId: session.user.id,
                token: serverToken,
              },
            });
          } catch (e) {}

          redirect(appUrl + `/api/activate/success?token=${serverToken}`);
        }}
        className="m-auto flex flex-col gap-4"
      >
        <FormInput
          className="!bg-background-secondary"
          placeholder="Friendly Name"
          required
          name="name"
        />
        <div>
          <FormInput
            className="!bg-background-secondary"
            placeholder="Server URL"
            value={appUrl}
            readOnly
          />
          <p className="text-tertiary">
            You can change this in your panel settings
          </p>
        </div>
        <Button role="primary" type="submit">
          Activate
        </Button>
      </form>
    </div>
  );
}
