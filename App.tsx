import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

function calculateBAC(drinks: number, weight: number, gender: string, hours: number) {

// https://sunrisehouse.com/stop-drinking-alcohol/stages-intoxication/

//   Always eat before drinking, especially foods high in protein. Having food in your stomach will help slow the processing of alcohol. A person who has not eaten will hit a peak BAC typically between 1/2 hour to two hours of drinking. A person who has eaten will hit a peak BAC typically between 1 and 6 hours, depending on the amount of alcohol consumed.

// // The digestion process itself plays a large factor. For every person, no matter the size, the liver will only digest one standard drink per hour. This is why one drink per hour is recommended. This keeps the liver from being overloaded; it enables a person to maintain a safe BAC and achieve the social relaxation effect most desire.

// Carbonation speeds up absorption. Alcohol mixed with carbonated beverages such as Coca-Cola or tonic water will be absorbed more quickly into the bloodstream. This is also true for champagne and wine coolers.

// Marijuana reduces nausea, which can inhibit the body’s ability to remove harmful toxins by vomiting. Marijuana can increase the threshold required to illicit a vomit response.



// Mood can affect the way one reacts to alcohol. Slight improvements in mood occur at a BAC of approximately (.02-.05). At about a .07, mood begins to deteriorate. Feelings of depression and anxiety prior to drinking can increase or become exaggerated during and after drinking. Stress emotions such as depression, anxiety, and anger can also cause a change in the enzymes in the stomach, thus affecting how one processes alcohol.
  
  // so it's 14 grams of alcohol per drink, hours is measured in .5 
  // so the BAC should update every 5 minutes with # of grams drunk -- e.g. if you're a 160 lb man and you do 3 shots in a row (lets say 5 minutes), your bac is 0.08425498680856493...after 30 minutes, it's 0.07660498680856492, after an hour, it's  0.06810498680856493...but if you have another drink in the next half hour it's 0.08797331574475323 again.


  // so the addition of new drinks should recalculate the total number in the session, not erase it. BAC should always be measured in minutes and grams 
  // When you enter a drink, you should get a pop-up that says: if you drink a manhattan in the next hour, this is what will happen. If you drink a beer in the next hour, this is what will happen. Etc. 

  // r is the Widmark factor, which is 0.55 for women and 0.68 for men
  if (gender !== 'male' && gender !== 'female') {
      console.error('Invalid gender. Please specify "male" or "female".');
      return null;
  }

  const r = gender === 'male' ? 0.68 : 0.55

  // The Widmark Equation: BAC = (Alcohol Consumed in grams / (Body Weight in grams * r)) * 100 - (Metabolism Rate * Hours Passed)
  const alcoholConsumed = drinks * 14; // Assuming a standard drink contains 14 grams of pure alcohol
  const bodyWeight = weight * 453.592; // Convert weight from pounds to grams
  const metabolismRate = 0.017; // Average metabolism rate per hour. The actual metabolism rate can range from around 0.015 to 0.020 or even higher, depending on various factors like age, health, genetics, and other individual differences.

  const bac = ((alcoholConsumed / (bodyWeight * r)) * 100) - (metabolismRate * hours);

  // BAC should not go below 0
  return Math.max(0, bac);
}


// Example usage:
const bac = calculateBAC(4, 150, 'male', 2);
console.log(`Estimated BAC: ${bac.toFixed(4)}%`);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          // navigation.navigate('Details', {
          //   itemId: 86,
          //   otherParam: 'anything you want here',
          // });
          navigation.navigate('Details');
        }}
      />
    </View>
  );
}

function DrinkScreen({ route, navigation }) {
  const [drink, setDrink] = useState(null)
 // if drinkSet, options are edit or remove
 // if no drink set, options are add 

}

function DrinkSessionScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const [sessionDrinks, setSessionDrinks] = useState([])
  const [bac, setBac] = useState([])
  return (
    <View>
      {/* If session hasn't been started. Otherwise, should say end session */}
      <Button title='Start Session' />
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


    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Details Screen</Text>
    //   <Text>itemId: {JSON.stringify(itemId)}</Text>
    //   <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    //   <Button
    //     title="Go to Details... again"
    //     onPress={() =>
    //       navigation.push('Details', {
    //         itemId: Math.floor(Math.random() * 100),
    //       })
    //     }
    //   />
    //   <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    //   <Button title="Go back" onPress={() => navigation.goBack()} />
    // </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DrinkSessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;