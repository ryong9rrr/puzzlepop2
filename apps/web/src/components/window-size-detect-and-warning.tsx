"use client";

import { useEffect } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";
import { useDetectWindowSize } from "@/hooks/useDetectWindowSize";

export const WindowSizeDetectAndWarning = () => {
  const { toast } = useToast();
  const windowSize = useDetectWindowSize();

  useEffect(() => {
    if (windowSize.width < 1024) {
      toast({
        payload: {
          message: "모바일 화면에서는 이용이 어려울 수 있어요",
        },
        duration: 5000,
      });
    }
  }, [windowSize]);

  return null;
};
