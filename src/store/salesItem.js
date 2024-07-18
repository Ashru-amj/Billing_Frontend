import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salesItem: JSON.parse(localStorage.getItem("salesItem")) || [], // Initialize with stored data if available
};

const salesItemSlice = createSlice({
  name: "salesItem",
  initialState,
  reducers: {
    // add purchase order
    addsalesItem: (state, action) => {
      state.salesItem.push(action.payload); // Add new item to the array
      localStorage.setItem("salesItem", JSON.stringify(state.salesItem));
    },
    removesalesItem: (state, action) => {
      state.salesItem = state.salesItem.filter(
        (item, i) => i !== action.payload
      );
      localStorage.setItem("salesItem", JSON.stringify(state.salesItem));
    },

    // clear all the salesItem order
    clearsalesItem: (state) => {
      state.salesItem = [];
      localStorage.setItem("salesItem", JSON.stringify(state.salesItem));
    },
  },
});

export const { addsalesItem, clearsalesItem, removesalesItem } =
  salesItemSlice.actions;

export default salesItemSlice.reducer;
