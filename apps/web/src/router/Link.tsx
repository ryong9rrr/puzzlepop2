import NextLink from "next/link";

import { RoutePath, PushOptions } from "./RoutePath";
import { makePath } from "./utils";

interface Props extends Omit<React.ComponentProps<typeof NextLink>, "href"> {
  href: RoutePath;
  options?: PushOptions;
}

export const Link = (props: Props) => {
  const { href, options, ...rest } = props;

  const path = makePath({
    path: href,
    slug: options?.slug,
    query: options?.query,
  });

  return <NextLink href={path} {...rest} />;
};
