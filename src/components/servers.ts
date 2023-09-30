import axios from "axios";
import useSWR from "swr";

export function useServerName(id: string) {
  const { data } = useSWR(
    id ? `/api/servers/info/${id}` : null,
    async (url?: string) => {
      if (!url) return null;
      const { data } = await axios.get(url);
      return data;
    },
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  );

  return data?.name;
}

export function useServiceName(server: string, id?: string) {
  const { data } = useSWR(
    id ? `/api/servers/${server}/containers/${id}` : null,
    async (url?: string) => {
      if (!url) return null;

      const { data } = await axios.get(url);
      return data;
    },
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  );

  return data?.name;
}
