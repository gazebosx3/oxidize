import { useState } from "react";
import { Button, FlatList, View, Text } from "react-native";
import {
  calculateHoursAndMinutes,
  calculateBAC,
} from "../utils/calculation-utils";
import { wine, sevenPointFiveTwelveOz, doubleLiquor } from "../fake-data";
import { UserDrink } from "../types";
import SessionSummaryComponent from "./session-summary-component";
import SessionDrink from "./session-drink";

function sessionStartOrEndButton(
  sessionStartTime: number,
  setSessionStartTime: React.Dispatch<React.SetStateAction<number>>,
  setSessionEndTime: React.Dispatch<React.SetStateAction<number>>
) {
  if (!sessionStartTime) {
    return (
      <Button
        title="Start Session"
        onPress={() => {
          console.log("Placeholder for session Start");
          setSessionStartTime(Date.now());
        }}
      />
    );
  } else {
    return (
      <Button
        title="End Session"
        onPress={() => {
          console.log("Placeholder for session end");
          setSessionEndTime(Date.now());
        }}
      />
    );
  }
}

// TODO: fix param type
export default function DrinkSessionScreen({ navigation, route }: any) {
  // const mockDrinks: UserDrink[] = [wine, sevenPointFiveTwelveOz, doubleLiquor];

  // const { totalMinutes } = calculateHoursAndMinutes(
  //   Date.now() - (mockDrinks[2].timeEntered as number)
  // );

  // const mockBac = calculateBAC(mockDrinks.length, 210, "male", totalMinutes);

  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [sessionEndTime, setSessionEndTime] = useState<number>(0);
  const [sessionDrinks, setSessionDrinks] = useState<UserDrink[]>([]);
  const [bac, setBac] = useState<string>('0');

  let startingBac = 0;

  console.log(sessionDrinks[sessionDrinks.length - 1 ])

  if (
    sessionDrinks.length &&
    sessionDrinks[sessionDrinks.length - 1]
  ) {
    const { totalMinutes } = calculateHoursAndMinutes(
      Date.now() - sessionDrinks[sessionDrinks.length - 1].timeEntered
    );

    const newBac = calculateBAC(sessionDrinks.length, 210, 'male', totalMinutes).toFixed(3) 

    if (bac !== newBac) {
      setBac(newBac)
    }

  }

  // const [bac, setBac] = useState<number>(calculateBAC(sessionDrinks.length, 210, "male", totalMinutes) as number);


  return (
    <View>
      {sessionStartOrEndButton(
        sessionStartTime,
        setSessionStartTime,
        setSessionEndTime
      )}
      <Text>Current BAC: {bac}</Text>
      {!sessionEndTime && sessionStartTime && (
        <Button
          title="Add Drink"
          onPress={() =>
            navigation.navigate("Drink", {
              passedDrinkId: "",
              sessionDrinks,
              setSessionDrinks,
            })
          }
        />
      )}
      {sessionDrinks.length && (
        <FlatList
          data={sessionDrinks}
          renderItem={({ item }) => (
            <SessionDrink
              timeEntered={item.timeEntered}
              name={item.name}
              displayName={item.displayName}
              volume={item.volume}
            />
          )}
        />
      )}
    </View>
  );

  /* 
          - add drink 
          // so the addition of new drinks should recalculate the total number in the session, not erase it. BAC should always be measured in minutes and grams 
    // When you enter a drink, you should get a pop-up that says: if you drink a manhattan in the next hour, this is what will happen. If you drink a beer in the next hour, this is what will happen. Etc. 
          - edit drink
          - remove drink
          - all drinks should be displayed with time finished and time it will be/has beenoxidized 
            -- how does this work? Like if it takes you an hour to finish a drink...? Might need to research something
          - running calculation of BAC
  
        */
}
