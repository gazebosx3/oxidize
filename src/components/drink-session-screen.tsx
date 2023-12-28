import { useState } from "react";
import { Button, View } from "react-native";
import { calculateHoursAndMinutes, calculateBAC } from "../calculation-utils";
import { wine, lilSumpinSumpin, doubleWhisky } from "../fake-data";
import { Drink } from "../types";
import SessionSummaryComponent from "./session-summary-component";

export default function DrinkSessionScreen({ navigation, route }) {
    const mockDrinks: Drink[] = [wine, lilSumpinSumpin, doubleWhisky];
  
    const { totalMinutes } = calculateHoursAndMinutes(
      Date.now() - mockDrinks[2].timeEntered
    );
  
    const mockBac = calculateBAC(mockDrinks.length, 210, "male", totalMinutes);
  
    const [sessionStartTime, setSessionStartTime] = useState<number>(0);
    const [sessionEndTime, setSessionEndTime] = useState<number>(0);
    const [sessionDrinks, setSessionDrinks] = useState<Drink[]>(mockDrinks);
    const [bac, setBac] = useState<number>(mockBac);
  
    function sessionStartOrEndButton() {
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
  
    if (!sessionEndTime) {
      return (
        <View>
          {sessionStartOrEndButton()}
          <Button
            title="Add Drink"
            onPress={() => navigation.navigate("Drink")}
          />
        </View>
      );
    } else {
      return (
        <View>
          <SessionSummaryComponent sessionDrinks={sessionDrinks} bac={bac} />
        </View>
      );
    }
  
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