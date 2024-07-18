import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchase: JSON.parse(localStorage.getItem("purchase")) || [], // Initialize with stored data if available
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    // add purchase order
    addPurchase: (state, action) => {
      state.purchase.push(action.payload); // Add new item to the array
      localStorage.setItem("purchase", JSON.stringify(state.purchase))
    },
    removeItem: (state, action) => {
      state.purchase = state.purchase.filter((item, i) => i !== action.payload);
      localStorage.setItem("purchase", JSON.stringify(state.purchase))

    },
    
    // clear all the purchase order
    clearPurchase: (state) => {
      state.purchase = []; 
      localStorage.setItem("purchase", JSON.stringify(state.purchase))

    },
  },
});

export const { addPurchase,removeItem, clearPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
