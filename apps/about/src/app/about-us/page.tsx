import Link from "next/link";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import { PageLayout } from "../PageLayout";
import { Main } from "../Main";

export default function Page() {
  return (
    <PageLayout>
      <Main>
        <Text bold>퍼즐팝 소개</Text>
        <Spacing scale={1} />
        <Flex direction="column" gapScale={0.5}>
          <Text size="xs">친구들과 온라인으로 퍼즐을 맞춰보세요!</Text>
        </Flex>

        <Spacing scale={2} />

        <Text size="sm" bold>
          2024 (시즌 1)
        </Text>
        <Spacing scale={0.6} />
        <Flex direction="column" gapScale={0.5}>
          <Text size="xs">
            🥇 SSAFY 10기 공통 프로젝트 우수상 | 용상윤, 나해란, 김다인, 이주연, 조시훈, 김한중
          </Text>
          <Flex gap={16} align="center">
            <Link
              href="https://github.com/ryong9rrr/puzzle-pop-fe"
              target="_blank"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}
            >
              <FaGithub />
              <Text size="xs">Github</Text>
            </Link>

            <Link
              href="https://www.youtube.com/watch?v=RBEFKkN09YA"
              target="_blank"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}
            >
              <FaYoutube color="red" />
              <Text size="xs">Youtube</Text>
            </Link>
          </Flex>
        </Flex>

        <Spacing scale={2} />

        <Text size="sm" bold>
          2025 (시즌 2)
        </Text>
        <Spacing scale={0.6} />
        <Flex direction="column" gapScale={0.5}>
          <Text size="xs">퍼즐팝 시즌 2 서비스 시작 | 용상윤</Text>
          <Flex gap={16} align="center">
            <Link
              href="https://github.com/ryong9rrr/puzzlepop2"
              target="_blank"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}
            >
              <FaGithub />
              <Text size="xs">Github</Text>
            </Link>
          </Flex>
        </Flex>
      </Main>
    </PageLayout>
  );
}
