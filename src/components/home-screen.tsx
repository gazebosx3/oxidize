import { Button, View, Text } from "react-native";

// TODO: fix type
export default function HomeScreen({ navigation }: any) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Drink Session"
          onPress={() => {
            navigation.navigate("DrinkSession");
          }}
        />
      </View>
    );
  }
  