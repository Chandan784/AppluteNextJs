"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "../styles/globals.css";
import Link from "next/link";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>Applute</title>
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <main className="pt-16">{children}</main>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>© 2024 Course Selling App</p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
