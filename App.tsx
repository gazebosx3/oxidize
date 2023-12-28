import * as React from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { DRINK_TYPE, Drink } from "./types";
import { calculateGramsOfAlcohol, calculateBAC, calculateHoursAndMinutes } from "./calculation-utils";




function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Drink Session"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          // navigation.navigate('Details', {
          //   itemId: 86,
          //   otherParam: 'anything you want here',
          // });
          navigation.navigate("Drink Session");
        }}
      />
    </View>
  );
}

function DrinkScreen({ route, navigation }) {
  const [drink, setDrink] = useState(null);
  // if drinkSet, options are edit or remove
  // if no drink set, options are add
}

type SessionSummaryComponentProps = {sessionDrinks: Drink[], bac: number}
function SessionSummaryComponent(props: SessionSummaryComponentProps ) {
  const {sessionDrinks, bac} = props;
  const sortedSessionDrinks = sessionDrinks.sort((a: Drink,b: Drink) => a.timeEntered-b.timeEntered)
  return (
    <>
      <Text>:
        {/* Note: this should be continuously calculated throughout the day */}
        {/* The "day" should start at 7 AM, for simplicity's sake*/}
        Current BAC: {bac.toFixed(3)}
      </Text>
      <ScrollView>
        {sortedSessionDrinks.map((drink: Drink) => {
          const { name, timeEntered, timeStarted } = drink;
          let str = `${name} finsihed at ${new Date(timeEntered).toString()}.`;
          if (timeStarted) {
            str += ` Drink took ${calculateHoursAndMinutes(
              timeEntered - timeStarted
            ).timeString} to finish.`; // Todo: more details
          }
          return <Text key={timeEntered}>{str}</Text>;
        })}
      </ScrollView>
    </>
  );
}



function DrinkSessionScreen({ route }) {
  const mockDrinks: Drink[] = [
    {
      name: "Wine",
      volume: 14,
      type: DRINK_TYPE.WINE,
      timeEntered: 1703723750000,
      timeStarted: 1703723449623,
    },
    {
      name: "Lil' Sumpin Sumpin",
      volume: calculateGramsOfAlcohol(12, 7.5),
      type: DRINK_TYPE.BEER_7_POINT_5,
      timeEntered: 1703725347540,
    },
    {
      name: "Double Whisky",
      volume: 14 * 2,
      type: DRINK_TYPE.LIQUOR,
      timeEntered: 1703721347540,
    }
  ];

  const {totalMinutes} = calculateHoursAndMinutes(Date.now() - mockDrinks[2].timeEntered)

  const mockBac = calculateBAC(mockDrinks.length, 210, 'male', totalMinutes)

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

  return (
    <View>
      {!sessionEndTime ? (
        sessionStartOrEndButton()
      ) : (
        <SessionSummaryComponent sessionDrinks={sessionDrinks} bac={bac} />
      )}

      {/* 
        - add drink 
        // so the addition of new drinks should recalculate the total number in the session, not erase it. BAC should always be measured in minutes and grams 
  // When you enter a drink, you should get a pop-up that says: if you drink a manhattan in the next hour, this is what will happen. If you drink a beer in the next hour, this is what will happen. Etc. 
        - edit drink
        - remove drink
        - all drinks should be displayed with time finished and time it will be/has beenoxidized 
          -- how does this work? Like if it takes you an hour to finish a drink...? Might need to research something
        - running calculation of BAC

      */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Drink Session" component={DrinkSessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
