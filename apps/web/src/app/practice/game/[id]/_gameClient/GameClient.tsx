"use client";

import { useEffect } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { SingleGameLevelType, SingleGameModeType } from "@puzzlepop2/game-core";
import { Button } from "@puzzlepop2/react-components-button";
import { Z_INDEX } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";
import { usePromise } from "@puzzlepop2/react-hooks-base";

import { useNavigation } from "@router/useNavigation";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { useToggle } from "@shared-hooks/useToggle";

import { SideWidgetContainer, SideWidgetIcon } from "../SideWidgets";
import { ExampleImage } from "../ExampleImage";

import { load } from "./canvas";

export type GameClientProps = {
  mode: SingleGameModeType;
  src: string;
  level: SingleGameLevelType;
};

export const GameClient = (props: GameClientProps) => {
  const { mode, src, level } = props;

  const navigation = useNavigation();

  const { isActive: isActiveExampleImage, toggle: onToggleExampleImage } = useToggle();

  const { toast } = useToast();

  const { isPending, isError } = usePromise(async () => {
    return load({ src, level });
  });

  const isLoadingComplete = !isPending && !isError;

  useEffect(() => {
    if (!isError) {
      return;
    }
    toast({
      payload: {
        message: "게임을 불러오는 중 오류가 발생했어요. 다시 시도해주세요.",
      },
      duration: 30000,
    });
  }, [isError]);

  return (
    <>
      <LoadingOverlay isLoadingComplete={isLoadingComplete} />
      {isActiveExampleImage && <ExampleImage src={src} />}
      <SideWidgetContainer>
        <SideWidgetIcon
          iconType="image"
          isActive={isActiveExampleImage}
          onToggle={onToggleExampleImage}
        />
      </SideWidgetContainer>
      <Flex
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          zIndex: Z_INDEX.DIMMED_Z_INDEX - 1,
        }}
      >
        <Button
          size="sm"
          onClick={() => {
            navigation.redirect("/practice/game");
          }}
        >
          나가기
        </Button>
      </Flex>
    </>
  );
};
