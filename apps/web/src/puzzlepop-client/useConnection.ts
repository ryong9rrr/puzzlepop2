"use client";

import { Point } from "paper/dist/paper-core";
import { useEffect, useMemo, useState } from "react";

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
  hasProgressPercentData,
} from "./socketMessageMatchers";

import type { Me, Player, GameInfoData, TeamColor } from "./types/base";
import type { BlockedEventData, LockedEventData, MoveEventData } from "./types/inGame";

import { reBundles } from "./canvas/utils/reBundles";
import { attachPieceToPiece } from "./canvas/utils/attachPieceToPiece";

import { socketStaticStore } from "./socketStaticStore";
import { useLoadingStore } from "./stores/useLoadingStore";
import { useUserStore } from "./stores/useUserStore";
import { useChatStore } from "./stores/useChatStore";
import { useWaitingUIStore } from "./stores/useWaitingUIStore";
import { useInGameUIStore } from "./stores/useInGameUIStore";
import { useComboStore } from "./stores/useComboStore";

import { canvasStaticStore } from "./canvas/canvasStaticStore";

const { connect, disconnect, subscribe, send } = socketStaticStore.getState();

type PageStatus = "waiting" | "inGame" | null;

interface Props {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const useConnection = (props: Props) => {
  const { roomId, gameType } = props;

  const me = useUserStore(state => state.me) as Me;

  const [pageStatus, setPageStatus] = useState<PageStatus>(null);

  const resetLoadingStore = useLoadingStore(state => state.reset);
  const isSetupCompleteCanvas = useLoadingStore(state => state.isSetupCompleteCanvas);
  const isConnectCompleteGameSocket = useLoadingStore(state => state.isConnectCompleteGameSocket);
  const isConnectCompleteChatSocket = useLoadingStore(state => state.isConnectCompleteChatSocket);
  const setIsConnectCompleteGameSocket = useLoadingStore(
    state => state.setIsConnectCompleteGameSocket,
  );
  const setIsConnectCompleteChatSocket = useLoadingStore(
    state => state.setIsConnectCompleteChatSocket,
  );
  const isLoadingComplete = useMemo(() => {
    return (
      isConnectCompleteGameSocket &&
      isConnectCompleteChatSocket &&
      !!pageStatus &&
      (pageStatus === "inGame" ? isSetupCompleteCanvas : true)
    );
  }, [isConnectCompleteGameSocket, isConnectCompleteChatSocket, pageStatus, isSetupCompleteCanvas]);

  const resetChatStore = useChatStore(state => state.reset);
  const addChat = useChatStore(state => state.addChat);
  const leaveChat = useChatStore(state => state.leaveChat);
  const sendSystemMessage = useChatStore(state => state.sendSystemMessage);

  const resetWaitingUIStore = useWaitingUIStore(state => state.reset);
  const setWaitingUIAdmin = useWaitingUIStore(state => state.setAdmin);
  const setWaitingUIImgSrc = useWaitingUIStore(state => state.setImgSrc);
  const setWaitingUIRedPlayers = useWaitingUIStore(state => state.setRedPlayers);
  const setWaitingUIBluePlayers = useWaitingUIStore(state => state.setBluePlayers);
  const setWaitingUIRoomSize = useWaitingUIStore(state => state.setRoomSize);
  const setWaitingUIRoomTitle = useWaitingUIStore(state => state.setRoomTitle);

  const resetInGameUIStore = useInGameUIStore(state => state.reset);
  const setInGameUITime = useInGameUIStore(state => state.setTime);
  const setInGameUIImgSrc = useInGameUIStore(state => state.setImgSrc);
  const setInGameUIRedPuzzle = useInGameUIStore(state => state.setRedPuzzle);
  const setInGameUIRedPlayers = useInGameUIStore(state => state.setRedPlayers);
  const setInGameUIRedPercentage = useInGameUIStore(state => state.setRedPercentage);
  const setInGameUIBluePuzzle = useInGameUIStore(state => state.setBluePuzzle);
  const setInGameUIBluePlayers = useInGameUIStore(state => state.setBluePlayers);
  const setInGameUIBluePercentage = useInGameUIStore(state => state.setBluePercentage);
  const setIsFinished = useInGameUIStore(state => state.setIsFinished);

  const resetComboStore = useComboStore(state => state.reset);
  const addCombo = useComboStore(state => state.addCombo);

  useEffect(() => {
    resetChatStore();
  }, [pageStatus]);

  useEffect(() => {
    let prevPlayers: Player[] = [];
    connect(() => {
      subscribe("game", roomId, _gameData => {
        setIsConnectCompleteGameSocket(true);

        if (isGameWaitingState(_gameData)) {
          setPageStatus("waiting");
          const gameData = _gameData as GameInfoData;
          setWaitingUIAdmin(gameData.admin);
          setWaitingUIImgSrc(gameData.picture?.encodedString || null);
          setWaitingUIRoomSize(gameData.roomSize);
          setWaitingUIRoomTitle(gameData.gameName);
          setWaitingUIRedPlayers(gameData.redTeam.players);
          setWaitingUIBluePlayers(gameData.blueTeam.players);
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
          setTimeout(() => {
            setIsFinished(true);
          }, 500);
        }

        if (hasProgressPercentData(_gameData)) {
          const { redProgressPercent, blueProgressPercent } = _gameData;
          setInGameUIRedPercentage(redProgressPercent);
          setInGameUIBluePercentage(blueProgressPercent);
        }

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
          return;
        }

        if (isTimeTickData(_gameData)) {
          setInGameUITime(_gameData.time as number);
          return;
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

          setInGameUIImgSrc(picture.encodedString);
          setInGameUIRedPuzzle(redPuzzle);
          setInGameUIRedPlayers(redTeam.players);
          setInGameUIBluePuzzle(bluePuzzle);
          setInGameUIBluePlayers(blueTeam.players);
        }

        if (isAddPieceEvent(_gameData)) {
          const { team, combo, comboCnt } = _gameData;
          const { redPieces, bluePieces } = canvasStaticStore.getState();
          const pieces = team === "RED" ? redPieces : bluePieces;
          if (combo && team === me.team) {
            for (const [pieceIndex, toPieceIndex] of combo) {
              attachPieceToPiece({
                pieceIndex,
                toPieceIndex,
                team,
                isSend: false,
              });

              addCombo({
                x: pieces[pieceIndex].paperGroup.position.x,
                y: pieces[pieceIndex].paperGroup.position.y,
                count: comboCnt,
              });
            }
          }
        }

        if (hasBundlesData(_gameData)) {
          const { redBundles, blueBundles } = _gameData;
          const { setRedBundles, setBlueBundles } = canvasStaticStore.getState();
          setRedBundles(redBundles || []);
          setBlueBundles(blueBundles || []);
          const bundles = me.team === "RED" ? redBundles || [] : blueBundles || [];
          reBundles({
            bundles,
            team: me.team,
          });
        }
      });

      subscribe("chat", roomId, _chatData => {
        setIsConnectCompleteChatSocket(true);
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
      resetCanvasStaticStore();

      resetLoadingStore();
      resetChatStore();
      resetWaitingUIStore();
      resetInGameUIStore();
      resetComboStore();

      disconnect();
    };

    // eslint-disable-next-line
  }, []);

  return {
    isLoadingComplete,
    pageStatus,
  };
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
