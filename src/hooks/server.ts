import { useParams } from "next/navigation";

export default function useServer() {
  const params = useParams();

  return params.server as string;
}

