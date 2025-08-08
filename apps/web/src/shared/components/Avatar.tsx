"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { SkeletonCircle } from "@puzzlepop2/react-components-layout";

import userAvatarDefaultSvg from "@public/svgs/user-avatar-default.svg";

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
          src={userAvatarDefaultSvg}
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
          src={src || userAvatarDefaultSvg}
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
