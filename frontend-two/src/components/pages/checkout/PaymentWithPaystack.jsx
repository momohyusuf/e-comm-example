"use client";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";

const PaymentWithPaystack = ({ customerDetails }) => {
  const { totalCost, cartItems } = useSelector((state) => state.cart);

  const config = {
    reference: new Date().getTime().toString(),
    email: customerDetails.email,
    amount: totalCost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("Payment ref", reference);
    console.log("Amount Paid", totalCost);
    console.log("Items ordered", cartItems);
    console.log("customer Details", customerDetails);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  function handlePaystackPayment(event) {
    event.preventDefault();
    initializePayment({ onSuccess, onClose });
  }
  return (
    <div>
      <button
        onClick={handlePaystackPayment}
        className="text-black font-bold text-lg bg-amber-800 w-full p-2 cursor-pointer hover:opacity-45 rounded-md shadow-2xl"
      >
        Pay now
      </button>
    </div>
  );
};

export default PaymentWithPaystack;
