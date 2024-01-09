import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import textCounterReducer from "../features/textCounter/textCounterSlice";
import profileReducer from "./components/profile-slice";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
