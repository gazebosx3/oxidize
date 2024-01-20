import { useState } from "react";
import { FlatList, View } from "react-native";
import {
  calculateHoursAndMinutes,
  calculateBAC,
} from "../utils/calculation-utils";
import { wine, sevenPointFiveTwelveOz, doubleLiquor } from "../fake-data";
import { Profile, UserDrink } from "../types";
import SessionSummaryComponent from "./session-summary-component";
import SessionDrink from "./session-drink";
import { selectSex, selectWeight } from "./profile-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSessionDrinks,
  selectSessionEndTime,
  selectSessionStartTime,
  setSessionEndTime,
  setSessionStartTime,
} from "./drink-session-screen-slice";
import { Button, Text } from "react-native-paper";

// TODO: fix param type
export default function DrinkSessionScreen({ navigation, route }: any) {
  const startingBacVal =
    "Can't calulate BAC when no profile is set. Please set profile.";

  const dispatch = useDispatch();
  const sessionDrinks = useSelector(selectSessionDrinks) || [];
  const sessionStartTime = useSelector(selectSessionStartTime);
  const sessionEndTime = useSelector(selectSessionEndTime);
  const sex = useSelector(selectSex);
  const weight = useSelector(selectWeight);

  const isValidProfile =
    (sex === "M" || sex === "F") && !isNaN(parseFloat(weight));

  // const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  // const [sessionEndTime, setSessionEndTime] = useState<number>(0);
  // const [sessionDrinks, setSessionDrinks] = useState<UserDrink[]>([]);
  const [bac, setBac] = useState<string>(startingBacVal);

  if (sessionDrinks?.length && sessionDrinks[sessionDrinks.length - 1]) {
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

  function sessionStartOrEndButton() {
    if (!sessionStartTime) {
      return (
        <Button
          mode="contained"
          onPress={() => {
            dispatch(setSessionStartTime({ sessionStartTime }));
          }}
        >
          Start Session
        </Button>
      );
    } else {
      return (
        <Button
          mode="contained"
          onPress={() => {
            dispatch(setSessionEndTime({ sessionEndTime }));
          }}
        >
          End Session
        </Button>
      );
    }
  }

  return (
    <View>
      {
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Profile")} // I was gonna say should pass prop but really we just need to check if it exists in teh store
        >
          Add Sex and Weight
        </Button>
      }

      {/* Start/End session button */}
      {isValidProfile && sessionStartOrEndButton()}

      {/* Current BAC display */}
      <Text>
        {isValidProfile && sessionDrinks.length ? `Current BAC: ${bac}` : ""}
      </Text>

      {/* Add drink button */}
      {isValidProfile && !sessionEndTime && sessionStartTime && (
        <Button
          onPress={() =>
            navigation.navigate("Drink", {
              passedDrinkId: "", // TODO: pass the actual id
            })
          }
        >
          Add Drink
        </Button>
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
