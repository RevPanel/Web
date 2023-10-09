"use client";

import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const useFetcher = <T = any>(url: string | undefined) =>
  useSWR<T>(url, fetcher);
