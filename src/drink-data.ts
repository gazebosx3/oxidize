import { DrinkTemplate } from "./types";
import { toCamelCase } from "./utils/utils";

export const DrinkABVMap: Record<string, number> = {
  BEER_4: 4,
  BEER_4_POINT_5: 4.5,
  BEER_5: 5,
  BEER_5_POINT_5: 5.5,
  BEER_6: 6,
  BEER_6_POINT_5: 6.5,
  BEER_7: 7,
  BEER_7_POINT_5: 7.5,
  BEER_8: 8,
  BEER_8_POINT_5: 8.5,
  BEER_9: 9,
  BEER_9_POINT_5: 9.5,
  BEER_10: 10,
  BEER_10_POINT_5: 10.5,
  WINE: 14,
  LIQUOR: 14,
  DOUBLE_LIQUOR: 28,
  MARTINI: 25.1,
  MANHATTAN: 25.5,
  APEROL_SPRITZ: 15,
  MARGARITA: 19.7,
  MOJITO: 20.3,
  OLD_FASHIONED: 20.7,
  COSMOPOLITAN: 19.4,
  MIMOSA: 9.8,
  BELLINI: 6.8,
  BLOODY_MARY: 16,
  PIMMS_CUP: 9.5,
};

const drinkDB = Object.entries(DrinkABVMap).map(
  (drinkPair: [string, number], idx: number): DrinkTemplate => {
    const [name, volume] = drinkPair;
    // TODO: display name should be an array of possible names, so "liquor" can have display name whisky, gin, rum, scotch, rye, bourbon, etc, and I can create a list of common beers that map to BEER_5 or whatever 
    const displayName = [toCamelCase(name.replace(/_/g,' '))]
    return { id: idx.toString(), name, volume, displayName };
  }
);

console.log(drinkDB);

// Base values should be able to be accessed but not modified
export default Object.freeze(drinkDB);
