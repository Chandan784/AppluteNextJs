// src/pages/api/auth/signup.js
import mongoose from "mongoose";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../model/User";
import Otp from "../../../../../model/Otp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { name, email, phone, password } = await req.json();
    console.log(name, email, phone, password);

    // Validate the required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if OTP is verified
    const otpEntry = await Otp.findOne({ email });
    console.log(otpEntry);

    // if (!otpEntry || otpEntry.verified !== true) {
    //   return NextResponse.json(
    //     { success: false, message: "Email not verified" },
    //     { status: 400 }
    //   );
    // }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Optionally, delete the OTP entry after successful signup
    await Otp.deleteOne({ email });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      newUser,
    });

    // Set the JWT as an HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Error in signup:", err);

    // Handle specific error cases
    if (err instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, message: "Validation error" },
        { status: 400 }
      );
    }

    if (err.code && err.code === 11000) {
      // Handle duplicate key error
      return NextResponse.json(
        { success: false, message: "Duplicate key error: User already exists" },
        { status: 400 }
      );
    }

    // Fallback for other errors
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
