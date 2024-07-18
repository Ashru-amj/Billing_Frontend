import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: JSON.parse(localStorage.getItem("sales")) || [], // Initialize with stored data if available
};

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    // add purchase order
    addSales: (state, action) => {
      state.sales.push(action.payload); // Add new item to the array
      localStorage.setItem("sales", JSON.stringify(state.sales))
    },
    removeSaleItem: (state, action) => {
      state.sales = state.sales.filter((item, i) => i !== action.payload);
      localStorage.setItem("sales", JSON.stringify(state.sales))

    },
    
    // clear all the purchase order
    clearSales: (state) => {
      state.sales = []; 
      localStorage.setItem("sales", JSON.stringify(state.sales))

    },
  },
});

export const { addSales,removeSaleItem, clearSales } = saleSlice.actions;

export default saleSlice.reducer;
