import { createSlice } from "@reduxjs/toolkit";
import { UserDrink } from "../types";

export const slice = createSlice({
  name: "profile",
  initialState: {
    sessionStartTime: 0,
    sessionEndTime: 0,
    sessionDinks: [],
  },
  reducers: {
    setSessionStartTime: (state, action) => {
      state.sessionStartTime = action.payload;
    },
    setSessionEndTime: (state, action) => {
      state.sessionEndTime = action.payload;
    },
    setSessionDrinks: (state, action: { payload: { drinks: UserDrink } }) => {
      const newDrinks = [...state.sessionDinks, action.payload.drinks];
    },
  },
});

export const { setSessionDrinks, setSessionEndTime, setSessionStartTime } =
  slice.actions;

export const selectSessionStartTime = (state: {
  profile: { sessionStartTime: string };
}) => state.profile.sessionStartTime;
export const selectSessionEndTime = (state: {
  profile: { sessionEndTime: string };
}) => state.profile.sessionEndTime;
export const selectSessionDrinks = (state: {
  profile: { sessionDrinks: string };
}) => state.profile.sessionDrinks;

export default slice.reducer;
