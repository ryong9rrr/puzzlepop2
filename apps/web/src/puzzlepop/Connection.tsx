"use client";

import { Point } from "paper/dist/paper-core";
import { useEffect, useState } from "react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";

import * as CDN from "@remotes-cdn/images";

import { socketStaticStore } from "./socketStaticStore";
import { getMultiGameStorage } from "./storage";
import {
  hasPuzzleData,
  isGameWaitingState,
  isGameFinishState,
  isTimeTickData,
  isLockedEvent,
  isMoveEvent,
  isBlockedEvent,
  isUnLockedEvent,
  hasBundlesData,
  isAddPieceEvent,
  hasComboData,
} from "./socketMessageMatchers";
import { useChatStore } from "./useChatStore";
import { Canvas } from "./Canvas";

import { WaitingPage } from "./Waiting/WaitingPage";
import { useWaitingStore } from "./Waiting/useWaitingStore";

import { InGamePage } from "./InGame/InGamePage";
import { useInGameStore } from "./InGame/useInGameStore";
import { canvasStaticStore } from "./InGame/canvas/canvasStaticStore";
import { reGroupForBundles } from "./InGame/canvas/utils/reGroupForBundles";
import { attachPieceToPiece } from "./InGame/canvas/utils/attachPieceToPiece";

import { Me, Player, TeamColor, GameInfoData } from "./types/base";
import { BlockedEventData, LockedEventData, MoveEventData } from "./types/inGame";

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
  const setInGameRedComboCount = useInGameStore(state => state.setRedComboCount);
  const setInGameBlueComboCount = useInGameStore(state => state.setBlueComboCount);

  useEffect(() => {
    let prevPlayers: Player[] = [];

    connect(() => {
      const me = getMultiGameStorage().getItem();

      subscribe("game", roomId, _gameData => {
        setIsConnectedGameSocket(true);

        if (isGameWaitingState(_gameData)) {
          setPageStatus("waiting");
          const gameData = _gameData as GameInfoData;
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

        if (isGameFinishState(_gameData)) {
          window.alert("게임이 종료되었습니다.");
          return;
        }

        // React UI 상태 업데이트
        if (isTimeTickData(_gameData)) {
          setInGameTime(_gameData.time as number);
        }

        if (hasPuzzleData(_gameData)) {
          const { picture, redPuzzle, bluePuzzle, redTeam, blueTeam } = _gameData as GameInfoData;
          const puzzle = me.team === "RED" ? redPuzzle : bluePuzzle;

          const { init, setRedBundles, setBlueBundles } = canvasStaticStore.getState();
          init({
            widthCount: puzzle.widthCnt,
            lengthCount: puzzle.lengthCnt,
            pieceSize: puzzle.pieceSize,
            board: puzzle.board,
            roomId,
            me,
            level: 1,
          });
          setRedBundles(redPuzzle.bundles);
          setBlueBundles(bluePuzzle.bundles);

          // React UI 상태 업데이트
          setInGameImgSrc(picture.encodedString);
          setInGameRedPuzzle(redPuzzle);
          setInGameRedPlayers(redTeam.players);
          setInGameBluePuzzle(bluePuzzle);
          setInGameBluePlayers(blueTeam.players);
        }

        // Canvas UI 처리
        if (isLockedEvent(_gameData)) {
          lockGroupedPieces(_gameData, me);
        }

        if (isBlockedEvent(_gameData)) {
          blockGroupedPieces(_gameData, me);
        }

        if (isUnLockedEvent(_gameData)) {
          unLockGroupedPieces(_gameData, me);
        }

        if (isMoveEvent(_gameData)) {
          moveGroupedPieces(_gameData, me);
        }

        // 디버그용
        if (!isTimeTickData(_gameData) && !isMoveEvent(_gameData)) {
          console.log(_gameData);
        }

        if (hasComboData(_gameData)) {
          const { comboCnt, team } = _gameData;
          if (team === "RED") {
            setInGameRedComboCount(comboCnt || 0);
          } else {
            setInGameBlueComboCount(comboCnt || 0);
          }
        }

        if (isAddPieceEvent(_gameData)) {
          const { team, combo } = _gameData;
          if (combo) {
            for (const [pieceIndex, toPieceIndex] of combo) {
              attachPieceToPiece({
                pieceIndex,
                toPieceIndex,
                team,
                isSend: false,
              });
            }
          }
        }

        // bundles 데이터로 동기화하는 것은 맨 마지막에 위치
        if (hasBundlesData(_gameData)) {
          const { redBundles, blueBundles } = _gameData;
          const { setRedBundles, setBlueBundles } = canvasStaticStore.getState();
          setRedBundles(redBundles || []);
          setBlueBundles(blueBundles || []);
          const bundles = me.team === "RED" ? redBundles || [] : blueBundles || [];
          reGroupForBundles(bundles, me.team);
        }
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
            <Canvas />
          </Flex>
          <InGamePage roomId={roomId} />
        </>
      )}
    </>
  );
};

const isMe = (me: Me, senderId: string) => {
  return me.id === senderId;
};

const isMyTeam = (me: Me, team: TeamColor) => {
  return me.team === team;
};

const moveGroupedPieces = (gameData: Record<string, unknown>, me: Me) => {
  const { targets, senderId, team } = gameData as MoveEventData;
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  if (isMe(me, senderId) || !isMyTeam(me, team)) {
    return;
  }

  const pieces = team === "RED" ? redPieces : bluePieces;
  const targetGroupedPieces = JSON.parse(targets) as {
    x: number;
    y: number;
    index: number;
  }[];
  targetGroupedPieces.forEach(({ x, y, index }) => {
    pieces[index].paperGroup.position = new Point(x, y);
  });
};

const lockGroupedPieces = (gameData: Record<string, unknown>, me: Me) => {
  const { targets, senderId, team } = gameData as LockedEventData;
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  if (isMe(me, senderId) || !isMyTeam(me, team)) {
    return;
  }

  const pieces = team === "RED" ? redPieces : bluePieces;
  const targetGroupedPieces = JSON.parse(targets) as {
    x: number;
    y: number;
    index: number;
  }[];

  targetGroupedPieces.forEach(({ x, y, index }) => {
    // TODO
  });
};

const blockGroupedPieces = (gameData: Record<string, unknown>, me: Me) => {
  const { targets, senderId, team } = gameData as BlockedEventData;
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  if (isMe(me, senderId) || !isMyTeam(me, team)) {
    return;
  }

  const pieces = team === "RED" ? redPieces : bluePieces;
  const targetGroupedPieces = JSON.parse(targets) as {
    x: number;
    y: number;
    index: number;
  }[];

  targetGroupedPieces.forEach(({ x, y, index }) => {
    // TODO
  });
};

const unLockGroupedPieces = (gameData: Record<string, unknown>, me: Me) => {
  const { targets, senderId, team } = gameData as BlockedEventData;
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  if (isMe(me, senderId) || !isMyTeam(me, team)) {
    return;
  }

  const pieces = team === "RED" ? redPieces : bluePieces;
  const targetGroupedPieces = JSON.parse(targets) as {
    x: number;
    y: number;
    index: number;
  }[];

  targetGroupedPieces.forEach(({ x, y, index }) => {
    // TODO
  });
};
