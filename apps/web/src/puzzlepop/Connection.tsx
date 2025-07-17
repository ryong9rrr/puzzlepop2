"use client";

import { useEffect, useState } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  IMG_ID,
  MultiGamePlayerType,
  MultiGameInfoMessage,
  MultiGameMouseDragMessage,
  MultiGamePuzzleType,
  MeFromStorage,
} from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import * as CDN from "@remotes-cdn/images";

import { socketStaticStore } from "./socketStaticStore";
import { getMultiGameStorage } from "./storage";
import { hasPuzzle, hasTime, isFinished, isWaiting } from "./typeUtils";

import { useChatStore } from "./useChatStore";

import { WaitingPage } from "./Waiting/WaitingPage";
import { useWaitingStore } from "./Waiting/useWaitingStore";

import { InGamePage } from "./InGame/InGamePage";
import { useInGameStore } from "./InGame/useInGameStore";
import { canvasStaticStore } from "./InGame/canvas/canvasStaticStore";

type PageStatus = "waiting" | "inGame" | "finished" | null;

const { connect, disconnect, subscribe, send } = socketStaticStore.getState();

export const Connection = ({ roomId }: { roomId: string }) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>(null);

  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const resetChatStore = useChatStore(state => state.reset);
  const addChat = useChatStore(state => state.addChat);
  const leaveChat = useChatStore(state => state.leaveChat);
  const sendSystemMessage = useChatStore(state => state.sendSystemMessage);

  const resetWaitingStore = useWaitingStore(state => state.reset);
  const setWaitingAdmin = useWaitingStore(state => state.setAdmin);
  const setWaitingImgSrc = useWaitingStore(state => state.setImgSrc);
  const setWaitingRedPlayers = useWaitingStore(state => state.setRedPlayers);
  const setWaitingBluePlayers = useWaitingStore(state => state.setBluePlayers);
  const setWaitingRoomSize = useWaitingStore(state => state.setRoomSize);
  const setWaitingRoomTitle = useWaitingStore(state => state.setRoomTitle);

  const resetInGameStore = useInGameStore(state => state.reset);
  const isRenderComplete = useInGameStore(state => state.isRenderComplete);
  const setInGameTime = useInGameStore(state => state.setTime);
  const setInGameImgSrc = useInGameStore(state => state.setImgSrc);
  const setInGameRedPuzzle = useInGameStore(state => state.setRedPuzzle);
  const setInGameRedPlayers = useInGameStore(state => state.setRedPlayers);
  const setInGameBluePuzzle = useInGameStore(state => state.setBluePuzzle);
  const setInGameBluePlayers = useInGameStore(state => state.setBluePlayers);

  useEffect(() => {
    let prevPlayers: MultiGamePlayerType[] = [];

    connect(() => {
      const me = getMultiGameStorage().getItem();

      subscribe("game", roomId, _gameData => {
        setIsConnectedGameSocket(true);

        if (isWaiting(_gameData)) {
          setPageStatus("waiting");
          const gameData = _gameData as MultiGameInfoMessage;
          setWaitingAdmin(gameData.admin);
          setWaitingImgSrc(gameData.picture?.encodedString || null);
          setWaitingRoomSize(gameData.roomSize);
          setWaitingRoomTitle(gameData.gameName);
          setWaitingRedPlayers(gameData.redTeam.players);
          setWaitingBluePlayers(gameData.blueTeam.players);
          const newPlayers = [...gameData.redTeam.players, ...gameData.blueTeam.players];
          leaveChat({
            prevPlayers,
            currentPlayers: newPlayers,
          });
          prevPlayers = newPlayers;
          return;
        }

        setPageStatus("inGame");

        if (isFinished(_gameData)) {
          // TODO...
          return;
        }

        console.log(_gameData);

        if (hasTime(_gameData)) {
          setInGameTime(_gameData.time as number);
        }

        if (hasPuzzle(_gameData)) {
          const { picture, redPuzzle, bluePuzzle, redTeam, blueTeam } =
            _gameData as MultiGameInfoMessage;
          initCanvasStaticStore(roomId, redPuzzle, me);
          setInGameImgSrc(picture.encodedString);
          setInGameRedPuzzle(redPuzzle);
          setInGameRedPlayers(redTeam.players);
          setInGameBluePuzzle(bluePuzzle);
          setInGameBluePlayers(blueTeam.players);
        }

        syncMouseDragEvent(_gameData, me);
      });

      subscribe("chat", roomId, _chatData => {
        setIsConnectedChatSocket(true); // 최초 한번 연결 상태 초기화
        addChat(_chatData);
      });

      send({
        type: "ENTER",
        roomId,
        sender: me.id,
        team: me.team,
      });
      sendSystemMessage({ roomId, message: `${me.id}님이 입장했어요.` });
    });

    return () => {
      const { reset: resetCanvasStaticStore } = canvasStaticStore.getState();
      resetChatStore();
      resetWaitingStore();
      resetInGameStore();
      resetCanvasStaticStore();
      disconnect();
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LoadingOverlay
        isLoadingComplete={
          isConnectedGameSocket &&
          isConnectedChatSocket &&
          !!pageStatus &&
          (pageStatus === "inGame" ? isRenderComplete : true)
        }
      />

      {pageStatus === "waiting" && (
        <>
          <FullScreenBackground.Background
            src={CDN.COOPERATION_BACKGROUND}
            blurSrc={CDN.COOPERATION_BACKGROUND_THUMBNAIL}
          />
          <AlertClient>
            <WaitingPage roomId={roomId} />
          </AlertClient>
        </>
      )}

      {pageStatus === "inGame" && (
        <>
          <FullScreenBackground.Background
            src={CDN.RED_TEAM_BACKGROUND}
            blurSrc={CDN.RED_TEAM_BACKGROUND_THUMBNAIL}
          />
          <Flex
            justify="center"
            align="center"
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <img id={IMG_ID} alt="" style={{ display: "none" }} />
            <canvas
              id={CANVAS_ID}
              style={{
                width: `${CANVAS_WIDTH}px`,
                height: `${CANVAS_HEIGHT}px`,
                backgroundColor: vars.colors.grey[50],
                borderRadius: "0.25rem",
                opacity: 0.8,
                border: `3px solid ${vars.colors.grey[500]}`,
              }}
            />
          </Flex>
          <InGamePage roomId={roomId} />
        </>
      )}
    </>
  );
};

const initCanvasStaticStore = (roomId: string, puzzle: MultiGamePuzzleType, me: MeFromStorage) => {
  const { init } = canvasStaticStore.getState();
  init({
    widthCount: puzzle.widthCnt,
    lengthCount: puzzle.lengthCnt,
    pieceSize: puzzle.pieceSize,
    board: puzzle.board,
    roomId,
    myNickname: me.id,
    me,
  });
};

const syncMouseDragEvent = (gameData: Record<string, unknown>, me: MeFromStorage) => {
  if ("message" in gameData && gameData.message === "MOVE") {
    const { syncMouseDragEvent: _syncMouseDragEvent } = canvasStaticStore.getState();
    _syncMouseDragEvent(gameData as MultiGameMouseDragMessage, me.team);
  }
};
