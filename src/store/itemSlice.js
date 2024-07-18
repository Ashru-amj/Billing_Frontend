import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: JSON.parse(localStorage.getItem("items")) || [], // Initialize with stored data if available
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.item.push(action.payload); 
      // Add new item to the array
      localStorage.setItem("items", JSON.stringify(state.item))
    },
    removeItem: (state, action) => {
      state.item = state.item.filter((it, i) => i !== action.payload);
        localStorage.setItem("items", JSON.stringify(state.item))
    },
    
    clearItems: (state) => {
      state.item = []; // Clear all items from the array
      localStorage.setItem("items", JSON.stringify(state.item))

    },
  },
});

export const { addItem,removeItem, clearItems } = itemSlice.actions;

export default itemSlice.reducer;
