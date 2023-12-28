import { useState } from "react";
import { View } from "react-native";

export default function DrinkScreen({ route, navigation }) {
    const { passedDrinkId } = route.params;
  
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