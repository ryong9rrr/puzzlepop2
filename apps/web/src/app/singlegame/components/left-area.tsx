"use client";

import { Text } from "@puzzlepop2/react-components-layout";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

const _LeftArea = () => {
  const containerRoot = document.getElementById("single-page-sticky-left-area");

  if (!containerRoot) {
    return null;
  }

  return createPortal(
    <div>
      <Text>여기에 선택된 카드를...</Text>
    </div>,
    containerRoot,
  );
};

export const LeftArea = dynamic(() => Promise.resolve(_LeftArea), {
  ssr: false,
  loading: () => <Text>Loading...</Text>,
});
