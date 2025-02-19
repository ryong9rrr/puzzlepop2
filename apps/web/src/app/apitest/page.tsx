"use client";

import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

export default function Page() {
  return (
    <Flex gapScale={1} direction="column">
      <Text size="xl">각종 API 테스트 페이지</Text>
      <Flex>
        <Button size="sm">이미지파일 업로드</Button>
      </Flex>
    </Flex>
  );
}
