"use client";

import Link from "next/link";

export default function CourseDetails({ params }) {
  const id = params.id;

  const course = {
    id: 1,
    title: "Course 1",
    description:
      "This course covers the basics of Java programming, including object-oriented concepts, data structures, and algorithms. Ideal for beginners who want to build a strong foundation in Java.",
    price: 500,
    thumbnail:
      "https://th.bing.com/th?id=OIP.-pjCnKjbWhKe4WuPB8PV-wHaEI&w=334&h=186&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    topics: [
      "Introduction to Java",
      "Object-Oriented Programming",
      "Data Structures in Java",
      "Exception Handling",
      "File Handling",
      "Java Collections Framework",
      "Multithreading",
    ],
  };

  const whatsappMessage = `Hello, I am interested in booking the course "${course.title}". Please provide further details.`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Course Thumbnail */}
      <div className="mb-8">
        <img
          className="w-full h-72 object-cover rounded-lg shadow-md"
          src={course.thumbnail || "/default-thumbnail.jpg"}
          alt={course.title || "Course thumbnail"}
        />
      </div>

      {/* Course Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {course.title || "Untitled Course"}
      </h1>

      {/* Course Description */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        {course.description || "No description available for this course."}
      </p>

      {/* Topics Covered */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Topics Covered:
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {course.topics?.length > 0 ? (
            course.topics.map((topic, index) => (
              <li key={index} className="text-base leading-relaxed">
                {topic}
              </li>
            ))
          ) : (
            <p>No topics available for this course.</p>
          )}
        </ul>
      </div>

      {/* Price and Book Now Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-6 rounded-lg shadow-inner">
        {/* Price Section */}
        <div className="mb-4 sm:mb-0">
          <p className="text-2xl font-bold text-green-600">
            ₹{course.price.toLocaleString("en-IN")}
          </p>
          <p className="text-gray-500 text-sm mt-1">*Inclusive of all taxes</p>
        </div>

        {/* Book Now Button */}
        <a
          href={`https://wa.me/6370302039?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
