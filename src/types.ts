export enum DRINK_TYPE {
  BEER_4,
  BEER_4_POINT_5,
  BEER_5,
  BEER_5_POINT_5,
  BEER_6,
  BEER_6_POINT_5,
  BEER_7,
  BEER_7_POINT_5,
  BEER_8,
  BEER_8_POINT_5,
  BEER_9,
  BEER_9_POINT_5,
  BEER_10,
  BEER_10_POINT_5,
  BEER_11,
  BEER_11_POINT_5,
  BEER_12,
  BEER_12_POINT_5,
  WINE,
  LIQUER,
  LIQUOR,
  COCKTAIL,
  BOOZY_COCKTAIL,
}

export interface Drink {
  name: string;
  volume: number; //in grams of alcohol
  type: DRINK_TYPE;
  timeStarted?: number;
  timeEntered: number;
}

export interface Session {
  startTime: number | null;
  endTime: number | null;
  sessionDrinks: Drink[];
  bac: number;
}

export interface Profile {
    sex: "M" | "F";
    weight: number;
}

export interface DrinkScreenParams {
  passedDrinkId: string;
  sessionDrinks: Drink[]
  setSessionDrinks: React.Dispatch<React.SetStateAction<Drink[]>>
}

export type RootStackParamList = {
  Home: null,
  DrinkSession: null,
  Drink: DrinkScreenParams
};