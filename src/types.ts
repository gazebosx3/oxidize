
export interface Drink {
  name: string;
  volume: number; //in grams of alcohol
  timeStarted?: number;
  timeEntered?: number;
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
  Home: undefined,
  DrinkSession: undefined,
  Drink: DrinkScreenParams
};