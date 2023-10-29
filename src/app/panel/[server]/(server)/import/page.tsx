import Form from "@/components/form";
import FormInput from "@/components/input";
import { Range } from "../add/page";
import { Button } from "@/components/button";

export default function Page({ params }: { params: { server: string } }) {
  return (
    <Form
      action={`/api/servers/${params.server}/containers/import`}
      className="m-auto flex flex-col gap-2"
      type="json"
    >
      <h1 className="text-center text-4xl font-extrabold">Import a service</h1>

      <FormInput
        name="provider"
        id="provider"
        value="github"
        readOnly
        hidden
        className="hidden"
      />

      <div className="flex gap-2">
        <FormInput name="owner" id="owner" placeholder="Repo Owner" />
        <FormInput name="repository" id="repository" placeholder="Repo Name" />
      </div>
      <div className="flex gap-2">
        <FormInput name="username" id="username" placeholder="Username" />
        <FormInput
          name="password"
          id="password"
          placeholder="Token"
          type="password"
        />
      </div>

      <div className="card flex w-full flex-row items-center justify-between">
        <h1 className="text-xl font-extrabold">Allocate memory</h1>
        <Range full name="Memory" options={[25, 50, 75, 100]} id="memory" />
      </div>
      <div className="card flex w-full flex-row items-center justify-between">
        <h1 className="text-xl font-extrabold">Allocate Disk</h1>
        <Range full name="Disk" options={[1, 5, 10, 15]} id="disk" />
      </div>

      <Button type="submit" role="primary">
        Import
      </Button>
    </Form>
  );
}
