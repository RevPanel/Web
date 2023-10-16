import { Button } from "@/components/button";
import FormInput from "@/components/input";
import PackageCard from "@/components/panel/server/package";
import prisma from "@/lib/prisma";
import { ImageInfo } from "@/types/service";

async function getPackages(search?: string): Promise<ImageInfo[]> {
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
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return images;
}

export default async function Page({
  searchParams: { search },
}: {
  searchParams: {
    search?: string;
  };
}) {
  const packages = await getPackages(search);

  return (
    <div>
      <form method="GET" className="flex justify-center gap-4 lg:justify-start">
        <FormInput
          name="search"
          id="search"
          placeholder="Search a package"
          className="h-full !w-1/2 !p-4 !pl-6"
          defaultValue={search}
        />
        <Button type="submit" role="primary" className="!p-4 !px-8 font-medium">
          Search
        </Button>
      </form>
      <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
        {packages.splice(0, 10).map((pack) => (
          <PackageCard key={pack.id} {...pack} />
        ))}
      </div>
    </div>
  );
}
