"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  clearUser,
  checkUserInLocalStorage,
} from "@/app/store/slices/userSlice";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const userDetails = useSelector(selectUser); // Get user details from Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated); // Check if user is authenticated

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    } else {
      setUser(userDetails);
    }
  }, [userDetails, isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(clearUser()); // Dispatch logout action
    router.push("/auth/login"); // Redirect to login page after logout
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("");
    return initials.toUpperCase();
  };

  // Display a circular progress bar while loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="loader"></div> {/* Circular Progress Bar */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center rounded-full text-4xl font-bold mb-4">
            {getUserInitials(user.name)}
          </div>
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/courses/mycourse"
            className="w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            My Courses
          </Link>
          <Link
            href="/profile/edit"
            className="w-full text-center bg-yellow-500 text-white font-semibold py-3 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center bg-red-600 text-white font-semibold py-3 rounded-full hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
