import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { DrinkTemplate, RootStackParamList } from "../types";
import drinkDB from "../drink-data";
import { toCamelCase } from "../utils/utils";

type DrinkProps = NativeStackScreenProps<
  RootStackParamList,
  "Drink",
  "MyStack"
>;

type ItemProps = { name: string };

const Item = ({ name }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

function filterDrinkDb(str: string) {
  return drinkDB.filter((drink: DrinkTemplate) => {
    const { displayName } = drink;
    return (
      displayName.startsWith(str) ||
      displayName.toLowerCase().startsWith(str) ||
      toCamelCase(displayName).startsWith(str)
    );
  });
}

export default function DrinkScreen({ route, navigation }: DrinkProps) {
  const { passedDrinkId, sessionDrinks, setSessionDrinks } = route.params;

  const [drinkId, setDrinkId] = useState(passedDrinkId);
  const [text, onChangeText] = useState("Useless Text");
  const [searchResult, setSearchResult] = useState<DrinkTemplate[]>([]);

  const handleChangeText = (str: string) => {
    // TODO: add fuse.js for fuzzy searching to deshittify this
    const searchRes = filterDrinkDb(str);
    setSearchResult(searchRes);
    onChangeText(str);
  };

  if (drinkId) {
    return <View>Edit/Remove Drink heres</View>;
  } else {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={text}
        />
        {searchResult.length && (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => <Item name={item.displayName} />}
            keyExtractor={(item) => item.id}
          />
        )}
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});
