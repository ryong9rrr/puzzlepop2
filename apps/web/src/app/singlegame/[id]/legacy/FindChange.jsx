// 상하 피스를 맞출때 x축 기준 보정값 계산
const findXUp = (nowShape, preShape) => {
  const nL = nowShape.leftTab;
  const nR = nowShape.rightTab;
  const pL = preShape.leftTab;
  const pR = preShape.rightTab;

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
const findYUp = (nowShape, preShape) => {
  const sum = nowShape.topTab + nowShape.bottomTab + preShape.topTab + preShape.bottomTab;

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
const findYChange = (nowShape, preShape) => {
  const nT = nowShape.topTab;
  const nB = nowShape.bottomTab;
  const pT = preShape.topTab;
  const pB = preShape.bottomTab;

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
const findXChange = (nowShape, preShape) => {
  const sum = nowShape.leftTab + nowShape.rightTab + preShape.leftTab + preShape.rightTab;

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

const FindChange = { findXUp, findYUp, findXChange, findYChange };
export default FindChange;
