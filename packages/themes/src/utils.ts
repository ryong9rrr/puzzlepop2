export const hexToRGB = (color: string) => {
  if (color.length !== 7 || color[0] !== "#") {
    throw new Error("#xxxxxx 형태의 색상을 입력해주세요");
  }
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return { r, g, b };
};
