import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <Image src="/icon.svg" alt="icon" width={50} height={50} />
      <p className="text-2xl font-extrabold">Atheria Panel</p>
    </div>
  );
}
