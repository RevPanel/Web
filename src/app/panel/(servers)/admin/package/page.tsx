import { getSession } from "@/components/auth";
import { Button } from "@/components/button";
import Form from "@/components/form";
import FormInput from "@/components/input";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user.admin) return notFound();

  return (
    <div className="m-auto">
      <h1 className="mb-2 text-center text-3xl font-extrabold">
        Create a new image
      </h1>
      <Form className="flex flex-col gap-2" action="/api/images">
        <div className="grid gap-2 md:grid-cols-2">
          <FormInput
            name="id"
            id="id"
            placeholder="Package ID"
            className="w-full"
          />
          <FormInput
            name="dockerImage"
            id="dockerImage"
            placeholder="Docker Image"
            className="w-full"
          />
          <FormInput
            name="name"
            id="name"
            placeholder="Package Name"
            className="w-full"
          />
          <FormInput
            name="description"
            id="description"
            placeholder="Package Description"
            className="w-full"
          />
          <FormInput
            name="version"
            id="version"
            placeholder="Package Version"
            className="w-full"
          />
          <FormInput
            name="homepage"
            id="homepage"
            placeholder="Package URL"
            className="w-full"
          />
          <FormInput
            name="mountPath"
            id="mountPath"
            placeholder="Mount Path"
            className="w-full"
          />
          <FormInput
            name="ports"
            id="ports"
            placeholder="NAME1:1234,NAME2:5678"
            className="w-full"
          />
          <FormInput
            name="environments"
            id="environments"
            placeholder="A,B"
            className="w-full"
          />

          <Button role="primary" type="submit" className="w-full">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
