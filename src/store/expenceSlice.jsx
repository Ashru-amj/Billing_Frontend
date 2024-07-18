import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expence: JSON.parse(localStorage.getItem("expence")) || [], // Initialize with stored data if available
};

const expenceSlice = createSlice({
  name: "expence",
  initialState,
  reducers: {
    // add purchase order
    addExpence: (state, action) => {
      state.expence.push(action.payload); // Add new item to the array
      localStorage.setItem("expence", JSON.stringify(state.expence))
    },
    removeExpence: (state, action) => {
        state.expence = state.expence.filter((item, i) => i !== action.payload);
        localStorage.setItem("expence", JSON.stringify(state.expence))

    },
    
    // clear all the purchase order
    clearExpence: (state) => {
      state.expence = []; 
      localStorage.setItem("expence", JSON.stringify(state.expence))

    },
  },
});

export const { addExpence,removeExpence, clearExpence } = expenceSlice.actions;

export default expenceSlice.reducer;
