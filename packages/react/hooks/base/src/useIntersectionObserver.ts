import { RefObject, useEffect, useState } from "react";

export interface UseIntersectionObserverProps {
  ref: RefObject<HTMLElement | null>;
  threshold?: number;
  rootMargin?: string;
  root?: IntersectionObserverInit["root"];
}

export const useIntersectionObserver = (
  props: UseIntersectionObserverProps,
  dep: unknown[] = [],
) => {
  const { ref, threshold = 0.5, rootMargin = "0%", root = null } = props;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const updateEntry = ([nextEntry]: IntersectionObserverEntry[]) => {
    if (nextEntry) {
      setEntry(nextEntry);
    }
  };

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      rootMargin,
      root,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, root, ...dep]);

  return entry;
};
