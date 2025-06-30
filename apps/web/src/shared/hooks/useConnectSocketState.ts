import { useCallback, useMemo, useState } from "react";

export const useConnectSocketState = () => {
  const [isConnectedGameSocket, setIsConnectedGameSocket] = useState(false);

  const [isConnectedChatSocket, setIsConnectedChatSocket] = useState(false);

  const isLoadingComplete = useMemo(() => {
    return isConnectedGameSocket && isConnectedChatSocket;
  }, [isConnectedChatSocket, isConnectedGameSocket]);

  const connectGameSocket = useCallback(() => {
    setIsConnectedGameSocket(true);
  }, []);

  const connectChatSocket = useCallback(() => {
    setIsConnectedChatSocket(true);
  }, []);

  return {
    isLoadingComplete,
    connectGameSocket,
    connectChatSocket,
  };
};
