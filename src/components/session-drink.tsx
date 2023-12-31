import { View, Text } from "react-native";
import { UserDrink } from "../types";


const SessionDrink = ({displayName, name, volume, timeEntered}: UserDrink) => {
    return (
        <View>
            <Text>{displayName[0]}</Text>
            <Text>{name}</Text>
            <Text>{timeEntered}</Text>
        </View>
    )
}

export default SessionDrink