"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { vars } from "@puzzlepop2/themes";
import { Skeleton } from "@puzzlepop2/react-components-layout";

import { useWaitingStore } from "../useWaitingStore";
import { useAnimatedAlert } from "@shared-hooks/useAnimatedAlert";

const WIDTH = "9.8rem";
const HEIGHT = "6rem";

export const Picture = () => {
  const [isError, setIsError] = useState(false);

  const { alert } = useAnimatedAlert();
  const imgSrc = useWaitingStore(state => state.imgSrc);

  if (!imgSrc || isError) {
    return <Skeleton width={WIDTH} height={HEIGHT} />;
  }

  return (
    <Suspense fallback={<Skeleton width={WIDTH} height={HEIGHT} />}>
      <Image
        src={imgSrc}
        alt=""
        width={300}
        height={200}
        priority
        style={{
          width: WIDTH,
          height: HEIGHT,
          objectFit: "cover",
          margin: "0 auto",
          border: `2px solid ${vars.colors.grey[300]}`,
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
        onClick={() => alert("developing")}
        onError={() => setIsError(true)}
      />
    </Suspense>
  );
};
