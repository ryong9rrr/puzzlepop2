import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

import { PageLayout } from "../PageLayout";
import { Main } from "../Main";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { vars } from "@puzzlepop2/themes";
import { List } from "./List";

export default function Page() {
  return (
    <PageLayout>
      <Main>
        <Text bold>패치노트</Text>
        <Spacing scale={1} />
        <Flex as="ul" direction="column">
          <List href="/patch-note/release-0.2.0" date="2025-08-08">
            클라이언트 0.2.0 업데이트 안내
          </List>
        </Flex>
      </Main>
    </PageLayout>
  );
}
