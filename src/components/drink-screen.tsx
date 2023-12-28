import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../types";


type DrinkProps = NativeStackScreenProps<RootStackParamList, 'Drink', 'MyStack'>;

export default function DrinkScreen({ route, navigation }: DrinkProps) {
    const { passedDrinkId, sessionDrinks, setSessionDrinks } = route.params;
  
    const [drinkId, setDrinkId] = useState(passedDrinkId);

    if (drinkId) {
        return (
            <View>
                Edit/Remove Drink here
            </View>
        )
    } else {
        return (
            <View>
                Add drink should go here
            </View>
        )
    }
  }