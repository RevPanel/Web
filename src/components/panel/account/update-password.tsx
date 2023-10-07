import { Button } from "@/components/button";
import FormInput from "@/components/input";

export default function UpdatePassword() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold uppercase">
        Update your password
      </h1>
      <div className="flex w-full flex-col gap-4 mt-4">
        <FormInput
          required
          name="old-password"
          id="old-password"
          placeholder="Old password"
          className="w-full !p-4 !pl-6"
        />
        <FormInput
          required
          name="new-password"
          id="new-password"
          placeholder="New password"
          className="w-full !p-4 !pl-6"
        />
      </div>
      <Button role="primary" className="mt-4 w-full !p-4 !px-8 font-medium">
        Update password
      </Button>
    </div>
  );
}
