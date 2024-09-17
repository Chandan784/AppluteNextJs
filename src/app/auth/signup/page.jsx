"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfilePicChange = (e) => {
    if (e.target.files.length > 0) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to send OTP");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsEmailVerified(true);
        toast.success("OTP verified successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to verify OTP");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!isEmailVerified) {
      toast.error("Please verify your email first");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);

        localStorage.setItem("uid", data.userData._id);
        toast.success("User registered successfully!");
        window.location.href = "/auth/login";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);

      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-center relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <AddIcon
                  className="text-gray-500"
                  style={{ fontSize: "2rem" }}
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {isEmailVerified && (
                <CheckCircleIcon
                  className="text-green-500 ml-2"
                  style={{ fontSize: "1.5rem" }}
                />
              )}
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
          {isOtpSent && (
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
