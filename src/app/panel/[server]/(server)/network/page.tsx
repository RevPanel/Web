import NetworkManager from "@/components/panel/server/network/network-manager";

export default function NetworkManagerPage({
  params: { server },
}: {
  params: {
    server: string;
  };
}) {
  return <NetworkManager server={server} />;
}
