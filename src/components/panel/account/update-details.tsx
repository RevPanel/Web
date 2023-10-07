import { Button } from "@/components/button";
import FormInput from "@/components/input";

export default function UpdateDetails() {
  return (
    <div>
      <div className="flex gap-4">
        <FormInput
          required
          name="name"
          id="name"
          placeholder="Name"
          className="w-full !p-4 !pl-6"
        />
        <FormInput
          required
          name="username"
          id="username"
          placeholder="Username"
          className="w-full !p-4 !pl-6"
        />
      </div>
      <FormInput
        required
        name="email"
        id="email"
        placeholder="Email*"
        className="mt-4 w-full !p-4 !pl-6"
      />
      <Button role="primary" className="mt-4 !p-4 !px-8 font-medium w-full">
        Save details
      </Button>
      <p className="text-gradient mt-2">
        * Editing the email requires an additional confirmation
      </p>
    </div>
  );
}
