import { Button } from "@/components/button";
import FormInput from "@/components/input";

function PackageCard() {
  return (
    <div className="h-64 w-80 rounded-xl bg-background-secondary">
      <p>Package</p>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div className="flex gap-4">
        <FormInput
          name="search"
          id="search"
          placeholder="Search a package"
          className="!w-1/2 !p-4 !pl-6"
        />
        <Button role="primary" className="!p-4 !px-8 font-medium">
          Search
        </Button>
      </div>
      <div className="mt-8 flex gap-4">
        <PackageCard />
      </div>
    </div>
  );
}
