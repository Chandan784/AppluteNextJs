"use client"; // Mark this component as a Client Component
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCourses } from "@/app/store/slices/courseSlice"; // Adjust path if necessary
import { fetchCourses } from "@/app/store/slices/courseSlice";
fetchCourses;
import CourseCard from "./CourseCard";

export default function CourseList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  const courses = useSelector(selectCourses);

  return (
    <div className="  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
