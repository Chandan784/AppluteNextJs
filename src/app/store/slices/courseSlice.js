"use client";

// src/store/slices/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get("/api/courses");
    return response.data;
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle", // or 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCourses = (state) => state.courses.courses;
export const selectCourseStatus = (state) => state.courses.status;
export const selectCourseError = (state) => state.courses.error;

export default courseSlice.reducer;
