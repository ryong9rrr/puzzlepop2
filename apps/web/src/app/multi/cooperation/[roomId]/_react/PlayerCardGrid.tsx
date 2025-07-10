"use client";

import { Flex, Grid, GridItem, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { Avatar } from "@shared-components/Avatar";
import { GameData } from "@shared-types/multi";

import { useGameDataStore } from "./useGameDataStore";

type User = {
  type: "USER";
  nickname: string;
  isAdmin: boolean;
  avatarUrl?: string;
};

type Empty = {
  type: "EMPTY";
};

type Block = {
  type: "BLOCK";
};

type PlayerCard = User | Empty | Block;

const CARD_COUNT = 8;

export const PlayerCardGrid = () => {
  const { gameData } = useGameDataStore();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gapScale={0.2}>
      {convertPlayerCards(gameData).map((player, index) => {
        return (
          <Flex key={index} justify="center" align="center" style={{ position: "relative" }}>
            {player.type === "USER" && player.isAdmin && (
              <div style={{ position: "absolute", top: "0.25rem", left: "0.5rem" }}>👑</div>
            )}
            <GridItem>
              <Flex
                direction="column"
                justify="center"
                align="center"
                gapScale={0.5}
                style={{
                  width: "5rem",
                  height: "6rem",
                  border: `3px solid ${player.type === "BLOCK" ? vars.colors.grey[500] : vars.colors.grey[300]}`,
                  borderRadius: "0.25rem",
                  backgroundColor:
                    player.type === "BLOCK" ? vars.colors.grey[400] : vars.colors.grey[50],
                }}
              >
                {player.type === "USER" ? (
                  <>
                    <Avatar src={player.avatarUrl} size="3rem" />
                    <Text
                      bold
                      className="ellipsis"
                      style={{ width: "3rem", textAlign: "center", fontSize: "0.5rem" }}
                    >
                      {player.nickname}
                    </Text>
                  </>
                ) : null}
              </Flex>
            </GridItem>
          </Flex>
        );
      })}
    </Grid>
  );
};

const convertPlayerCards = (gameData: GameData | null) => {
  const playerCards = new Array<PlayerCard>(CARD_COUNT).fill({
    type: "EMPTY",
  });

  if (!gameData) {
    return playerCards;
  }

  return playerCards.map((_, index) => {
    if (index >= gameData.roomSize) {
      return {
        type: "BLOCK",
      } as Block;
    }

    if (gameData.redTeam.players[index]) {
      return {
        type: "USER",
        nickname: gameData.redTeam.players[index].id,
        isAdmin: gameData.redTeam.players[index].sessionId === gameData.admin.sessionId,
        avatarUrl: "", // TODO: 회원가입 기능 추가하면 구현
      } as User;
    }

    return {
      type: "EMPTY",
    } as Empty;
  });
};
