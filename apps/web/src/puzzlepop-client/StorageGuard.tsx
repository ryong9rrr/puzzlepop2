"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { vars, Z_INDEX } from "@puzzlepop2/themes";
import { Box, Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { TextField } from "@shared-components/TextField";

import { useUserStore } from "./stores/useUserStore";
import { getMultiGameStorage } from "./storage";
import { useEnterRoom } from "./useEnterRoom";

interface Props extends PropsWithChildren {
  roomId: string;
  gameType: "COOPERATION" | "BATTLE";
}

export const StorageGuard = ({ children, roomId, gameType }: Props) => {
  const [isInit, setIsInit] = useState(false);
  const me = useUserStore(state => state.me);
  const setMe = useUserStore(state => state.setMe);

  const { toast } = useToast();
  const { nickname, setNickname, isLoading, fetchGetEnteredRoom } = useEnterRoom(roomId);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchGetEnteredRoom(e);
      const storageMe = getMultiGameStorage().getItem();
      if (storageMe) {
        setMe(storageMe);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          payload: {
            message: error.message,
          },
        });
        return;
      }
      toast({
        payload: {
          message: "다시 시도해주세요.",
        },
      });
    }
  };

  useEffect(() => {
    const storageMe = getMultiGameStorage().getItem();
    if (storageMe) {
      setMe(storageMe);
    }
    setIsInit(true);
  }, []);

  if (!isInit) {
    return (
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: vars.colors.black,
        }}
      />
    );
  }

  if (!me) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: vars.colors.black,
          zIndex: Z_INDEX.ALERT_Z_INDEX + 1,
        }}
      >
        <Box
          style={{
            width: "40vw",
            padding: "1rem",
            border: `3px solid ${vars.colors.grey[500]}`,
            borderRadius: "0.25rem",
            backgroundColor: vars.colors.white,
          }}
        >
          <form onSubmit={onSubmit}>
            <Flex direction="column" gapScale={1}>
              <TextField
                title="닉네임"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
              />
              <Button type="submit" isDisabled={!nickname || isLoading}>
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
