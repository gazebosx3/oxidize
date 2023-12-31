import * as React from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { UserDrink } from "../types";
import { calculateHoursAndMinutes } from "../utils/calculation-utils";

type SessionSummaryComponentProps = { sessionDrinks: UserDrink[]; bac: number };
export default function SessionSummaryComponent(props: SessionSummaryComponentProps) {
  const { sessionDrinks, bac } = props;
  const sortedSessionDrinks = sessionDrinks.sort(
    // @ts-ignore
    (a: UserDrink, b: UserDrink) => a.timeEntered - b.timeEntered
  );
  return (
    <>
      <Text>
        :{/* Note: this should be continuously calculated throughout the day */}
        {/* The "day" should start at 7 AM, for simplicity's sake*/}
        Current BAC: {bac.toFixed(3)}
      </Text>
      <ScrollView>
        {sortedSessionDrinks.map((drink: UserDrink) => {
          const { name, timeEntered, timeStarted } = drink;
          // @ts-ignore
          let str = `${name} finsihed at ${new Date(timeEntered).toString()}.`;
          if (timeStarted) {
            str += ` UserDrink took ${
              // @ts-ignore
              calculateHoursAndMinutes(timeEntered - timeStarted).timeString
            } to finish.`; // Todo: more details
          }
          return <Text key={timeEntered}>{str}</Text>;
        })}
      </ScrollView>
    </>
  );
}