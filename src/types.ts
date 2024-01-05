interface BaseDrink {
  name: string;
  volume: number;
  displayName: string[];
}

export interface DrinkTemplate extends BaseDrink {
  id: string;
}

export interface UserDrink extends BaseDrink {
  timeStarted?: number;
  timeEntered: number;
}

export interface Session {
  startTime: number | null;
  endTime: number | null;
  sessionDrinks: UserDrink[];
  bac: number;
}

export type ProfileSexOption = "M" | "F" | "Enter Sex" | '';
export type ProfileWeightOption = number | "Enter Weight" | '';

export interface Profile {
  sex: ProfileSexOption
  weight: ProfileWeightOption
}

export interface DrinkScreenParams {
  passedDrinkId: string;
  sessionDrinks: UserDrink[];
  setSessionDrinks: React.Dispatch<React.SetStateAction<UserDrink[]>>;
}

export interface ProfileScreenParams {
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  profile?: Profile;
}

export type RootStackParamList = {
  Home: undefined;
  DrinkSession: undefined;
  Profile: ProfileScreenParams;
  Drink: DrinkScreenParams;
};
