"use client";

import { Suspense, useCallback, useState } from "react";
import Image from "next/image";
import { vars } from "@puzzlepop2/themes";
import { Skeleton } from "@puzzlepop2/react-components-layout";
import { useDevelopingAlert } from "@shared-hooks/useDevelopingAlert";

import { useGameDataStore } from "./useGameDataStore";

const WIDTH = "9.8rem";
const HEIGHT = "6rem";

export const Picture = () => {
  const { gameData } = useGameDataStore();
  const [isError, setIsError] = useState(false);
  const { sorry } = useDevelopingAlert();

  if (!gameData || isError) {
    return <Skeleton width={WIDTH} height={HEIGHT} />;
  }

  return (
    <Suspense fallback={<Skeleton width={WIDTH} height={HEIGHT} />}>
      <Image
        src={gameData.picture.encodedString}
        alt=""
        width={300}
        height={200}
        style={{
          width: WIDTH,
          height: HEIGHT,
          objectFit: "cover",
          margin: "0 auto",
          border: `2px solid ${vars.colors.grey[300]}`,
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
        onClick={() => sorry()}
        onError={() => setIsError(true)}
      />
    </Suspense>
  );
};
