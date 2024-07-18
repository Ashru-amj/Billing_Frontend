import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estimate: JSON.parse(localStorage.getItem("estimate")) || [], // Initialize with stored data if available
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    // add purchase order
    addEstimate: (state, action) => {
      state.estimate.push(action.payload); // Add new item to the array
      localStorage.setItem("estimate", JSON.stringify(state.estimate))
    },
    removeItem: (state, action) => {
        state.estimate = state.estimate.filter((item, i) => i !== action.payload);
        localStorage.setItem("estimate", JSON.stringify(state.estimate))

    },
    
    // clear all the purchase order
    clearEstimate: (state) => {
      state.estimate = []; 
      localStorage.setItem("estimate", JSON.stringify(state.estimate))

    },
  },
});

export const { addEstimate,removeItem, clearEstimate } = estimateSlice.actions;

export default estimateSlice.reducer;
