import { Button, View, Text, TextInput } from "react-native";
import {
  Profile,
  ProfileSexOption,
  ProfileWeightOption,
  RootStackParamList,
} from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile",
  "MyStack"
>;

// TODO: when adding account fetch back end
export default function ProfileScreen({ route, navigation }: ProfileProps) {
  const { setProfile, profile } = route.params;

  const startingProfile = profile || {
    sex: "Enter Sex",
    weight: "Enter Weight",
  };

  const [localSex, setLocalSex] = useState<string>("Enter Sex");
  const [localWeight, setLocalWeight] = useState<string>("Enter Weight");
  const [enteringSex, setEnteringSex] = useState<boolean>(false);
  const [enteringWeight, setEnteringWeight] = useState<boolean>(false);

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
          <TextInput onChangeText={setLocalSex} value={localSex} />
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
        <TextInput onChangeText={setLocalWeight} value={localWeight} />
      )}
    </View>
  );
}
