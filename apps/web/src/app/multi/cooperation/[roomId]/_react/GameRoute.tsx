"use client";

import { useEffect, useState } from "react";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";
import { CooperationWaitingGameData, Player } from "@shared-types/multi";
import { isNumber, isRecord } from "@shared-types/utils";

import * as CDN from "@remotes-cdn/images";
import { socket } from "@remotes-main/socketStore";

import { useChatStore } from "./useChatStore";
import { useWaitingGameDataStore } from "./useWaitingGameDataStore";

import { WaitingPage } from "./_waiting/WaitingPage";
import { InGamePage } from "./_inGame/InGamePage";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { useInGameDataStore } from "./useInGameDataStore";

const { connect, disconnect, subscribe, send } = socket;

type GameRouteState = "waiting" | "inGame" | "finished" | null;

export const GameRoute = ({ roomId }: { roomId: string }) => {
  const [gameRouteState, setGameRouteState] = useState<GameRouteState>(null);

  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const { addChat, leaveChat, clearChat, sendSystemMessage } = useChatStore();

  const { setCooperationWaitingGameData } = useWaitingGameDataStore();

  const { setTime } = useInGameDataStore();

  useEffect(() => {
    let prevPlayers: Player[] = []; // leaveChat 함수에서 사용하기 위한 이전 플레이어 목록

    connect(() => {
      const me = getCooperationGameSessionStorage().getItem();

      subscribe("game", roomId, _gameData => {
        setIsConnectedGameSocket(true); // 최초 한번 연결 상태 초기화

        // 대기방인 경우 : "started"가 false인 경우
        if (isRecord(_gameData) && _gameData.started === false) {
          setGameRouteState("waiting");

          const gameData = _gameData as CooperationWaitingGameData;
          leaveChat({
            prevPlayers,
            currentPlayers: gameData.redTeam.players,
          });
          prevPlayers = _gameData.redTeam.players;

          setCooperationWaitingGameData(gameData);
          return;
        }

        // TODO: 끝난 게임인지도 검사해야하는데 이건 나중에...
        setGameRouteState("inGame");

        if (isRecord(_gameData) && isNumber(_gameData.time)) {
          setTime(_gameData.time);
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
      clearChat();
      disconnect();
    };
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
          <WaitingPage roomId={roomId} />
        </>
      )}

      {gameRouteState === "inGame" && (
        <>
          <FullScreenBackground.Background
            src={CDN.RED_TEAM_BACKGROUND}
            blurSrc={CDN.RED_TEAM_BACKGROUND_THUMBNAIL}
          />
          <InGamePage roomId={roomId} />
        </>
      )}
    </>
  );
};
