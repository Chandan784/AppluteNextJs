// src/pages/api/sendOtp.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dbConnect from "../../../../../lib/dbConnect"; // Adjust the path if needed
import Otp from "../../../../../model/Otp"; // Adjust the path if needed
import User from "../../../../../model/User";
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 401 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otp = crypto.randomInt(1000, 9999).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes

    // Create or update OTP entry
    const otpEntry = new Otp({ email, otp, expiresAt });
    await otpEntry.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "User Authentication with OTP",
      text: `Your OTP is ${otp}. Valid for 2 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 2 minutes.</p>`,
    });

    return NextResponse.json(
      { success: true, message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
