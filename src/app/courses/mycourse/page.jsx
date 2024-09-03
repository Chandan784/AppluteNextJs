"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (user == null) {
      toast.error("first login");
      router.push("/auth/login");
      return;
    }
    const fetchCourses = async () => {
      try {
        const userId = user._id; // Replace with dynamic user ID if available
        const response = await axios.get(`/api/userPurchasedCourses/${userId}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-700">{course.description}</p>
                <button
                  onClick={() =>
                    router.push(`/courses/coursePlay/${course._id}`)
                  }
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add this CSS to your global stylesheet (e.g., styles/globals.css)
