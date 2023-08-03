import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  phone: "",
  email: ""
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsernameof: (state, action) => {
      state.username = action.payload;
    },
    setPhoneof: (state, action) => {
      state.phone = action.payload;
    },
    setEmailof: (state, action) => {
      state.email = action.payload;
    }
  }
});

export const { setUsernameof, setPhoneof, setEmailof } = authSlice.actions;

export default authSlice.reducer;