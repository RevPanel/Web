import { Button } from "@/components/button";
import FormInput from "@/components/input";
import PackageCard from "@/components/panel/server/package";
import prisma from "@/lib/prisma";
import { ImageInfo } from "@/types/service";

async function getPackages(): Promise<ImageInfo[]> {
  const images = await prisma.imageConfiguration.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      version: true,
      homepage: true,
      createdAt: true,
      dockerImage: true,
      ports: true,
    },
  });

  return images;
}

export default async function Page() {
  const packages = await getPackages();

  return (
    <div>
      <div className="flex gap-4">
        <FormInput
          name="search"
          id="search"
          placeholder="Search a package"
          className="h-full !w-1/2 !p-4 !pl-6"
        />
        <Button role="primary" className="!p-4 !px-8 font-medium">
          Search
        </Button>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {packages.map((pack) => (
          <PackageCard key={pack.id} {...pack} />
        ))}
      </div>
    </div>
  );
}
