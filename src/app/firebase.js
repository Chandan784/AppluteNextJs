// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
