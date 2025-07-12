"use client";

import { Flex, Grid, GridItem, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { Avatar } from "@shared-components/Avatar";
import { CooperationWaitingGameData } from "@shared-types/multi";

import { useWaitingGameDataStore } from "../useWaitingGameDataStore";

const CARD_COUNT = 8;

export const PlayerCardGrid = () => {
  const { cooperationWaitingGameData } = useWaitingGameDataStore();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gapScale={0.2}>
      {convertPlayerCards(cooperationWaitingGameData).map((player, index) => {
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

const convertPlayerCards = (gameData: CooperationWaitingGameData | null) => {
  const playerCards = new Array<PlayerCard>(CARD_COUNT).fill({
    type: "EMPTY",
  });

  if (!gameData) {
    return playerCards;
  }

  return playerCards.map((_, index) => {
    const player = gameData.redTeam.players[index];

    if (index >= gameData.roomSize) {
      return {
        type: "BLOCK",
      } as Block;
    }

    if (!player) {
      return {
        type: "EMPTY",
      } as Empty;
    }

    return {
      type: "USER",
      nickname: gameData.redTeam.players[index].id,
      isAdmin: gameData.admin.id === player.id,
      avatarUrl: "", // TODO: 회원가입 기능 추가하면 구현
    } as User;
  });
};

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
