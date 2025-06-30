"use client";

import { useEffect, useState } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";

export const WindowSizeDetectAndWarning = () => {
  const { toast } = useToast();
  const { windowSize } = useWindowSizeDetect();

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

const useWindowSizeDetect = () => {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    return {
      width: 0,
      height: 0,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize };
};
