import { View, Text } from "react-native";
import { UserDrink } from "../types";


// TODO: have this track what the BAC becomes upon this being added
const SessionDrink = ({displayName, name, volume, timeEntered}: UserDrink) => {
    return (
        <View>
            <Text>{displayName[0]} finished at {new Date(timeEntered).toISOString()}</Text>
        </View>
    )
}

export default SessionDrink