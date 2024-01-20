import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/home-screen";
import DrinkSessionScreen from "./src/components/drink-session-screen";
import DrinkScreen from "./src/components/drink-screen";
import { DrinkScreenParams, RootStackParamList } from "./src/types";
import ProfileScreen from "./src/components/profile-screen";
import { Provider } from "react-redux";
import store from "./src/store";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DrinkSession" component={DrinkSessionScreen} />
            <Stack.Screen name="Drink" component={DrinkScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
