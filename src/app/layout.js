"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "../styles/globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>Course Selling App</title>
      </head>
      <body>
        <Provider store={store}>
          <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
            <nav className="container mx-auto flex items-center justify-between p-4">
              <div className="text-xl font-bold">
                <Link
                  href="/"
                  className="hover:text-gray-400 transition-colors"
                >
                  Course App
                </Link>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/"
                  className="hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/courses/mycourse"
                  className="hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                  My Courses
                </Link>
                <Link
                  href="/auth/login"
                  className="hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                  Signup
                </Link>
              </div>
              <button className="md:hidden text-2xl" onClick={toggleMenu}>
                <span className="material-icons">menu</span>
              </button>
            </nav>
            {isOpen && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-end"
                onClick={toggleMenu}
              >
                <div className="w-4/5 max-w-sm bg-gray-800 text-white p-6 transform transition-transform duration-300 ease-in-out translate-x-0">
                  <button
                    className="text-2xl absolute top-4 right-4"
                    onClick={toggleMenu}
                  >
                    <span className="material-icons">close</span>
                  </button>
                  <div className="mt-8 space-y-4">
                    <Link
                      href="/"
                      className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/courses/mycourse"
                      className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                    >
                      My Courses
                    </Link>
                    <Link
                      href="/auth/login"
                      className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </header>
          <main className="pt-16">{children}</main>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>© 2024 Course Selling App</p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
