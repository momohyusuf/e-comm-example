"use client";
import axios from "axios";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import validator from "validator";
import { useRouter } from "next/navigation";

const PaymentWithPaystack = ({ customerDetails }) => {
  const { totalCost, cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  const config = {
    reference: new Date().getTime().toString(),
    email: customerDetails.email,
    amount: totalCost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
  };

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("Payment ref", reference);
    console.log("Amount Paid", totalCost);
    console.log("Items ordered", cartItems);
    console.log("customer Details", customerDetails);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/order/create",
        {
          reference: reference,
          totalCost: totalCost,
          cartItems: cartItems,
          customerDetails: customerDetails,
        }
      );
      console.log(response);
      alert("Thank Order has been placed");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  function handlePaystackPayment(event) {
    event.preventDefault();
    // check if customer provided their name
    if (validator.isEmpty(customerDetails.name, { ignore_whitespace: true })) {
      return alert("Please provide your name");
    }
    // check if customer provided a valid email address
    if (validator.isEmail(customerDetails.email) === false) {
      return alert("Please provide a valid email");
    }

    // check if customer provide house address
    if (
      validator.isEmpty(customerDetails.address, { ignore_whitespace: true })
    ) {
      return alert("Please provide your house address");
    }

    // ensure that total cost is greater than 0
    if (totalCost <= 0) {
      return alert("Please you must order an item");
    }

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
