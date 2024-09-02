// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
  },
});

export default store;
