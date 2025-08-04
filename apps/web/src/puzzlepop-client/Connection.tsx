"use client";

import { Point } from "paper/dist/paper-core";
import { useEffect, useState } from "react";
import { Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { AlertClient } from "@shared-components/Clients/AlertClient";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";
import { FullScreenBackground } from "@shared-components/FullScreenBackground";
import { useToggle } from "@shared-hooks/useToggle";

import * as CDN from "@remotes-cdn/images";

import { socketStaticStore } from "./socketStaticStore";
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
import { useUserStore } from "./useUserStore";
import { useChatStore } from "./useChatStore";

import { WaitingPage } from "./Waiting/WaitingPage";
import { useWaitingUIStore } from "./Waiting/useWaitingUIStore";

import type { Me, Player, TeamColor, GameInfoData } from "./types/base";
import type { BlockedEventData, LockedEventData, MoveEventData } from "./types/inGame";

import { Canvas } from "./InGame/Canvas";
import { canvasStaticStore } from "./InGame/canvas/canvasStaticStore";
import { reBundles } from "./InGame/canvas/utils/reBundles";
import { attachPieceToPiece } from "./InGame/canvas/utils/attachPieceToPiece";
import { useCombo, Combos } from "./InGame/useCombo";
import { useInGameUIStore } from "./InGame/useInGameUIStore";
import { Finished } from "./InGame/Finished";
import { ProgressBar } from "./InGame/ProgressBar";
import { Timer } from "./InGame/Timer";
import { ChatWidget } from "./InGame/ChatWidget";
import { SideWidgetContainer, SideWidgetIcon } from "./InGame/SideWidgets";
import { ExampleImage } from "./InGame/ExampleImage";

interface ConnectionProps {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

type PageStatus = "waiting" | "inGame" | "finished" | null;

const { connect, disconnect, subscribe, send } = socketStaticStore.getState();

export const Connection = (props: ConnectionProps) => {
  const { roomId, gameType } = props;

  const me = useUserStore(state => state.me) as Me;

  const [pageStatus, setPageStatus] = useState<PageStatus>(null);
  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);
  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const { combos, addCombo } = useCombo();
  const { isActive: isActiveTimer, toggle: toggleActiveTimer } = useToggle();
  const { isActive: isActiveProgressBar, toggle: toggleActiveProgressBar } = useToggle();
  const { isActive: isActiveExampleImage, toggle: toggleActiveExampleImage } = useToggle();

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
  const isRenderComplete = useInGameUIStore(state => state.isRenderComplete);
  const setInGameUITime = useInGameUIStore(state => state.setTime);
  const setInGameUIImgSrc = useInGameUIStore(state => state.setImgSrc);
  const setInGameUIRedPuzzle = useInGameUIStore(state => state.setRedPuzzle);
  const setInGameUIRedPlayers = useInGameUIStore(state => state.setRedPlayers);
  const inGameRedPercentage = useInGameUIStore(state => state.redPercentage);
  const setInGameUIRedPercentage = useInGameUIStore(state => state.setRedPercentage);
  const setInGameUIBluePuzzle = useInGameUIStore(state => state.setBluePuzzle);
  const setInGameUIBluePlayers = useInGameUIStore(state => state.setBluePlayers);
  const inGameBluePercentage = useInGameUIStore(state => state.bluePercentage);
  const setInGameUIBluePercentage = useInGameUIStore(state => state.setBluePercentage);

  useEffect(() => {
    resetChatStore();
  }, [pageStatus]);

  useEffect(() => {
    let prevPlayers: Player[] = [];
    connect(() => {
      subscribe("game", roomId, _gameData => {
        setIsConnectedGameSocket(true);

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

        // 디버그용
        // if (!isTimeTickData(_gameData) && !isMoveEvent(_gameData)) {
        //   console.log(_gameData);
        // }

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
        setIsConnectedChatSocket(true);
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
      resetChatStore();
      resetWaitingUIStore();
      resetInGameUIStore();
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
            <div style={{ position: "relative" }}>
              {isActiveProgressBar && (
                <>
                  <ProgressBar
                    color={
                      gameType === "COOPERATION" ? "orange" : me.team === "RED" ? "red" : "blue"
                    }
                    percent={me.team === "RED" ? inGameRedPercentage : inGameBluePercentage}
                  />
                  <Spacing size={4} />
                </>
              )}
              <Canvas roomId={roomId} />
              <Combos combos={combos} />
            </div>
          </Flex>
          {isActiveExampleImage && <ExampleImage />}
          {isActiveTimer && <Timer />}
          <ChatWidget roomId={roomId} />
          <SideWidgetContainer>
            <SideWidgetIcon isActive={isActiveTimer} toggle={toggleActiveTimer} iconType="timer" />
            <SideWidgetIcon
              isActive={isActiveProgressBar}
              toggle={toggleActiveProgressBar}
              iconType="percent"
            />
            <SideWidgetIcon
              isActive={isActiveExampleImage}
              toggle={toggleActiveExampleImage}
              iconType="image"
            />
          </SideWidgetContainer>
          {isFinished && <Finished />}
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
