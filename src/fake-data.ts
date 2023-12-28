import { calculateGramsOfAlcohol } from "./calculation-utils";
import { DRINK_TYPE } from "./types";




export const wine = {
  name: "Wine",
  volume: 14,
  type: DRINK_TYPE.WINE,
  timeEntered: 1703723750000,
  timeStarted: 1703723449623,
};
export const sevenPointFiveTwelveOz= {
  name: "Lil' Sumpin Sumpin",
  volume: calculateGramsOfAlcohol(12, 7.5),
  type: DRINK_TYPE.BEER_7_POINT_5,
  timeEntered: 1703725347540,
};
export const doubleLiquor = {
  name: "Double Whisky",
  volume: 14 * 2,
  type: DRINK_TYPE.LIQUOR,
  timeEntered: 1703721347540,
};
