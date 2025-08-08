import { useState } from "react";

export const useToggle = () => {
  const [isActive, setIsActive] = useState(true);

  const toggle = () => setIsActive(prev => !prev);

  return {
    isActive,
    toggle,
  };
};
