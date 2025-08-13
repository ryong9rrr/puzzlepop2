import { RoutePath } from "./RoutePath";

export const makePath = (params: {
  path: RoutePath;
  slug?: string;
  query?: Record<string, string>;
}) => {
  const { path, slug, query } = params;

  const queryString = query
    ? `?${Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`
    : "";

  if (slug) {
    return `${path}/${slug}${queryString}`;
  }
  return `${path}${queryString}`;
};
