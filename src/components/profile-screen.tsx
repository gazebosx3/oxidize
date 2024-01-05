import { Button, View, Text, TextInput } from "react-native";
import {
  Profile,
  ProfileSexOption,
  ProfileWeightOption,
  RootStackParamList,
} from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import React from "react";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile",
  "MyStack"
>;

// TODO: when adding account fetch back end
export default function ProfileScreen({ route, navigation }: ProfileProps) {
  const { setProfile, profile } = route.params;

  const [localSex, setLocalSex] = useState<string>("Enter Sex");
  const [localWeight, setLocalWeight] = useState<string>("Enter Weight");
  const [enteringSex, setEnteringSex] = useState<boolean>(false);
  const [enteringWeight, setEnteringWeight] = useState<boolean>(false);

  // TODO: make this better
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('transitionStart', (e) => {
  //     console.log('GOing back!!')
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  return (
    <View>
      {
        // SEX
        !enteringSex ? (
          <Text
            onPress={() => {
              setLocalSex("");
              setEnteringSex(true);
            }}
          >
            Sex: {localSex}
          </Text>
        ) : (
          <Picker
            selectedValue={localSex}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Value changed");
              setLocalSex(itemValue);
              setEnteringSex(false);
            }}
          >
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
          </Picker>
        )

        // WEIGHT
      }
      {!enteringWeight ? (
        <Text
          onPress={() => {
            setLocalWeight("");
            setEnteringWeight(true);
          }}
        >
          Weight: {localWeight}
        </Text>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Text>Weight:</Text>
          <TextInput
            onChangeText={setLocalWeight}
            value={localWeight}
            onBlur={() => console.log("hi weight")}
          />
        </View>
      )}
      <Button
        title="Submit"
        onPress={() => {
          setProfile({
            sex: localSex as ProfileSexOption,
            weight: localWeight as ProfileWeightOption,
          });
          navigation.navigate('DrinkSession')
        }}
      />
    </View>
  );
}