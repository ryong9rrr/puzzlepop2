"use client";

import Image from "next/image";
import { useCallback } from "react";
import { cdns } from "@puzzlepop2/cdn";
import { Flex } from "@puzzlepop2/react-components-layout";
import { useAlert } from "@puzzlepop2/react-hooks-alert";

type AlertType = "developing" | "error";

const AlertMapper: Record<AlertType, { src: string; description: string }> = {
  developing: {
    src: cdns.symbols.developing,
    description: "개발 중인 기능이에요",
  },
  error: {
    src: cdns.symbols.warning,
    description: "오류가 발생했어요. 다시 시도해주세요.",
  },
};

export const useAnimatedAlert = () => {
  const { alert: sharedAlert } = useAlert();

  const alert = useCallback((type: AlertType, description?: string) => {
    const { src, description: defaultDescription } = AlertMapper[type];
    sharedAlert({
      title: (
        <Flex justify="center">
          <div className="animate__animated animate__bounceIn" style={{ width: "6rem" }}>
            <Image
              priority
              unoptimized
              src={src}
              alt="https://www.flaticon.com/kr/free-icons/"
              layout="responsive"
              width={1}
              height={1}
            />
          </div>
        </Flex>
      ),
      description: description || defaultDescription,
    });
  }, []);

  return { alert };
};
