// src/store/features/snackbar/snackbar.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",   // Default empty message
  variant: undefined, // Can be undefined or a specific variant like 'success' or 'error'
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.message = action.payload.message; // Set message
      state.variant = action.payload.variant; // Set variant (e.g. 'success', 'error')
    },
    resetSnackbar: (state) => {
      state.message = "";  // Clear message
      state.variant = undefined; // Reset variant
    },
  },
});

// Export actions for dispatching
export const { setSnackBar, resetSnackbar } = snackbarSlice.actions;

// Export the reducer as the default export
export default snackbarSlice.reducer;
