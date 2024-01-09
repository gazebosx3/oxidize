import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "profile",
  initialState: {
    sex: "",
    weight: "",
  },
  reducers: {
    setSex: (state, action) => {
      state.sex = action.payload as string;
    },
    setWeight: (state, action) => {
      state.weight = action.payload as string;
    },
    setSexAndWeight: (
      state,
      action: { payload: { sex: string; weight: string } }
    ) => {
      console.log('Payload is: ', action)
      const { sex, weight } = action.payload;
      if (!sex || !weight) {
        throw Error("need sex and weight values for setSexAndWeight dispatch");
      }
      state.sex = sex;
      state.weight = weight
      console.log('state is: ', state)
    },
  },
});

export const { setSex, setWeight, setSexAndWeight } = slice.actions;

export const selectSex = (state: { profile: { sex: string } }) =>
  state.profile.sex;
export const selectWeight = (state: { profile: { weight: string } }) =>
  state.profile.weight;

export default slice.reducer;
