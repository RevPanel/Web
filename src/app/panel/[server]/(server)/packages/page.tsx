import { Button } from "@/components/button";
import FormInput from "@/components/input";

function PackageCard() {
  return (
    <div className="rounded-xl bg-background-secondary w-80 h-64">
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
      <div className="flex gap-4 mt-8">
        <PackageCard />
      </div>
    </div>
  );
}
