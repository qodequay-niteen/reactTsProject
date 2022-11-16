import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileDetails: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    userProfileDetails: (state, action) => {
      state.userProfileDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userProfileDetails } = counterSlice.actions;

export default counterSlice.reducer;
