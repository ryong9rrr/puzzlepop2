"use client";

import Image from "next/image";
import { useCallback } from "react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { useAlert } from "@puzzlepop2/react-hooks-alert";

import ROAD_WORK from "@public/road-work.webp";

export const useDevelopingAlert = () => {
  const { alert } = useAlert();

  const sorry = useCallback(() => {
    alert({
      title: (
        <Flex justify="center">
          <div className="animate__animated animate__bounceIn" style={{ width: "6rem" }}>
            <Image
              src={ROAD_WORK}
              alt="https://www.flaticon.com/kr/free-icons/"
              layout="responsive"
              width={1}
              height={1}
            />
          </div>
        </Flex>
      ),
      description: "개발 중인 기능이에요",
    });
  }, []);

  return { sorry };
};
