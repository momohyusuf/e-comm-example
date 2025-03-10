"use client";
import Link from "next/link";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="border border-amber-500 p-2">
      <nav className="container mx-auto flex justify-between items-center">
        <img
          className="w-16 h-16"
          src="https://img.freepik.com/free-vector/flat-design-clothing-store-logo-design_23-2149496415.jpg"
          alt="our logo"
        />

        <div className="flex gap-4 items-center">
          <Link
            className="flex gap-2 items-center text-lg font-medium hover:text-amber-500 transition-colors duration-500"
            href={"/marketplace"}
          >
            Shop
          </Link>
          <Link
            className="relative flex gap-2 items-center text-lg font-medium hover:text-amber-500 transition-colors duration-500"
            href={"/cart"}
          >
            <p className="absolute right-[35px] -top-[20px] bg-amber-600 text-white h-7 w-7 font-semibold rounded-full grid place-items-center">
              {cartItems.length}
            </p>
            <ShoppingCart />
            <span>Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
