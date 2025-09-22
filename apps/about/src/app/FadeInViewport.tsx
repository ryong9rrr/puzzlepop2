"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

import MODULE_CSS from "./FadeInViewport.module.css";

export const FadeInViewport = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref || !ref.current) {
        return;
      }

      const { top, bottom } = ref.current.getBoundingClientRect();
      const isInViewport = top < window.innerHeight && bottom > 0;
      if (isInViewport) {
        ref.current.classList.add(MODULE_CSS.visible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={MODULE_CSS.hidden}>
      {children}
    </div>
  );
};
