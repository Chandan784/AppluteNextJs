"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCourses = () => {
  const [loading, setLoading] = useState(true);

  let [MyCourses, setMyCourses] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user._id;
  console.log("user ", user);
  useEffect(() => {
    if (userId) {
      const fetchCourses = async () => {
        try {
          setMyCourses([user.purchasedCourses]);
        } catch (error) {
          toast.error("An error occurred while fetching courses");
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [userId]);
  console.log(MyCourses);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 lg:px-72">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MyCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={course.thumbnail || "/default-course-image.jpg"}
              alt={course.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-green-600 font-bold">₹{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
