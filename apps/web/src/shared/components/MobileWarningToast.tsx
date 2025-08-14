"use client";

import { useEffect, useState } from "react";
import { useToast } from "@puzzlepop2/react-hooks-toast";

const MIN_WIDTH = 1024;

export const MobileWarningToast = () => {
  const { toast } = useToast();
  const { windowSize } = useWindowSizeDetect();

  useEffect(() => {
    if (windowSize.width < MIN_WIDTH) {
      toast({
        payload: {
          message: "작은 화면은 이용이 어려워요",
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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowSize };
};
