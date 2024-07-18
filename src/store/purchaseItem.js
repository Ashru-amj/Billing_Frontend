import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // purchaseItem: JSON.parse(localStorage.getItem("purchaseItem")) || [], // Initialize with stored data if available
  purchaseItem: JSON.parse(localStorage.getItem("purchaseItem")) || [], // Initialize with stored data if available
};

const purchaseItemSlice = createSlice({
  name: "purchaseItem",
  initialState,
  reducers: {
    // add purchase order
    addPurchaseItem: (state, action) => {
      state.purchaseItem.push(action.payload); // Add new item to the array
      localStorage.setItem("purchaseItem", JSON.stringify(state.purchaseItem));
    },
    removeItem: (state, action) => {
      state.purchaseItem = state.purchaseItem.filter(
        (item, i) => i !== action.payload
      );
      localStorage.setItem("purchaseItem", JSON.stringify(state.purchaseItem));
    },

    // clear all the purchase order
    clearpurchaseItem: (state) => {
      state.purchaseItem = [];
      console.log(state.purchaseItem);
      localStorage.setItem("purchaseItem", JSON.stringify(state.purchaseItem));
    },
  },
});

export const { addPurchaseItem, removeItem, clearpurchaseItem } =
  purchaseItemSlice.actions;

export default purchaseItemSlice.reducer;
