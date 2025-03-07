type Callback<T> = () => T;

export const sleep = <T>(callback: Callback<T>, ms: number): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = callback();
      resolve(result);
    }, ms);
  });
};
