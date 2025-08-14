"use client";

import { useMemo } from "react";
import { useRouter, redirect } from "next/navigation";

import { RoutePath, PushOptions, RedirectOptions } from "./RoutePath";
import { makePath } from "./utils";

export const useSafeRouter = () => {
  const router = useRouter();

  return useMemo(() => {
    return {
      push: (path: RoutePath, options?: PushOptions) => {
        const nextPath = makePath({
          path,
          slug: options?.slug,
          query: options?.query,
        });

        router.push(nextPath);
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
      redirect: (path: RoutePath, options?: RedirectOptions) => {
        const nextPath = makePath({
          path,
          slug: options?.slug,
          query: options?.query,
        });

        redirect(nextPath, options?.type);
      },
    };
  }, [router]);
};
