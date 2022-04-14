import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    subscription: {},
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },

    logout(state) {
      state.currentUser = null;
    },

    subscribe(state, action) {
      state.subscription = action.payload;
    },
  },
});

export default UserSlice;
