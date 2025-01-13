"use client";

import { useState } from "react";
import { auth, setupRecaptcha } from "@/app/firebase"; // Import Firebase auth and reCAPTCHA setup
import { signInWithPhoneNumber } from "firebase/auth";

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  // Function to send OTP to the provided phone number
  const sendOtp = async () => {
    setupRecaptcha(); // Initialize reCAPTCHA
    const appVerifier = window.recaptchaVerifier; // Get reCAPTCHA verifier instance
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("OTP sent! Please check your phone.");
    } catch (error) {
      setMessage(`Error sending OTP: ${error.message}`);
    }
  };

  // Function to verify OTP entered by the user
  const verifyOtp = async () => {
    if (!confirmationResult) {
      setMessage("Please request an OTP first.");
      return;
    }
    try {
      const userCredential = await confirmationResult.confirm(otp);
      setMessage(
        `Logged in successfully as ${userCredential.user.phoneNumber}`
      );
    } catch (error) {
      setMessage(`Error verifying OTP: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login with OTP</h1>
      <div>
        <label htmlFor="phone" className="block font-medium">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          placeholder="+1 123 456 7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={sendOtp}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send OTP
        </button>
      </div>

      {/* OTP Verification */}
      {confirmationResult && (
        <div className="mt-4">
          <label htmlFor="otp" className="block font-medium">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      {/* Display message */}
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default OTPLogin;
