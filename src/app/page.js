"use client"; // Mark this component as a Client Component

import { useEffect, useState } from "react";
import CourseList from "@/components/CourseList";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate fetching data with dummy values
    const fetchDummyData = () => {
      // Dummy courses
      const dummyCourses = [
        {
          id: 1,
          title: "Course 1",
          description: "Description for Course 1",
          price: 500,
        },
        {
          id: 2,
          title: "Course 2",
          description: "Description for Course 2",
          price: 700,
        },
        {
          id: 3,
          title: "Course 3",
          description: "Description for Course 3",
          price: 300,
        },
      ];

      // Dummy categories
      const dummyCategories = [
        {
          id: 1,
          name: "Category 1",
          description: "Description for Category 1",
        },
        {
          id: 2,
          name: "Category 2",
          description: "Description for Category 2",
        },
        {
          id: 3,
          name: "Category 3",
          description: "Description for Category 3",
        },
        {
          id: 1,
          name: "Category 1",
          description: "Description for Category 1",
        },
        {
          id: 2,
          name: "Category 2",
          description: "Description for Category 2",
        },
        {
          id: 3,
          name: "Category 3",
          description: "Description for Category 3",
        },
        {
          id: 1,
          name: "Category 1",
          description: "Description for Category 1",
        },
        {
          id: 2,
          name: "Category 2",
          description: "Description for Category 2",
        },
        {
          id: 3,
          name: "Category 3",
          description: "Description for Category 3",
        },
      ];

      setCourses(dummyCourses);
      setCategories(dummyCategories);
    };

    fetchDummyData();
  }, []);

  return (
    <div className="container mx-auto ">
      <CategorySection categories={categories} />
      <h2 className="text-2xl font-semibold mt-8 mb-4">Courses</h2>
      <CourseList courses={courses} />
    </div>
  );
}
