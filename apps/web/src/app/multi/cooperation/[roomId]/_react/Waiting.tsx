"use client";

import Image from "next/image";
import { Flex, Grid, GridItem, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import { LoadingOverlay } from "@shared-components/LoadingOverlay";

import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { useWaiting } from "./useWaiting";

export const Waiting = ({ roomId }: { roomId: string }) => {
  const { isCompleteConnectSocket, gameData, chats, onSubmitChat } = useWaiting({
    roomId,
    debugGameData: gameData => {
      console.log("Game Data:", gameData);
    },
    debugChatData: chatData => {
      console.log("Chat Data:", chatData);
    },
  });

  const 방제목 = gameData ? gameData.gameName : "";
  const 정원현황 = gameData ? `${gameData.redTeam.players.length}/${gameData.roomSize}` : "";

  return (
    <>
      <LoadingOverlay isLoadingComplete={isCompleteConnectSocket} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        gapScale={0.5}
        style={{ height: "100vh" }}
      >
        <Flex style={{ boxSizing: "border-box", padding: "0 1rem" }} gapScale={0.5}>
          <Flex direction="column" justify="center" gapScale={0.5} style={{ width: "22rem" }}>
            <Flex
              justify="space-between"
              align="center"
              gapScale={1}
              style={{
                boxSizing: "border-box",
                border: `3px solid ${vars.colors.grey[300]}`,
                width: "100%",
                borderRadius: "0.125rem",
                padding: "0.5rem",
                backgroundColor: vars.colors.grey[50],
              }}
            >
              <Text size="sm" bold className="ellipsis">
                {방제목}
              </Text>
              <Text size="sm" bold>
                {정원현황}
              </Text>
            </Flex>

            <Grid templateColumns="repeat(4, 1fr)" gapScale={0.2}>
              {new Array(8).fill(null).map((_, index) => {
                return (
                  <Flex key={index} justify="center" align="center">
                    <GridItem>
                      <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        gapScale={0.5}
                        style={{
                          width: "5rem",
                          height: "6rem",
                          border: `3px solid ${vars.colors.grey[300]}`,
                          borderRadius: "0.25rem",
                          backgroundColor: vars.colors.grey[50],
                        }}
                      >
                        <Image
                          alt=""
                          src="https://avatars.githubusercontent.com/u/64957267?v=4"
                          width={600}
                          height={600}
                          style={{
                            width: "3rem",
                            height: "3rem",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                        <Text
                          size="xs"
                          bold
                          className="ellipsis"
                          style={{ width: "3rem", textAlign: "center" }}
                        >
                          ryong9rrr
                        </Text>
                      </Flex>
                    </GridItem>
                  </Flex>
                );
              })}
            </Grid>

            <Flex direction="column">
              <ChatHistory chats={chats} />
              <ChatInput onSubmit={onSubmitChat} />
            </Flex>
          </Flex>

          <div
            style={{
              width: "10rem",
              borderRadius: "0.125rem",
              border: `3px solid ${vars.colors.grey[300]}`,
            }}
          >
            Right
          </div>
        </Flex>
      </Flex>
    </>
  );
};
