"use client";

import { useState } from "react";
import { ShoppingBag, User, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import logo from '@/public/logo.png';

import TopBar from "./TopBar";


export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleHover = (menu) => setActiveMenu(menu);
  const handleLeave = () => setActiveMenu(null);

  const dropdowns = {
    Collections: (
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Featured</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-500">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Best Sellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Limited Edition
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Collections</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-500">
                T-Shirts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Hoodies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Accessories
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg p-6 text-white">
          <h4 className="font-bold mb-2">New Season Drop</h4>
          <p className="text-sm mb-3">Up to 30% off</p>
          <button className="bg-white text-green-600 px-3 py-1 rounded">
            Shop Now
          </button>
        </div>
      </div>
    ),
    Shop: (
      <div className="grid grid-cols-4 gap-6">
        {["Men", "Women", "Kids", "Accessories"].map((section) => (
          <div key={section}>
            <h4 className="font-semibold mb-3">{section}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-500">
                  T-Shirts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Jeans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Shoes
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    ),
    Pages: (
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:text-green-500">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-500">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-500">
            FAQ
          </a>
        </li>
      </ul>
    ),
  };

  return (
    <header className="relative ">
      {/* Topbar */}
     <TopBar></TopBar>

      {/* Main Header */}
      <div className="flex items-center justify-between px-10  relative">
        {/* Left Menu */}
        <nav className="hidden md:flex items-center gap-4">
          {["Home", "Collections", "Shop", "Blog", "Pages"].map((item) => (
            <div
              key={item}
              className="relative py-4" // keeps hover area active
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={handleLeave}
            >
              <button className="flex items-center gap-1 font-medium hover:text-green-500 transition cursor-pointer">
                {item}
                {dropdowns[item] && (
                  <ChevronDown className="w-4 h-4 mt-[2px]" />
                )}
              </button>

              {/* Small dropdown (for Pages only) */}
              {item === "Pages" && (
                <div
                  className={`absolute left-0 top-full w-52 bg-white shadow-lg rounded-2xl transition-opacity transition-transform duration-700 ease-out transform origin-top z-50 ${
                    activeMenu === "Pages"
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-0 invisible"
                  }`}
                >
                  <div className="p-4">{dropdowns.Pages}</div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex items-center gap-2">
       <Image src={logo} alt="Logo" width={150} height={50} />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <User className="w-5 h-5 cursor-pointer hover:text-green-500" />
          <Star className="w-5 h-5 cursor-pointer hover:text-green-500" />
          <div
            className="relative
          "
          >
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-green-500" />
            <span
              className="absolute -top-2

             -right-2 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
            >
              0
            </span>
          </div>
          <button className="border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-green-400 hover:text-white">
            Bulk Order
          </button>
        </div>

        {/* Global Dropdown (Collections + Shop) */}
        {["Collections", "Shop"].includes(activeMenu) && (
          <div
            onMouseEnter={() => handleHover(activeMenu)}
            onMouseLeave={handleLeave}
            className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[90vw] bg-white  shadow-lg rounded-2xl transition-all duration-700 ease-in-out transform origin-top z-50 ${
              activeMenu
                ? "opacity-100 scale-100 translate-y-0 visible"
                : "opacity-0 scale-95 -translate-y-2 invisible"
            }`}
          >
            <div className="p-8">{dropdowns[activeMenu]}</div>
          </div>
        )}
      </div>
    </header>
  );
}
