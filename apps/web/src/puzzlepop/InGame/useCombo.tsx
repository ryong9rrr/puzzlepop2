import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Text } from "@puzzlepop2/react-components-layout";

type ComboType = {
  id: string;
  x: number;
  y: number;
  count: number;
  visible: boolean;
};

export const useCombo = () => {
  const [combos, setCombos] = useState<ComboType[]>([]);

  const addCombo = (combo: Omit<ComboType, "id" | "visible">) => {
    const id = uuid();
    setCombos(prev => [...prev, { ...combo, id, visible: true }]);

    setTimeout(() => {
      setCombos(prev => prev.map(c => (c.id === id ? { ...c, visible: false } : c)));

      setTimeout(() => {
        setCombos(prev => prev.filter(c => c.id !== id));
      }, 700);
    }, 300);
  };

  return {
    combos,
    addCombo,
  };
};

export const Combos = ({ combos }: { combos: ComboType[] }) => {
  return (
    <>
      {combos.map(({ id, x, y, count, visible }) => (
        <div key={id}>
          <DotLottieReact
            src="/lotties/stars-spark.lottie"
            autoplay
            loop
            speed={1}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
              width: "5rem",
              height: "5rem",
              zIndex: 99,
              pointerEvents: "none",
            }}
          />
          {count > 0 && (
            <Text
              className={`font-gameInline animate__animated ${visible ? "animate__bounceIn" : "animate__fadeOutUp"}`}
              size="sm"
              bold
              color="orange"
              style={{
                position: "absolute",
                top: `${y}px`,
                left: `${x}px`,
                zIndex: 99,
                pointerEvents: "none",
              }}
            >
              {count} Combo
            </Text>
          )}
        </div>
      ))}
    </>
  );
};
