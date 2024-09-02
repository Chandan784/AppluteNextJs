"use client"; // Mark this component as a Client Component
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCourses } from "./store/slices/courseSlice"; // Adjust path if necessary
import { fetchCourses } from "./store/slices/courseSlice";
import CourseList from "@/components/CourseList";
export default function HomePage() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  const courses = useSelector(selectCourses);

  return (
    <div>
      <h1>Welcome to the Course Selling App</h1>
      <ul>
        <CourseList />
      </ul>
    </div>
  );
}
