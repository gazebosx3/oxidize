import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/home-screen";
import DrinkSessionScreen from "./components/drink-session-screen";
import DrinkScreen from "./components/drink-screen";
import {DrinkScreenParams, RootStackParamList} from './types'



const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DrinkSession" component={DrinkSessionScreen} />
        <Stack.Screen name="Drink" component={DrinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
