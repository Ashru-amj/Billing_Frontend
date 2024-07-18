import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: JSON.parse(localStorage.getItem("transactions")) || [], // Initialize with stored data if available
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transaction.push(action.payload); // Add new item to the array
      localStorage.setItem("transactions", JSON.stringify(state.transaction))
    },
    // removeItem: (state, action) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload.id); // Remove item from the array
    // },
    clearItems: (state) => {
      state.transaction = []; // Clear all items from the array
    },
  },
});

export const { addTransaction, clearTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
