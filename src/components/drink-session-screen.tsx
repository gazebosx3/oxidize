import { useState } from "react";
import { Button, FlatList, View, Text } from "react-native";
import {
  calculateHoursAndMinutes,
  calculateBAC,
} from "../utils/calculation-utils";
import { wine, sevenPointFiveTwelveOz, doubleLiquor } from "../fake-data";
import { Profile, UserDrink } from "../types";
import SessionSummaryComponent from "./session-summary-component";
import SessionDrink from "./session-drink";
import { selectSex, selectWeight } from "./profile-slice";
import { useSelector } from "react-redux";

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
  const startingBacVal =
    "Can't calulate BAC when no profile is set. Please set profile.";

  const sex = useSelector(selectSex);
  const weight = useSelector(selectWeight);
  const isValidProfile =
    (sex === "M" || sex === "F") && !isNaN(parseFloat(weight));

  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [sessionEndTime, setSessionEndTime] = useState<number>(0);
  const [sessionDrinks, setSessionDrinks] = useState<UserDrink[]>([]);
  const [bac, setBac] = useState<string>(startingBacVal);

  if (sessionDrinks.length && sessionDrinks[sessionDrinks.length - 1]) {
    const { totalMinutes } = calculateHoursAndMinutes(
      Date.now() - sessionDrinks[sessionDrinks.length - 1].timeEntered
    );

    let newBac =
      "Can't calulate BAC when no profile is set. Please set profile.";
    if (isValidProfile) {
      newBac = calculateBAC(
        sessionDrinks.length,
        parseFloat(weight),
        sex,
        totalMinutes
      ).toFixed(3);
    }

    if (bac !== newBac) {
      setBac(newBac);
    }
  }

  return (
    <View>
      {
        <Button
          title="Add Sex and Weight" // should say "edit" if set
          onPress={() => navigation.navigate("Profile")} // I was gonna say should pass prop but really we just need to check if it exists in teh store
        />
      }

      {/* Start/End session button */}
      {sessionStartOrEndButton(
        sessionStartTime,
        setSessionStartTime,
        setSessionEndTime
      )}

      {/* Current BAC display */}
      {isValidProfile && sessionDrinks.length && <Text>Current BAC: {bac}</Text>}
      {/* Add drink button */}
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

      {/* List of session drinks */}
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
