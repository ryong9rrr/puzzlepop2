"use client";

import { useEffect, useState } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  CooperationWaitingGameData,
  IMG_ID,
  MultiGameData,
  Player,
} from "@puzzlepop2/game-core";
import { vars } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";
import { isNumber, isRecord } from "@shared-types/utils";

import * as CDN from "@remotes-cdn/images";
import { socket } from "@remotes-main/socketStore";

import { WaitingPage } from "./_waiting/WaitingPage";
import { InGamePage } from "./_inGame/InGamePage";

import { useChatStore } from "./useChatStore";
import { useWaitingStore } from "./useWaitingStore";
import { useInGameStore } from "./useInGameStore";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";

// 핵심 게임 클라이언트 로직
import { canvasStore } from "./_inGame/_canvas/store";

type GameRouteState = "waiting" | "inGame" | "finished" | null;

const { connect, disconnect, subscribe, send } = socket;

export const GameRoute = ({ roomId }: { roomId: string }) => {
  const [gameRouteState, setGameRouteState] = useState<GameRouteState>(null);

  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const addChat = useChatStore(state => state.addChat);
  const leaveChat = useChatStore(state => state.leaveChat);
  const sendSystemMessage = useChatStore(state => state.sendSystemMessage);
  const resetChatStore = useChatStore(state => state.reset);

  const setAdmin = useWaitingStore(state => state.setAdmin);
  const setWaitingImgSrc = useWaitingStore(state => state.setImgSrc);
  const setPlayers = useWaitingStore(state => state.setPlayers);
  const setRoomSize = useWaitingStore(state => state.setRoomSize);
  const setRoomTitle = useWaitingStore(state => state.setRoomTitle);
  const resetWaitingStore = useWaitingStore(state => state.reset);

  const setTime = useInGameStore(state => state.setTime);
  const setInGameImgSrc = useInGameStore(state => state.setImgSrc);
  const setGameData = useInGameStore(state => state.setGameData);
  const resetInGameStore = useInGameStore(state => state.reset);

  useEffect(() => {
    let prevPlayers: Player[] = []; // leaveChat 함수에서 사용하기 위한 이전 플레이어 목록

    connect(() => {
      const me = getCooperationGameSessionStorage().getItem();

      subscribe("game", roomId, _gameData => {
        setIsConnectedGameSocket(true); // 최초 한번 연결 상태 초기화

        const isWaiting = isRecord(_gameData) && _gameData.started === false;
        if (isWaiting) {
          setGameRouteState("waiting");

          const gameData = _gameData as CooperationWaitingGameData;
          setAdmin(gameData.admin);
          setWaitingImgSrc(gameData.picture?.encodedString || null);
          setRoomSize(gameData.roomSize);
          setRoomTitle(gameData.gameName);
          setPlayers(gameData.redTeam.players);
          leaveChat({
            prevPlayers,
            currentPlayers: gameData.redTeam.players,
          });
          prevPlayers = gameData.redTeam.players;
          return;
        }

        // TODO: 끝난 게임인지도 검사해야하는데 이건 나중에...
        setGameRouteState("inGame");

        const isTimeData = isRecord(_gameData) && isNumber(_gameData.time);
        if (isTimeData) {
          setTime(_gameData.time as number);
        }

        const isGameData = isRecord(_gameData) && _gameData.redPuzzle;
        if (isGameData) {
          const { picture, redPuzzle } = _gameData as MultiGameData;

          // 퍼즐캔버스 초기화
          const { isInitialized, init } = canvasStore.getState();
          if (!isInitialized) {
            init({
              widthCount: redPuzzle.widthCnt,
              lengthCount: redPuzzle.lengthCnt,
              pieceSize: redPuzzle.pieceSize,
              board: redPuzzle.board,
            });
          }

          setInGameImgSrc(picture.encodedString);
          setGameData(_gameData as MultiGameData);

          const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;
          const 이미지로드완료 = imgElement && imgElement.complete && imgElement.naturalWidth > 0;
          if (이미지로드완료) {
            console.log("이때부터 리렌더 ㄱㄱ");
          }
        }

        // time 빼고 디버깅
        if (isRecord(_gameData) && Object.keys(_gameData).length !== 1) {
          console.log("게임데이터", _gameData);
        }
      });

      subscribe("chat", roomId, _chatData => {
        setIsConnectedChatSocket(true); // 최초 한번 연결 상태 초기화
        addChat(_chatData);
      });

      // 게임방 입장 메시지 전송
      send({
        type: "ENTER",
        roomId,
        sender: me.id,
        team: me.team,
      });

      // 채팅방 입장 메시지 전송
      sendSystemMessage({ roomId, message: `${me.id}님이 입장했어요.` });
    });

    return () => {
      const { reset: resetCanvasStore } = canvasStore.getState();

      resetChatStore();
      resetWaitingStore();
      resetInGameStore();
      resetCanvasStore();
      disconnect();
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LoadingOverlay isLoadingComplete={isConnectedGameSocket && isConnectedChatSocket} />

      {gameRouteState === "waiting" && (
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

      {gameRouteState === "inGame" && (
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
