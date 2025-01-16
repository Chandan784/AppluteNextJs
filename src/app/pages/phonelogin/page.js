"use client";

import { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/app/firebase";

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [message, setMessage] = useState("");

  // Setup Recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // Use "invisible" for seamless experience
          callback: (response) => {
            console.log("ReCAPTCHA verified:", response);
          },
          "expired-callback": () => {
            console.warn("ReCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    }
  };

  // Handle Sending OTP
  const handleSendOTP = async () => {
    if (!phoneNumber || !/^\+\d{10,15}$/.test(phoneNumber)) {
      setMessage("Please enter a valid phone number with the country code.");
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent to your phone number.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage(`Error sending OTP: ${error.message}`);
    }
  };

  // Handle Verifying OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);

      setMessage(
        `Phone number verified successfully! Welcome, ${userCredential.user.phoneNumber}.`
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(`Invalid OTP. Please try again: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Firebase Phone Authentication</h1>

      {/* Phone Number Input */}
      <div>
        <input
          type="text"
          placeholder="Enter phone number (+1XXXXXXXXXX)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOTP}>Send OTP</button>
      </div>

      {/* OTP Input */}
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </div>

      {/* Recaptcha Container */}
      <div id="recaptcha-container"></div>

      {/* Message Display */}
      <p>{message}</p>
    </div>
  );
}
