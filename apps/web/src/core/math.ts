export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const getDivisors = (n: number): number[] => {
  if (n <= 0) {
    throw new Error("양수를 입력해야 합니다.");
  }

  const divisors: number[] = [];
  const sqrtN = Math.floor(Math.sqrt(n));
  for (let i = 1; i <= sqrtN; i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i !== n / i) {
        divisors.push(n / i);
      }
    }
  }
  return divisors.sort((a, b) => a - b);
};

export const getCommonDivisors = (a: number, b: number): number[] => {
  if (a <= 0 || b <= 0) {
    throw new Error("양수를 입력해야 합니다.");
  }
  return getDivisors(gcd(a, b));
};
