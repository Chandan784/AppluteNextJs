// pages/api/create-order.js

import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add your Razorpay key ID in environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Add your Razorpay key secret in environment variables
});

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount, // amount in the smallest currency unit (e.g., paise)
      currency: "INR",
      receipt: "receipt_order_" + new Date().getTime(),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
