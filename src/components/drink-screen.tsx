import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  GestureResponderEvent,
} from "react-native";
import { DrinkTemplate, RootStackParamList, UserDrink } from "../types";
import drinkDB from "../drink-data";
import { toCamelCase } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSessionDrinks,
  setSessionDrinks,
} from "./drink-session-screen-slice";
import { v4 as uuidv4 } from "uuid";

type DrinkProps = NativeStackScreenProps<
  RootStackParamList,
  "Drink",
  "MyStack"
>;

type ItemProps = {
  name: string;
  handleDrinkSelection: (string: string) => void;
};

const Item = ({ name, handleDrinkSelection }: ItemProps) => (
  <View>
    <Text onPress={() => handleDrinkSelection(name)}>{name}</Text>
  </View>
);

function filterDrinkDb(str: string) {
  return drinkDB.filter((drink: DrinkTemplate) => {
    const { displayName } = drink;
    return (
      displayName[0].startsWith(str) ||
      displayName[0].toLowerCase().startsWith(str) ||
      toCamelCase(displayName[0]).startsWith(str)
    );
  });
}

export default function DrinkScreen({ route, navigation }: DrinkProps) {
  const { passedDrinkId } = route.params;

  const sessionDrinks = useSelector(selectSessionDrinks);
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");
  const [searchResult, setSearchResult] = useState<DrinkTemplate[]>([]);

  const handleChangeText = (str: string) => {
    // TODO: add fuse.js for fuzzy searching to deshittify this
    const searchRes = filterDrinkDb(str);
    setSearchResult(searchRes);
    onChangeText(str);
  };

  const handleDrinkSelection = (drinkName: string) => {
    const selectDrinkTemplate = drinkDB.find((dt: DrinkTemplate) =>
      dt.displayName.includes(drinkName)
    );

    if (!selectDrinkTemplate) {
      throw new Error("This should never happen");
    }

    const { displayName, volume, name } = selectDrinkTemplate;

    const newUserDrink: UserDrink = {
      displayName,
      volume,
      name,
      timeEntered: Date.now(),
      sessionDrinkId: uuidv4(),
    };

    const newDrinks = [...sessionDrinks, newUserDrink];
    dispatch(setSessionDrinks({ drinks: newDrinks }));
    navigation.navigate("DrinkSession");
  };

  if (passedDrinkId) {
    return <View>Edit/Remove Drink heres</View>;
  } else {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={text}
        />
        {searchResult.length ? (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <Item
                name={item.displayName[0]}
                handleDrinkSelection={handleDrinkSelection}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}
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
  // item: {
  //   backgroundColor: "#f9c2ff",
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // name: {
  //   fontSize: 32,
  // },
});
