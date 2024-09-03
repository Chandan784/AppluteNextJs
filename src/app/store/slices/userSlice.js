import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await axios.post("/api/users", userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    status: "idle",
    error: null,
    isAuthenticated: false, // Add authentication status
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    checkUserInLocalStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.userInfo = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser, checkUserInLocalStorage } =
  userSlice.actions;

export const selectUser = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
