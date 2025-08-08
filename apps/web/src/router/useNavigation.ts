"use client";

import { useRouter, redirect, RedirectType } from "next/navigation";
import { useMemo } from "react";

import { RoutePath } from "./RoutePath";

type QueryRecord = {
  [key: string]: string;
};

type Options = {
  queryRecord?: QueryRecord;
};

export const useNavigation = () => {
  const router = useRouter();

  return useMemo(() => {
    return {
      push: (path: RoutePath, slug?: string, options?: Options) => {
        const nextPath = slug ? `${path}/${slug}` : path;
        router.push(`${nextPath}${makeQueryString(options)}`);
      },
      replace: (path: RoutePath) => {
        router.replace(path);
      },
      back: () => {
        router.back();
      },
      prefetch: (path: RoutePath) => {
        router.prefetch(path);
      },
      refresh: () => {
        router.refresh();
      },
      redirect: (path: RoutePath, slug?: string, type?: RedirectType) => {
        const nextPath = slug ? `${path}/${slug}` : path;
        redirect(nextPath, type);
      },
    };
  }, [router]);
};

const makeQueryString = (options?: Options) => {
  if (!options || !options.queryRecord) {
    return "";
  }
  const queries = Object.entries(options.queryRecord).map(([key, value]) => `${key}=${value}`);
  return `?${queries.join("&")}`;
};
