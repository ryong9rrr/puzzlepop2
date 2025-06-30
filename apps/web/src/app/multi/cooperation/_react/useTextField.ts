"use client";

import { ChangeEvent, useState } from "react";

export const useTextField = (defaultValue: string = "") => {
  const [text, setText] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return { text, onChange };
};
