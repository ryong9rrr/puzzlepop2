import { useEffect, useState } from "react";

export const usePromise = <T>(fn: () => Promise<T>) => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fn();
        setData(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    isPending,
    isError,
    data,
  };
};
