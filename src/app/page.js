"use client";

import { useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [academicBackground, setAcademicBackground] = useState("");
  const [course, setCourse] = useState("");

  const statesOfIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const academicOptions = {
    Schooling: [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
      "Class 9",
      "Class 10",
      "Class 11",
      "Class 12",
    ],
    Undergraduate: ["B.Sc", "B.Com", "B.A", "B.Tech", "BBA", "LLB", "MBBS"],
    Postgraduate: ["M.Sc", "M.Com", "M.A", "M.Tech", "MBA", "LLM", "MD"],
    Doctorate: ["PhD", "Post-Doctoral Research"],
    "Professional Courses": ["CA", "CS", "CFA", "ACCA", "CMA"],
  };

  const courseOptions = {
    Technology: [
      "Web Development",
      "Data Science",
      "Machine Learning",
      "Cybersecurity",
      "Cloud Computing",
      "AI & Robotics",
    ],
    Design: [
      "Graphic Design",
      "UI/UX Design",
      "Animation",
      "Interior Design",
      "Fashion Design",
    ],
    Marketing: [
      "Digital Marketing",
      "SEO",
      "Content Marketing",
      "Social Media Marketing",
      "Brand Management",
    ],
    Finance: [
      "Investment Banking",
      "Stock Market",
      "Financial Planning",
      "Crypto Trading",
      "Taxation & Auditing",
    ],
    Medical: [
      "First Aid",
      "Medical Coding",
      "Pharmacology",
      "Healthcare Management",
      "Clinical Research",
    ],
    Languages: [
      "English",
      "French",
      "German",
      "Japanese",
      "Chinese",
      "Spanish",
    ],
    "Other Skills": [
      "Photography",
      "Music Production",
      "Cooking",
      "Fitness Training",
      "Public Speaking",
      "Entrepreneurship",
    ],
  };

  const handleBooking = () => {
    if (!name || !age || !state || !academicBackground || !course) return;
    const message = `Hello, my name is ${name}. I am ${age} years old from ${state}. I have a background in ${academicBackground} and I am interested in learning '${course}'. Please provide more details.`;
    const whatsappURL = `https://wa.me/6370302039?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Book Live Training
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Fill in your details and message us directly on WhatsApp.
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select State</option>
          {statesOfIndia.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={academicBackground}
          onChange={(e) => setAcademicBackground(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Academic Background</option>
          {Object.keys(academicOptions).map((category, index) => (
            <optgroup key={index} label={category}>
              {academicOptions[category].map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Course</option>
          {Object.keys(courseOptions).map((category, index) => (
            <optgroup key={index} label={category}>
              {courseOptions[category].map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          onClick={handleBooking}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Send Message on WhatsApp
        </button>
      </div>
    </div>
  );
}
