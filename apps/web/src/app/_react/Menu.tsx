"use client";

import { motion } from "motion/react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { useNavigation } from "@router/useNavigation";
import { useDevelopingAlert } from "@shared-hooks/useDevelopingAlert";

export const Menu = () => {
  const navigate = useNavigation();
  const { sorry } = useDevelopingAlert();

  return (
    <Flex direction="column" className="font-gameOutline" gapScale={0.4}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button key="싱글게임" variant="shadow" size="lg" onClick={() => navigate.push("/single")}>
          싱글게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="멀티게임"
          variant="shadow"
          size="lg"
          onClick={() => {
            sorry();
          }}
        >
          멀티게임
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          key="패치노트"
          variant="shadow"
          size="lg"
          onClick={() => {
            sorry();
          }}
        >
          패치노트
        </Button>
      </motion.div>
    </Flex>
  );
};
