"use client"; // Mark this component as a Client Component
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCourses } from "@/app/store/slices/courseSlice"; // Adjust path if necessary
import { fetchCourses } from "@/app/store/slices/courseSlice";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  const courses = useSelector(selectCourses);

  useEffect(() => {
    // Fetch courses and set loading state to false once data is available
    dispatch(fetchCourses()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="loader"></div> {/* Circular Progress Bar */}
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
