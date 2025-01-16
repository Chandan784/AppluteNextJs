"use client";

import { useState } from "react";
import { auth, googleProvider, signInWithPopup, signOut } from "@/app/firebase";

export default function GoogleLogin() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      setMessage(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMessage("You have been logged out.");
    } catch (error) {
      console.error("Error signing out:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Google Login System</h1>

      {!user ? (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Display Message */}
      {message && <p>{message}</p>}
    </div>
  );
}
