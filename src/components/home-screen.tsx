import { View, Text } from "react-native";
import { Button } from "react-native-paper";

// TODO: fix type
export default function HomeScreen({ navigation }: any) {

    

    return (
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Button
        mode="contained"
          onPress={() => {
            navigation.navigate("DrinkSession");
          }}
        >Go to Drink Session</Button>
      </View>
    );
  }
  