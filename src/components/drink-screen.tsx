import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import drinkDB from "../drink-data";



type DrinkProps = NativeStackScreenProps<
  RootStackParamList,
  "Drink",
  "MyStack"
>;
export default function DrinkScreen({ route, navigation }: DrinkProps) {

  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState("");
  
  const { passedDrinkId, sessionDrinks, setSessionDrinks } = route.params;

  const [drinkId, setDrinkId] = useState(passedDrinkId);

  if (drinkId) {
    return <View>Edit/Remove Drink here</View>;
  } else {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
