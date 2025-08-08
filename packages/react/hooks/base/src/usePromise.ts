import { useCallback, useEffect, useState } from "react";

export const usePromise = <T>(fn: () => Promise<T>) => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const refetch = useCallback(async () => {
    try {
      const data = await fn();
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    isPending,
    isError,
    data,
    refetch,
  };
};
