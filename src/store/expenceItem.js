import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenceItem: JSON.parse(localStorage.getItem("expenceItem")) || [], // Initialize with stored data if available
};

const expenceItemSlice = createSlice({
  name: "expenceItem",
  initialState,
  reducers: {
    // add purchase order
    addExpenceItem: (state, action) => {
      state.expenceItem.push(action.payload); // Add new item to the array
      localStorage.setItem("expenceItem", JSON.stringify(state.expenceItem));
    },
    removeExpenceItem: (state, action) => {
      state.expenceItem = state.expenceItem.filter(
        (item, i) => i !== action.payload
      );
      localStorage.setItem("expenceItem", JSON.stringify(state.expenceItem));
    },

    // clear all the salesItem order
    clearExpenceItem: (state) => {
      state.expenceItem = [];
      localStorage.setItem("expenceItem", JSON.stringify(state.expenceItem));
    },
  },
});

export const { addExpenceItem, removeExpenceItem, clearExpenceItem } =
  expenceItemSlice.actions;

export default expenceItemSlice.reducer;
