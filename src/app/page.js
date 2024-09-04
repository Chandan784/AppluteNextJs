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

      const dummyCategories = [
        {
          id: 1,
          name: "Web Development",
          icon: "https://cdn-icons-png.flaticon.com/128/1087/1087815.png",
        },
        {
          id: 2,
          name: "Data Science",
          icon: "https://cdn-icons-png.flaticon.com/128/1449/1449312.png",
        },
        {
          id: 3,
          name: "Graphic Design",
          icon: "https://cdn-icons-png.flaticon.com/128/2779/2779775.png",
        },
        {
          id: 4,
          name: "Digital Marketing",
          icon: "https://cdn-icons-png.flaticon.com/128/1968/1968750.png",
        },
        {
          id: 5,
          name: "Photography",
          icon: "https://cdn-icons-png.flaticon.com/128/1042/1042339.png",
        },
        {
          id: 6,
          name: "Business Management",
          icon: "https://cdn-icons-png.flaticon.com/128/3094/3094829.png",
        },
        {
          id: 7,
          name: "Mobile App Development",
          icon: "https://cdn-icons-png.flaticon.com/128/1875/1875043.png",
        },
        {
          id: 8,
          name: "Cyber Security",
          icon: "https://cdn-icons-png.flaticon.com/128/4744/4744315.png",
        },
        {
          id: 9,
          name: "Artificial Intelligence",
          icon: "https://cdn-icons-png.flaticon.com/128/5278/5278402.png",
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
