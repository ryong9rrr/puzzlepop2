import { useEffect, useState } from "react";
import { Me } from "../types/base";

import { useInGameStore } from "./useInGameStore";
import { getMultiGameStorage } from "@puzzlepop/storage";
import { Text } from "@puzzlepop2/react-components-layout";

export const ComboToast = () => {
  const [me, setMe] = useState<Me | null>(null);
  const redComboCount = useInGameStore(state => state.redComboCount);
  const blueComboCount = useInGameStore(state => state.blueComboCount);

  const getComboCount = () => {
    if (!me) {
      return 0;
    }
    return me.team === "RED" ? redComboCount : blueComboCount;
  };

  useEffect(() => {
    const meInStorage = getMultiGameStorage().getItem();
    setMe(meInStorage);
  }, []);

  if (!me || (redComboCount === 0 && blueComboCount === 0)) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      <Text>{getComboCount()}</Text>
    </div>
  );
};
