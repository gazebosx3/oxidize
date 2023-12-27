enum DrinkType {
  BEER_4,
  BEER_5,
  BEER_6,
  BEER_7,
  BEER_8,
  BEER_9,
  BEER_10,
  BEER_11,
  BEER_12,
  WINE,
  LIQUER,
  LIQUOR,
  COCKTAIL,
  BOOZY_COCKTAIL,
}

interface Drink {
  name: string;
  volume: number; //in grams of alcohol
  type: DrinkType;
  timeStarted?: Date;
  timeEntered: Date;
}

interface Session {
  startTime: Date | null;
  endTime: Date | null;
  sessionDrinks: Drink[];
  bac: number;
}

interface Profile {
    sex: "M" | "F";
    weight: number;
}