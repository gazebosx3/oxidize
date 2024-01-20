import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Profile,
  ProfileSexOption,
  ProfileWeightOption,
  RootStackParamList,
} from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSex,
  selectWeight,
  setSexAndWeight,
  setWeight,
} from "./profile-slice";
import { Text, SegmentedButtons, TextInput, Button } from "react-native-paper";
type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile",
  "MyStack"
>;

// TODO: when adding account fetch back end
export default function ProfileScreen({ route, navigation }: ProfileProps) {
  const sex = useSelector(selectSex);
  const weight = useSelector(selectWeight);
  const dispatch = useDispatch();

  // TODO: eventually replace localSex and localWeight with debounced dispatch to store. For now I guess it's finef
  const [localSex, setLocalSex] = useState<string>(sex || "Enter Sex");
  const [localWeight, setLocalWeight] = useState<string>(
    weight || ""
  );
  return (
    <SafeAreaView>
      {
        // SEX
        <View>
          <SegmentedButtons
            value={localSex}
            onValueChange={setLocalSex}
            buttons={[
              {
                value: "M",
                label: "Male",
              },
              {
                value: "F",
                label: "Female",
              },
            ]}
          />
        </View>
      }
      {
        // WEIGHT
        
          <SafeAreaView>
            <TextInput
            mode="outlined"
              placeholder="Enter Weight"
              onChangeText={setLocalWeight}
              value={localWeight}
              onBlur={() => dispatch(setWeight(localWeight))}
            />
          </SafeAreaView>
        
      }
      <Button
        onPress={() => {
          dispatch(setSexAndWeight({sex: localSex, weight: localWeight}))
          navigation.navigate('DrinkSession')
        }}
      >Submit</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
