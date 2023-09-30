import { useParams } from "next/navigation";

export default function useService() {
  const params = useParams();

  return params.service as string;
}
