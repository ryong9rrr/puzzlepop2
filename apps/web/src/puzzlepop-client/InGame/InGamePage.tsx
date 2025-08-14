"use client";

import { Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { useToggle } from "@shared-hooks/useToggle";

import { Me } from "../types/base";

import { Canvas } from "../canvas/Canvas";

import { useUserStore } from "../stores/useUserStore";
import { useInGameUIStore } from "../stores/useInGameUIStore";

import { FinishOverlay } from "./FinishOverlay";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { ChatWidget } from "./ChatWidget";
import { SideWidgetContainer, SideWidgetIcon } from "./SideWidgets";
import { ExampleImage } from "./ExampleImage";
import { Combo } from "./Combo";

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const InGamePage = (props: Props) => {
  const { roomId, gameType } = props;

  const { isActive: isActiveTimer, toggle: toggleActiveTimer } = useToggle();
  const { isActive: isActiveProgressBar, toggle: toggleActiveProgressBar } = useToggle();
  const { isActive: isActiveExampleImage, toggle: toggleActiveExampleImage } = useToggle();

  const me = useUserStore(state => state.me) as Me;

  const isFinished = useInGameUIStore(state => state.isFinished);
  const inGameRedPercentage = useInGameUIStore(state => state.redPercentage);
  const inGameBluePercentage = useInGameUIStore(state => state.bluePercentage);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ position: "relative" }}>
          {isActiveProgressBar && (
            <>
              <ProgressBar
                color={gameType === "COOPERATION" ? "orange" : me.team === "RED" ? "red" : "blue"}
                percent={me.team === "RED" ? inGameRedPercentage : inGameBluePercentage}
              />
              <Spacing size={4} />
            </>
          )}
          <Canvas roomId={roomId} />
          <Combo />
        </div>
      </Flex>
      {isActiveExampleImage && <ExampleImage />}
      {isActiveTimer && <Timer />}
      <ChatWidget roomId={roomId} />
      <SideWidgetContainer>
        <SideWidgetIcon isActive={isActiveTimer} onToggle={toggleActiveTimer} iconType="timer" />
        <SideWidgetIcon
          isActive={isActiveProgressBar}
          onToggle={toggleActiveProgressBar}
          iconType="percent"
        />
        <SideWidgetIcon
          isActive={isActiveExampleImage}
          onToggle={toggleActiveExampleImage}
          iconType="image"
        />
      </SideWidgetContainer>
      {isFinished && <FinishOverlay />}
    </>
  );
};
