"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { RoutePath } from "./RoutePath";

type DynamicPath = {
  slug?: string;
};

export const useNavigation = () => {
  const router = useRouter();

  return useMemo(() => {
    return {
      push: (path: RoutePath, dynamic?: DynamicPath) => {
        router.push(`${path}${parseSlug(dynamic)}`);
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
    };
  }, [router]);
};

const parseSlug = (dynamic?: DynamicPath) => {
  if (!dynamic || !dynamic.slug) {
    return ``;
  }
  if (dynamic.slug.startsWith("/")) {
    return dynamic.slug;
  }
  return `/${dynamic.slug}`;
};
