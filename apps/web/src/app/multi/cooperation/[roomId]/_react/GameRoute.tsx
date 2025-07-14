"use client";

import { useEffect, useState } from "react";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";
import { CooperationWaitingGameData, Player } from "@shared-types/multi";
import { isNumber, isRecord } from "@shared-types/utils";

import * as CDN from "@remotes-cdn/images";
import { socket } from "@remotes-main/socketStore";

import { useChatStore } from "./useChatStore";
import { useWaitingStore } from "./useWaitingStore";
import { useInGameStore } from "./useInGameStore";

import { WaitingPage } from "./_waiting/WaitingPage";
import { InGamePage } from "./_inGame/InGamePage";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";
import { AlertClient } from "@shared-components/Clients/AlertClient";

const { connect, disconnect, subscribe, send } = socket;

type GameRouteState = "waiting" | "inGame" | "finished" | null;

export const GameRoute = ({ roomId }: { roomId: string }) => {
  const [gameRouteState, setGameRouteState] = useState<GameRouteState>(null);

  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const addChat = useChatStore(state => state.addChat);
  const leaveChat = useChatStore(state => state.leaveChat);
  const clearChat = useChatStore(state => state.clearChat);
  const sendSystemMessage = useChatStore(state => state.sendSystemMessage);

  const setAdmin = useWaitingStore(state => state.setAdmin);
  const setImgSrc = useWaitingStore(state => state.setImgSrc);
  const setPlayers = useWaitingStore(state => state.setPlayers);
  const setRoomSize = useWaitingStore(state => state.setRoomSize);
  const setRoomTitle = useWaitingStore(state => state.setRoomTitle);

  const setTime = useInGameStore(state => state.setTime);

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
          setImgSrc(gameData.picture?.encodedString || null);
          setRoomSize(gameData.roomSize);
          setRoomTitle(gameData.gameName);
          setPlayers(gameData.redTeam.players);
          leaveChat({
            prevPlayers,
            currentPlayers: gameData.redTeam.players,
          });
          prevPlayers = _gameData.redTeam.players;
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
          <InGamePage roomId={roomId} />
        </>
      )}
    </>
  );
};
