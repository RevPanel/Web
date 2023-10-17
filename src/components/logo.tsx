import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="text-2xl font-extrabold text-white">
        RevPanel
      </Link>
    </div>
  );
}
