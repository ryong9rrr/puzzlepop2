"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { cdns } from "@puzzlepop2/cdn";
import { SkeletonCircle } from "@puzzlepop2/react-components-layout";

interface Props {
  size: number | string;
  src?: string;
}

export const Avatar = (props: Props) => {
  const { size, src } = props;

  const [isError, setIsError] = useState(false);

  return (
    <Suspense fallback={<SkeletonCircle size={size} />}>
      {isError ? (
        <Image
          priority
          alt=""
          src={cdns.symbols["user-avatar-default-svg"]}
          width={600}
          height={600}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <Image
          priority
          alt=""
          src={src || cdns.symbols["user-avatar-default-svg"]}
          width={600}
          height={600}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
            borderRadius: "50%",
            opacity: src ? 1 : 0.8,
          }}
          onError={() => setIsError(true)}
        />
      )}
    </Suspense>
  );
};
