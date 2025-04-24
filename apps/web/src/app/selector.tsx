"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useAlert } from "@puzzlepop2/react-hooks-alert";
import { AlertTitle } from "./alert-title";

export const Selector = () => {
  const router = useRouter();
  const { alert } = useAlert();

  const showAlert = useCallback(() => {
    alert({
      title: <AlertTitle />,
      description: "개발 중인 기능이에요",
    });
  }, [alert]);

  return (
    <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="싱글게임"
          variant="shadow"
          size="lg"
          onClick={() => router.push("/singlegame")}
        >
          싱글게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button key="멀티게임" variant="shadow" size="lg" onClick={showAlert}>
          멀티게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button key="패치노트" variant="shadow" size="lg" onClick={showAlert}>
          패치노트
        </Button>
      </motion.div>
    </Flex>
  );
};
