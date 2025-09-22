import Image from "next/image";
import { PropsWithChildren } from "react";

import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

import { releases } from "@puzzlepop2/cdn";

import { PageLayout } from "./PageLayout";
import { Main } from "./Main";
import { FadeInViewport } from "./FadeInViewport";

export default function Page() {
  return (
    <PageLayout>
      <Main>
        <Spacing scale={1} />

        <Flex direction="column" justify="center" align="center" gapScale={5}>
          <FadeInViewport>
            <Section>
              <Text bold size="lg">
                온라인으로 함께 퍼즐을 맞춰보세요.
              </Text>
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["cooperation"]} />
            </Section>
          </FadeInViewport>

          <FadeInViewport>
            <Section>
              <Text bold size="lg">
                콤보로 더 빠르게 맞춰보세요.
              </Text>
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["combo"]} />
            </Section>
          </FadeInViewport>

          <FadeInViewport>
            <Section>
              <Text bold size="lg">
                최대 8명까지 지원해요.
              </Text>
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["create-room"]} />
            </Section>
          </FadeInViewport>

          <FadeInViewport>
            <Section>
              <Text bold size="lg">
                채팅으로 소통해요.
              </Text>
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["chat-waiting"]} />
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["chat-ingame"]} />
            </Section>
          </FadeInViewport>

          <FadeInViewport>
            <Section>
              <Text bold size="lg">
                URL로 초대해요.
              </Text>
              <Spacing scale={1} />
              <SectionImage src={releases.release_0_2_0["enter-room-url"]} />
            </Section>
          </FadeInViewport>
        </Flex>

        <Spacing scale={1} />
      </Main>
    </PageLayout>
  );
}

const Section = ({ children }: PropsWithChildren) => {
  return (
    <Flex as="section" direction="column" justify="center" align="center">
      {children}
    </Flex>
  );
};

const SectionImage = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt=""
      priority
      width={0}
      height={0}
      style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius: "0.4rem", flex: 1 }}
    />
  );
};
