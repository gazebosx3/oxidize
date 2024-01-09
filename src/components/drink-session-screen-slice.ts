import { createSlice } from "@reduxjs/toolkit";
import { UserDrink } from "../types";

export const slice = createSlice({
  name: "drinkSession",
  initialState: {
    sessionStartTime: 0,
    sessionEndTime: 0,
    sessionDrinks: [] as UserDrink[],
  },
  reducers: {
    setSessionStartTime: (state, action) => {
      state.sessionStartTime = action.payload;
    },
    setSessionEndTime: (state, action) => {
      state.sessionEndTime = action.payload;
    },
    setSessionDrinks: (state, action: { payload: { drinks: UserDrink[] } }) => {
      state.sessionDrinks = action.payload.drinks
    },
  },
});

export const { setSessionDrinks, setSessionEndTime, setSessionStartTime } =
  slice.actions;

export const selectSessionStartTime = (state: {
  profile: { sessionStartTime: number };
}) => state.profile.sessionStartTime;
export const selectSessionEndTime = (state: {
  profile: { sessionEndTime: number };
}) => state.profile.sessionEndTime;
export const selectSessionDrinks = (state: {
  profile: { sessionDrinks: UserDrink[] };
}) => state.profile.sessionDrinks;

export default slice.reducer;
