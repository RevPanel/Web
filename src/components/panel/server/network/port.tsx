export default function Port({
  className,
  name,
  port,
}: {
  className?: string;
  name: string;
  port: number;
}) {
  return (
    <div
      className={
        "flex min-h-[5.25rem] items-center gap-4 rounded-xl bg-background p-4 text-tertiary " +
        (className || "")
      }
    >
      <p>{name}</p>
      <p>({port})</p>
      <p className="text-gradient ml-auto">Open</p>
    </div>
  );
}
