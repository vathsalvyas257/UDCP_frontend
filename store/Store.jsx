// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./features/snackbar/snackbar"; // Import the default export

// You don't need combineReducers since you have only one reducer
export const store = configureStore({
  reducer: {
    setSnackBar: snackbarReducer, // Directly use the snackbarReducer
  },
});
