import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

const store = configureStore({
  reducer: { user: UserSlice.reducer },
});

export const { login, logout, subscribe } = UserSlice.actions;

export default store;
