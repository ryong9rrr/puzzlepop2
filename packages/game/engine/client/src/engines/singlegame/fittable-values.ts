import { Shape } from "@puzzlepop2/game-core";

// TODO: 여기는 EASY, NORMAL
// 상하 피스를 맞출때 x축 기준 보정값 계산
export const findXUp = (nowShape: Shape, preShape: Shape) => {
  const nL = nowShape.left;
  const nR = nowShape.right;
  const pL = preShape.left;
  const pR = preShape.right;

  let xUp = 0;

  if (nL === pL && nR === pR) {
    xUp = 0;
  } else if (nL === nR && pL === pR) {
    xUp = 0;
  } else {
    if (nR === 0 || (nR === 1 && pR === 1)) {
      xUp = 5 * nL * -1;
    } else if (nR === 1 && pR === -1) {
      xUp = nL === pL ? 5 : 10;
    } else if (nR === -1 && pR === 1) {
      xUp = nL === pL ? -5 : -10;
    } else {
      xUp = 5 * nL * -1;
    }
  }
  return xUp;
};

// 상하 피스를 맞출때 y축 기준 보정값 계산
export const findYUp = (nowShape: Shape, preShape: Shape) => {
  const sum = nowShape.top + nowShape.bottom + preShape.top + preShape.bottom;

  let yUp = 0;

  if (sum === 1 || sum === -2) {
    yUp = -5;
  } else if (sum === 2) {
    yUp = 5;
  } else if (sum === -1) {
    yUp = -10;
  }

  return yUp;
};

// 좌우 피스를 맞출때 y축 기준 보정값 계산
export const findYChange = (nowShape: Shape, preShape: Shape) => {
  const nT = nowShape.top;
  const nB = nowShape.bottom;
  const pT = preShape.top;
  const pB = preShape.bottom;

  const sum = nT + nB + pT + pB;
  let yChange = 0;

  if (nT === pT && nB === pB) {
    yChange = 0;
  } else if (nT === nB && pT === pB) {
    yChange = 0;
  } else {
    if (nT === 0) {
      yChange = 5 * nB;
    } else if (nB === 0) {
      yChange = 5 * pT;
    } else if (pT === nB) {
      yChange = 5 * pT;
    } else {
      if (Math.abs(sum) === 1) {
        yChange = sum * -5;
      } else {
        yChange = (sum * -5) / 2;
      }
    }
  }
  return yChange;
};

// 좌우 피스를 맞출때 x축 기준 보정값 계산
export const findXChange = (nowShape: Shape, preShape: Shape) => {
  const sum = nowShape.left + nowShape.right + preShape.left + preShape.right;

  let xChange = -5;

  if (sum === -1) {
    xChange = -10;
  } else if (sum === -2) {
    xChange = -7;
  } else if (sum === 0) {
    xChange = 0;
  } else if (sum === 2) {
    xChange = 5;
  }

  return xChange;
};

// // TODO: 여기는 HARD
// // 상하 피스를 맞출때 x축 기준 보정값 계산
// export const findXUp = (nowShape: Shape, preShape: Shape) => {
//   const nL = nowShape.left;
//   const nR = nowShape.right;
//   const pL = preShape.left;
//   const pR = preShape.right;

//   let xUp = 0;

//   if (nL === pL && nR === pR) {
//     xUp = 0;
//   } else if (nL === nR && pL === pR) {
//     xUp = 0;
//   } else {
//     if (nR === 0 || (nR === 1 && pR === 1)) {
//       xUp = 3 * nL * -1;
//     } else if (nR === 1 && pR === -1) {
//       xUp = nL === pL ? 3 : 6;
//     } else if (nR === -1 && pR === 1) {
//       xUp = nL === pL ? -3 : -4;
//     } else {
//       xUp = 3 * nL * -1;
//     }
//   }
//   return xUp;
// };

// // 상하 피스를 맞출때 y축 기준 보정값 계산
// export const findYUp = (nowShape: Shape, preShape: Shape) => {
//   const sum = nowShape.top + nowShape.bottom + preShape.top + preShape.bottom;

//   let yUp = 0;

//   if (sum === 1 || sum === -2) {
//     yUp = -3;
//   } else if (sum === 2) {
//     yUp = 3;
//   } else if (sum === -1) {
//     yUp = -6;
//   }

//   return yUp;
// };

// // 좌우 피스를 맞출때 y축 기준 보정값 계산
// export const findYChange = (nowShape: Shape, preShape: Shape) => {
//   const nT = nowShape.top;
//   const nB = nowShape.bottom;
//   const pT = preShape.top;
//   const pB = preShape.bottom;

//   const sum = nT + nB + pT + pB;
//   let yChange = 0;

//   if (nT === pT && nB === pB) {
//     yChange = 0;
//   } else if (nT === nB && pT === pB) {
//     yChange = 0;
//   } else {
//     if (nT === 0) {
//       yChange = 3 * nB;
//     } else if (nB === 0) {
//       yChange = 3 * pT;
//     } else if (pT === nB) {
//       yChange = 3 * pT;
//     } else {
//       if (Math.abs(sum) === 1) {
//         yChange = sum * -3;
//       } else {
//         yChange = (sum * -3) / 2;
//       }
//     }
//   }
//   return yChange;
// };

// // 좌우 피스를 맞출때 x축 기준 보정값 계산
// export const findXChange = (nowShape: Shape, preShape: Shape) => {
//   const sum = nowShape.left + nowShape.right + preShape.left + preShape.right;

//   let xChange = -4;

//   if (sum === -1) {
//     xChange = -6;
//   } else if (sum === -2) {
//     xChange = -6;
//   } else if (sum === 0) {
//     xChange = 0;
//   } else if (sum === 2) {
//     xChange = 3;
//   }

//   return xChange;
// };
