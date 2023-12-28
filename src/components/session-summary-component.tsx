import * as React from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { Drink } from "../types";
import { calculateHoursAndMinutes } from "../calculation-utils";

type SessionSummaryComponentProps = { sessionDrinks: Drink[]; bac: number };
export default function SessionSummaryComponent(props: SessionSummaryComponentProps) {
  const { sessionDrinks, bac } = props;
  const sortedSessionDrinks = sessionDrinks.sort(
    (a: Drink, b: Drink) => a.timeEntered - b.timeEntered
  );
  return (
    <>
      <Text>
        :{/* Note: this should be continuously calculated throughout the day */}
        {/* The "day" should start at 7 AM, for simplicity's sake*/}
        Current BAC: {bac.toFixed(3)}
      </Text>
      <ScrollView>
        {sortedSessionDrinks.map((drink: Drink) => {
          const { name, timeEntered, timeStarted } = drink;
          let str = `${name} finsihed at ${new Date(timeEntered).toString()}.`;
          if (timeStarted) {
            str += ` Drink took ${
              calculateHoursAndMinutes(timeEntered - timeStarted).timeString
            } to finish.`; // Todo: more details
          }
          return <Text key={timeEntered}>{str}</Text>;
        })}
      </ScrollView>
    </>
  );
}