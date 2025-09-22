import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

import { PageLayout } from "../../PageLayout";
import { Main } from "../../Main";
import { Section, SubTitle, Descriptions, Description, SectionImage } from "../Note";

export default function Page() {
  return (
    <PageLayout>
      <Main>
        <Text bold>클라이언트 0.2.0 업데이트 안내</Text>
        <Spacing scale={1} />

        <Flex direction="column" gapScale={3}>
          <Section>
            <SubTitle>1. 방을 생성할 수 있어요.</SubTitle>
            <SectionImage src="/release-0.2.0/create-room.gif" />
            <Descriptions>
              <Description>
                1. '방 만들기' 버튼을 누르면 '방 생성 모달'이 뜨며 방을 생성할 수 있어요. (비회원도
                생성 가능)
              </Description>
              <Description>
                2. 방 제목, 최대 인원 제한, 입장 닉네임을 설정하고 방을 생성해요. (유저편의성을 위해
                자동으로 방 제목과 입장 닉네임이 채워져요)
              </Description>
              <Description>3. ESC 버튼으로 '방 생성 모달'을 닫을 수 있어요.</Description>
            </Descriptions>
          </Section>

          <Section>
            <SubTitle>2. 생성한 게임 방의 URL을 통해 입장할 수 있어요.</SubTitle>
            <SectionImage src="/release-0.2.0/enter-room-url.gif" />
            <SectionImage src="/release-0.2.0/enter-room-block.gif" />
            <Descriptions>
              <Description>
                1. 유저편의성을 위해 생성한 게임 방의 URL을 통해 대기실에 입장할 수 있어요.
              </Description>
              <Description>2. 만약 이미 게임을 시작한 방이라면 입장할 수 없어요.</Description>
            </Descriptions>
          </Section>

          <Section>
            <SubTitle>3. 대기실에 입장한 뒤, 인게임으로 입장할 수 있어요.</SubTitle>
            <SectionImage src="/release-0.2.0/chat-waiting.gif" />
            <Descriptions>
              <Description>1. 입장한 유저들과 채팅을 할 수 있어요.</Description>
              <Description>2. 유저의 입장과 퇴장이 시스템 메시지로 보여져요.</Description>
              <Description>
                3. '방장'이 게임시작을 누르면 5초 카운트 뒤 인게임 뷰로 이동해요.
              </Description>
            </Descriptions>
          </Section>

          <Section>
            <SubTitle>
              4. 함께 퍼즐을 맞출 수 있어요. 퍼즐을 빠르게 맞추면 '콤보'가 발동해요.
            </SubTitle>
            <SectionImage src="/release-0.2.0/ingame.gif" />
            <Descriptions>
              <Description>
                1. 타이머, 가이드그림, 퍼센티지바를 끌 수 있어요. (아이패드 미니의 경우, 화면 크기가
                캔버스 크기와 거의 비슷해서 유저편의성을 위해 구현했어요)
              </Description>
              <Description>2. 다른 유저들과 함께 퍼즐을 맞출 수 있어요.</Description>
              <Description>3. 일정시간 안에 빠르게 퍼즐을 맞추면 콤보 효과가 발동되요.</Description>
            </Descriptions>
          </Section>

          <Section>
            <SubTitle> 5. 인게임 우측 하단 채팅 위젯을 통해 채팅할 수 있어요.</SubTitle>
            <SectionImage src="/release-0.2.0/chat-ingame.gif" />
            <Descriptions>
              <Description>
                1. 우측 하단 채팅위젯 버튼을 통해 채팅창을 껐다 킬 수 있어요.
              </Description>
              <Description>2. 만약 새로운 알림이 오면 애니메이션을 통해 알려줘요.</Description>
            </Descriptions>
          </Section>

          <Section>
            <SubTitle> 6. 게임을 끝내면 결과 화면이 보여요.</SubTitle>
            <SectionImage src="/release-0.2.0/result.gif" />
            <Descriptions>
              <Description>
                1. 게임이 종료되면 애니메이션, 폭죽이 터지며 '게임 종료'를 알리는 모달이 보여져요.
              </Description>
              <Description>2. 모달을 통해 홈 화면으로 리다이렉트되요.</Description>
            </Descriptions>
          </Section>
        </Flex>
      </Main>
    </PageLayout>
  );
}
