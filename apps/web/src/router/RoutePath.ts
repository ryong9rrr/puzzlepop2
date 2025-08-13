import { RedirectType } from "next/navigation";

export type RoutePath = "/" | "/practice/game" | "/multi" | "/multi/cooperation" | "/multi/battle";

export type PushOptions = {
  slug?: string;
  query?: Record<string, string>;
};

export type RedirectOptions = {
  type?: RedirectType;
  slug?: string;
  query?: Record<string, string>;
};
