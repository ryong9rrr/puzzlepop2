import Link from "next/link";
import { PropsWithChildren } from "react";

import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import MODULE_CSS from "./List.module.css";
import { LottieNewLabel } from "./LottieNewLabel";

interface ListProps extends PropsWithChildren {
  href: string;
  date?: string;
}

export const List = (props: ListProps) => {
  const { href, children, date } = props;

  return (
    <Link href={href}>
      <Flex as="li" justify="space-between" align="center" className={MODULE_CSS.list}>
        <Flex justify="center" align="center" gap={8}>
          <Text size="xs">{children}</Text>
          {date && isNew(date) && <LottieNewLabel />}
        </Flex>
        <Text size="xs" bold color={vars.colors.grey[600]}>
          {date}
        </Text>
      </Flex>
    </Link>
  );
};

const isNew = (date: string) => {
  const PREV_MONTH = 3; // 3개월 이내면 new임
  const current = new Date();
  const prevMonthsAgo = new Date();
  prevMonthsAgo.setMonth(current.getMonth() - PREV_MONTH);
  const noteDate = new Date(date);
  return noteDate >= prevMonthsAgo;
};
