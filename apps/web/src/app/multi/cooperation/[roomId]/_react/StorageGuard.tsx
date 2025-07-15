"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "@puzzlepop2/react-components-button";
import { vars } from "@puzzlepop2/themes";
import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { TextField } from "@shared-components/TextField";

import { getCooperationGameSessionStorage } from "../../_storages/cooperationGameSessionStorage";

export const StorageGuard = ({ children }: PropsWithChildren) => {
  const [isInit, setIsInit] = useState(false);
  const [error, setError] = useState(false);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    try {
      getCooperationGameSessionStorage().getItem();
    } catch (e) {
      setError(true);
    }
    setIsInit(true);
  }, []);

  if (!isInit) {
    return null;
  }

  if (error) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ width: "100vw", height: "100vh", backgroundColor: vars.colors.grey[900] }}
      >
        <Box style={{ width: "40vw", padding: "1rem", backgroundColor: "white" }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log("구현해야함");
            }}
          >
            <Flex direction="column" gapScale={1}>
              <TextField
                title="닉네임"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
              />
              <Button
                type="submit"
                onClick={() => {
                  console.log("입장하기 클릭");
                }}
              >
                입장하기
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    );
  }

  return <>{children}</>;
};
