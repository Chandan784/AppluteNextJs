// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { RecaptchaVerifier } from "firebase/auth"; // Import reCAPTCHA verifier

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwbqHfsy4Gh688ZTGVfaPaNzVB7e8uyck",
  authDomain: "applute.firebaseapp.com",
  projectId: "applute",
  storageBucket: "applute.appspot.com",
  messagingSenderId: "883074138758",
  appId: "1:883074138758:web:7164ad3f5af93d27170707",
  measurementId: "G-WWF3J0K3GT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Function to set up reCAPTCHA for phone authentication
const setupRecaptcha = () => {
  if (window.recaptchaVerifier) {
    return; // If reCAPTCHA is already initialized, no need to reinitialize
  }

  // Initialize reCAPTCHA verifier
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container", // ID of the container element
    {
      size: "invisible", // Use invisible reCAPTCHA
      callback: (response) => {
        console.log("reCAPTCHA verified:", response);
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired. Please try again.");
      },
    },
    auth // Pass the initialized Firebase auth instance
  );

  // Disable reCAPTCHA for testing purposes (only in development)
  window.recaptchaVerifier.appVerificationDisabledForTesting = true;
};

// Export the Firebase auth instance and setupRecaptcha function
export { auth, setupRecaptcha };
