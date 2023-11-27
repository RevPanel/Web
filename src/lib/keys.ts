import prisma from "./prisma";

export async function keyOwner(key?: string, address?: string) {
  if (!key) return null;

  const k = await prisma.apiKey.findUnique({
    where: {
      key,
    },
    select: {
      ips: true,
      owner: {
        select: {
          id: true,
          admin: true,
        },
      },
    },
  });

  if (!k) {
    return null;
  }

  if (address && k.ips.length > 0 && !k.ips.includes(address)) {
    console.log("An unauthorized IP tried to use an api key.");
    return null;
  }

  return k.owner;
}
