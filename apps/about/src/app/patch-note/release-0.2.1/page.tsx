import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

import { releases } from "@puzzlepop2/cdn";

import { PageLayout } from "../../PageLayout";
import { Main } from "../../Main";
import { Section, SubTitle, Descriptions, Description, SectionImage } from "../Note";

export default function Page() {
  return (
    <PageLayout>
      <Main>
        <Text bold>[공지] 클라이언트 0.2.1 업데이트 안내 (오류 수정)</Text>
        <Spacing scale={1} />

        <Flex direction="column" gapScale={3}>
          <Section>
            <SubTitle>동시에 같은 퍼즐을 잡을 때 발생했던 오류가 수정되었어요.</SubTitle>
            <Descriptions>
              <Description>1. 이제 여러 사람이 동시에 같은 퍼즐을 잡을 수 없어요.</Description>
              <Description>2. 누군가 잡은 퍼즐은 빨갛게 표시돼요.</Description>
            </Descriptions>

            <Spacing scale={1} />
            <SubTitle>수정 전</SubTitle>
            <SectionImage src={releases.release_0_2_1["prev"]} />

            <Spacing scale={1} />
            <SubTitle>수정 후</SubTitle>
            <SectionImage src={releases.release_0_2_1["after"]} />
          </Section>
        </Flex>
      </Main>
    </PageLayout>
  );
}
