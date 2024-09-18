"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Subscription = () => {
  let [isLoading, setIsLoading] = useState(false);
  const handelSubscribe = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
      toast.success("First login");
    } else {
      setIsLoading(false);
      try {
        const res = await fetch("/api/payment/createOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1 * 100 }), // Amount in the smallest currency unit
        });
        const { id, currency, amount } = await res.json();

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error("Failed to load payment script.");
          setIsLoading(false);
          return;
        }

        const options = {
          key: "rzp_live_0hcX6BTQ9RtC5P",
          amount,
          currency,
          name: "Your App Name",
          description: "Course Purchase",
          order_id: id,
          handler: async function (response) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            const verificationRes = await fetch("/api/payment/verifyPayment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
              }),
            });
            const data = await verificationRes.json();
            if (data.success) {
              toast.success("Payment successful!");

              // Call the API to update purchased courses
              //   const updateRes = await fetch(
              //     "/api/courses/updatePurchasedCourses",
              //     {
              //       method: "POST",
              //       headers: { "Content-Type": "application/json" },
              //       body: JSON.stringify({
              //         userId: user._id,
              //         courseId: courseid,
              //       }),
              //     }
              //   );

              const updateData = await updateRes.json();
              if (updateData.success) {
                toast.success("Course added to your account!");
                // Redirect or update UI here
                // Example: window.location.href = "/my-courses";
              } else {
                toast.error("Failed to add course to your account.");
              }
            } else {
              toast.error("Payment verification failed!");
            }
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "1234567890",
          },
          notes: {
            address: "User Address",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Error during payment:", error);
        toast.error("An error occurred during the payment process.");
      }
      setIsLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  if (isLoading) {
    return <>loading....</>;
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-10 py-10 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl md:text-4xl font-bold mb-5 text-gray-800 text-center">
        Choose Your Plan
      </h1>
      <p className="text-md md:text-lg text-gray-600 mb-10 text-center">
        Unlock all features and take your experience to the next level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {/* 1 Month Plan - Starter */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-full md:max-w-sm text-center border-2 border-blue-500 relative h-full flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-2xl">
          <div className="absolute top-0 right-0 bg-yellow-400 text-white py-1 px-3 rounded-full text-sm">
            Starter
          </div>
          <div className="flex-grow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              1 Month Plan
            </h2>
            <p className="text-lg md:text-xl font-bold text-blue-500 mb-4">
              ₹500
            </p>
            <p className="mb-4">Unlimited Access</p>
            <ul className="mb-6 text-gray-600">
              <li className="mb-2">Basic Support</li>
              <li>Access to Premium Content</li>
            </ul>
          </div>
          <button
            onClick={handelSubscribe}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition w-full mt-auto"
          >
            Subscribe Now
          </button>
        </div>

        {/* 6 Months Plan - Most Popular */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-full md:max-w-sm text-center relative h-full flex flex-col justify-between border-2 border-green-500 transform transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            6 Months Plan
          </h2>
          <p className="text-lg md:text-xl font-bold text-blue-500 mb-4">
            ₹2000
          </p>
          <p className="mb-4">Unlimited Access</p>
          <ul className="mb-6 text-gray-600">
            <li className="mb-2">Priority Support</li>
            <li className="mb-2">Access to Premium Content</li>
            <li>Save 30%</li>
          </ul>
          <button
            onClick={handelSubscribe}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition w-full mt-auto"
          >
            Subscribe Now
          </button>
          <div className="absolute top-0 right-0 bg-green-500 text-white py-1 px-3 rounded-full text-sm">
            Most Popular
          </div>
        </div>

        {/* 1 Year Plan - Long Term */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-full md:max-w-sm text-center border-2 border-blue-500 relative h-full flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-2xl">
          <div className="absolute top-0 right-0 bg-purple-500 text-white py-1 px-3 rounded-full text-sm">
            Long Term
          </div>
          <div className="flex-grow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              1 Year Plan
            </h2>
            <p className="text-lg md:text-xl font-bold text-blue-500 mb-4">
              ₹5000
            </p>
            <p className="mb-4">Unlimited Access</p>
            <ul className="mb-6 text-gray-600">
              <li className="mb-2">Priority Support</li>
              <li className="mb-2">Access to Premium Content</li>
              <li>Exclusive Offers</li>
            </ul>
          </div>
          <button
            onClick={handelSubscribe}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition w-full mt-auto"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
