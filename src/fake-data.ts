import { calculateGramsOfAlcohol } from "./utils/calculation-utils";




export const wine = {
  name: "Wine",
  volume: 14,
  displayName: 'Wine',
  timeEntered: 1703723750000,
  timeStarted: 1703723449623,
};
export const sevenPointFiveTwelveOz= {
  name: "Lil' Sumpin Sumpin",
  displayName: 'Lil',
  volume: calculateGramsOfAlcohol(12, 7.5),
  timeEntered: 1703725347540,
};
export const doubleLiquor = {
  name: "Double Whisky",
  displayName: "Double",
  volume: 14 * 2,
  timeEntered: 1703721347540,
};
