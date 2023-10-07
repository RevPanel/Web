export default function Devices({
  name,
  status,
  location,
  ip,
}: {
  name: string;
  status: boolean;
  location: string;
  ip: string;
}) {
  return (
    <div className="md:w-1/3 rounded-xl bg-background-secondary p-4">
      <div className="flex">
        <h2 className="font-extrabold">{name}</h2>
        <p className="text-gradient ml-auto uppercase">
          {status ? "Online" : "Offline"}
        </p>
      </div>
      <p>Location: {location}</p>
      <p>IP Address: {ip}</p>
      <button className="text-gradient mx-auto">Disconnect</button>
    </div>
  );
}
