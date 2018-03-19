import {
  ERROR_OFFSET, MAX_POWER_CHANGE,
  PIKAGREAT_ERROR, GREAT_ERROR, GOOD_ERROR, BAD_ERROR, GRADE_PROPS,
} from "./constants";

export const calcNextPower = (power, error) => {
  const changeRate = 2.0 / (1.0 + (error / ERROR_OFFSET) ** 2) - 1;
  const nextPower = power + Math.floor(MAX_POWER_CHANGE * changeRate);

  return Math.max(nextPower, 0);
};

export const getImgUrl = power => {
  const imgNum = Math.floor(power / 100);

  return `/imgs/character${imgNum}.png`;
};

export const getGradeProps = error => {
  const grade = getGrade(error);
  return GRADE_PROPS[grade];
};
const getGrade = error => {
  const absError = Math.abs(error);
  if (absError < PIKAGREAT_ERROR) return 'pikagreat';
  else if (absError < GREAT_ERROR) return 'great';
  else if (absError < GOOD_ERROR) return 'good';
  else if (absError < BAD_ERROR) return 'bad';
  else return 'poor'
};
