"use client";

import axios, { AxiosProgressEvent } from "axios";
import useSWR from "swr";
import NProgress from "nprogress";

const processProgress = (progressEvent: AxiosProgressEvent) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }

  const percentCompleted = Math.round(
    (progressEvent.loaded * 100) / (progressEvent.total || 1)
  );

  NProgress.set(percentCompleted / 100);

  if (percentCompleted === 100) {
    setTimeout(() => {
      NProgress.done();
    }, 500);
  }
};

const axiosClient = axios.create({
  onUploadProgress: processProgress,
  onDownloadProgress: processProgress,
});

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);
const useFetcher = <T = any>(
  url: string | undefined,
  refreshInterval?: number
) =>
  useSWR<T>(url, fetcher, {
    refreshInterval,
  });

export { axiosClient, useFetcher };
