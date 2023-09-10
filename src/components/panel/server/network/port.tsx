export default function Port({ className }: { className?: string }) {
  return (
    <div
      className={
        "flex items-center gap-4 rounded-xl bg-background p-4 text-tertiary " +
        (className || "")
      }
    >
      <p>Minecraft</p>
      <p>(25565)</p>
      <p className="text-gradient ml-auto">Open</p>
    </div>
  );
}
