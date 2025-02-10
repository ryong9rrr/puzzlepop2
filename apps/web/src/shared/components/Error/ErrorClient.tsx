"use client";

import { PropsWithChildren, useEffect } from "react";

export const ErrorClient = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    window.alert("에러가 발생했어요");
  }, []);

  return <div>{children}</div>;
};
