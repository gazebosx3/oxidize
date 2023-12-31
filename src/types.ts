interface BaseDrink {
  name: string;
  volume: number;
  displayName: string[];
}

export interface DrinkTemplate extends BaseDrink {
  id: string
}

export interface UserDrink extends BaseDrink {
  timeStarted?: number;
  timeEntered?: number;
}

export interface Session {
  startTime: number | null;
  endTime: number | null;
  sessionDrinks: UserDrink[];
  bac: number;
}

export interface Profile {
    sex: "M" | "F";
    weight: number;
}

export interface DrinkScreenParams {
  passedDrinkId: string;
  sessionDrinks: UserDrink[]
  setSessionDrinks: React.Dispatch<React.SetStateAction<UserDrink[]>>
}

export type RootStackParamList = {
  Home: undefined,
  DrinkSession: undefined,
  Drink: DrinkScreenParams
};