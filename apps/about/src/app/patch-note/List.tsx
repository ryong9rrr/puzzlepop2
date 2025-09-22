import Link from "next/link";
import { PropsWithChildren } from "react";

import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import MODULE_CSS from "./List.module.css";

interface ListProps extends PropsWithChildren {
  href: string;
  date?: string;
}

export const List = (props: ListProps) => {
  const { href, children, date } = props;

  return (
    <Link href={href}>
      <Flex as="li" justify="space-between" align="center" className={MODULE_CSS.list}>
        <Text size="xs">{children}</Text>
        <Text size="xs" bold color={vars.colors.grey[600]}>
          {date}
        </Text>
      </Flex>
    </Link>
  );
};
