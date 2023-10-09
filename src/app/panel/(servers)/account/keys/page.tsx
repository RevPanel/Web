import { Button } from "@/components/button";
import FormInput from "@/components/input";

function CreateKey() {
  return (
    <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-background-secondary p-4">
      <h1 className="text-3xl font-extrabold uppercase">Create api key</h1>
      <FormInput
        required
        name="description"
        id="description"
        placeholder="Description"
        className="w-full !bg-background !p-4 !pl-6"
      />
      <textarea className="daisy-textarea" placeholder="Allowed IPs"></textarea>
      <Button role="primary" className="mt-4 w-full !p-4 !px-8 font-medium">
        Create
      </Button>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex w-full gap-4">
      <CreateKey />
      <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-background-secondary p-4">
        <h1 className="text-3xl font-extrabold uppercase">Api keys</h1>
        <p>No API keys exist for this account.</p>
      </div>
    </div>
  );
}
