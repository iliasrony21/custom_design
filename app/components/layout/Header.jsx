"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  User,
  Star,
  ChevronDown,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import shopImage from "@/public/shop_image.jpg";

import TopBar from "./TopBar";
import Link from "next/link";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  // --- for smooth close delay ---
  const closeTimerRef = useRef(null);

  const handleHover = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(menu);
  };

  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180); // small delay for smooth UX
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const toggleExpandedItem = (itemName) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const dropdowns = {
    // Collections: (
    //   <div className="grid grid-cols-3 gap-6">
    //     <div>
    //       <h4 className="font-semibold mb-3">Featured</h4>
    //       <ul className="space-y-2">
    //         <li><a href="#" className="hover:text-red-500">New Arrivals</a></li>
    //         <li><a href="#" className="hover:text-red-500">Best Sellers</a></li>
    //         <li><a href="#" className="hover:text-red-500">Limited Edition</a></li>
    //       </ul>
    //     </div>
    //     <div>
    //       <h4 className="font-semibold mb-3">Collections</h4>
    //       <ul className="space-y-2">
    //         <li><a href="#" className="hover:text-red-500">T-Shirts</a></li>
    //         <li><a href="#" className="hover:text-red-500">Hoodies</a></li>
    //         <li><a href="#" className="hover:text-red-500">Accessories</a></li>
    //       </ul>
    //     </div>
    //     <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg p-6 text-white">
    //       <h4 className="font-bold mb-2">New Season Drop</h4>
    //       <p className="text-sm mb-3">Up to 30% off</p>
    //       <button className="bg-white text-red-600 px-3 py-1 rounded">
    //         Shop Now
    //       </button>
    //     </div>
    //   </div>
    // ),

    Shop: (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_420px] gap-4 lg:gap-4">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-bold  uppercase mb-2">
            MENS
          </h3>
          <ul className="space-y-2 text-[16px]">
            <li>
              <a
                href="#"
                className="text-red-500 font-medium hover:text-red-500"
              >
                Trousers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Rain Coat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Windbreaker (Printed)
              </a>
            </li>

            <li className="flex items-center gap-2">
              <a href="#" className="hover:text-red-500">
                Windbreaker (Cut & Sew)
              </a>
              <span className="text-[11px] font-semibold bg-red-500 text-white px-2 py-[2px] rounded">
                Windbreaker
              </span>
            </li>

            <li className="flex items-center gap-2">
              <a href="#" className="hover:text-red-500">
                Hidden Sidebar Toggle
              </a>
              <span className="text-[11px] font-semibold bg-red-500 text-white px-2 py-[2px] rounded">
                New
              </span>
            </li>

            <li>
              <a href="#" className="hover:text-red-500">
                Polos (Cut & Sew)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                T-Shirt (Drop Shoulder)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                T-Shirt (Long Sleeve)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                T-Shirt
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold uppercase mb-2">
            Womens
          </h3>
          <ul className="space-y-2 text-[16px]">
            <li>
              <a href="#" className="hover:text-red-500">
                Rain Coat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                T-Shirt
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-red-500">
                Horizontal Slide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Vertical Slide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Vertical Slide (Sticky)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Vertical Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Grid Gallery
              </a>
            </li> */}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold uppercase mb-2">
            Kids
          </h3>
          <ul className="space-y-2 text-[16px]">
            <li>
              <a href="#" className="hover:text-red-500">
                Rain Coat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Hoodies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Polos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                T-Shirt
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-red-500">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                My Designs
              </a>
            </li> */}
          </ul>
        </div>

        {/* Right Promo Banner */}
        <Link href="/shopPage">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 min-h-[280px] flex items-center">
          {/* <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop"
            alt="Promo"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          /> */}
         
            <Image src={shopImage} alt="Logo" width={350} height={250} className="absolute inset-0 w-full h-full object-cover cursor-pointer" />
          
          <div className="relative z-10 p-8">
            <span className="inline-block bg-violet-500 text-white text-sm font-semibold px-4 py-1 rounded-md mb-4">
              From $13
            </span>

            <h2 className="text-4xl font-extrabold leading-tight mb-3">
              25% off <br /> everything
            </h2>

            <p className="text-lg mb-6">Design your own!</p>

            <button className="bg-white cursor-pointer text-black font-semibold px-8 py-4 rounded-xl shadow hover:shadow-md transition inline-flex items-center gap-3">
              Shop Now <span className="text-xl">→</span>
            </button>
          </div>
        </div>
        </Link>
      </div>
    ),

    Pages: (
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:text-red-500">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-500">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-500">
            FAQ
          </a>
        </li>
      </ul>
    ),
  };

  const mobileMenuItems = [
    { name: "Home", href: "/" },
    // {
    //   name: "Collections",
    //   href: "#",
    //   subItems: [
    //     { name: "New Arrivals", href: "#" },
    //     { name: "Best Sellers", href: "#" },
    //     { name: "Limited Edition", href: "#" },
    //     { name: "T-Shirts", href: "#" },
    //     { name: "Hoodies", href: "#" },
    //     { name: "Accessories", href: "#" },
    //   ],
    // },
    { name: "Collections", href: "#" },
    {
      name: "Shop",
      href: "#",
      subItems: [
        { name: "Men", href: "#" },
        { name: "Women", href: "#" },
        { name: "Kids", href: "#" },
        { name: "Accessories", href: "#" },
      ],
    },
    { name: "Blog", href: "#" },
    {
      name: "Pages",
      href: "#",
      subItems: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
  ];

  return (
    <header className="relative sticky top-0 z-50 bg-white">
      <TopBar />

      <div className="flex items-center justify-between px-0 md:px-10 relative">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMobileMenu}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Left Menu - Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {["Home", "Collections", "Shop", "Blog", "Pages"].map((item) => (
            <div
              key={item}
              className="relative py-4"
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={handleLeave}
            >
              {/* <button className="flex items-center gap-1 font-medium hover:text-red-500 transition cursor-pointer">
                {item}
                {dropdowns[item] && <ChevronDown className="w-4 h-4 mt-[2px]" />}
              </button> */}
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                <div className="flex items-center gap-1 font-medium hover:text-red-500 transition cursor-pointer">
                  {item}
                  {dropdowns[item] && (
                    <ChevronDown className="w-4 h-4 mt-[2px]" />
                  )}
                </div>
              </Link>

              {/* Pages small dropdown (SMOOTH) */}
              {item === "Pages" && (
                <div
                  className={`
                    absolute left-0 top-full w-52 bg-white shadow-lg rounded-2xl z-50 origin-top
                    transition-all duration-500 ease-out
                    ${
                      activeMenu === "Pages"
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none invisible"
                    }
                  `}
                >
                  <div className="p-4">{dropdowns.Pages}</div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={logo} alt="Logo" width={150} height={50} />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 px-4 md:px-0">
          <User className="w-5 h-5 cursor-pointer hover:text-red-500" />
          <Star className="w-5 h-5 cursor-pointer hover:text-red-500" />
          <div className="relative">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <button className="hidden md:block border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-red-400 hover:text-white">
            Bulk Order
          </button>
        </div>

        {/* Global Dropdown  Shop - ALWAYS MOUNTED FOR SMOOTH ANIMATION */}
        <div
          onMouseEnter={() => handleHover(activeMenu)}
          onMouseLeave={handleLeave}
          className={`
            absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[90vw]
            bg-white shadow-lg rounded-2xl z-50 origin-top
            transition-all duration-700 ease-out
            ${
              ["Shop"].includes(activeMenu)
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
                : "opacity-0 -translate-y-3 scale-95 pointer-events-none invisible"
            }
          `}
        >
          <div className="p-8">{dropdowns[activeMenu]}</div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Image src={logo} alt="Logo" width={120} height={40} />
              <button onClick={toggleMobileMenu} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-4 overflow-y-auto h-full">
              <nav className="space-y-4">
                {mobileMenuItems.map((item) => (
                  <div key={item.name} className="border-b pb-4">
                    {item.subItems ? (
                      <div>
                        <div className="flex items-center justify-between font-medium text-lg mb-2">
                          <a
                            href={item.href}
                            className="hover:text-red-500"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                          <button
                            onClick={() => toggleExpandedItem(item.name)}
                            className="p-1 hover:text-red-500"
                          >
                            {expandedItems.includes(item.name) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {expandedItems.includes(item.name) && (
                          <ul className="space-y-2 pl-4 mt-2">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <a
                                  href={subItem.href}
                                  className="block py-2 text-gray-600 hover:text-red-500"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="block font-medium text-lg py-2 hover:text-red-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Icons */}
              <div className="flex items-center justify-around mt-8 pt-6 border-t">
                <div className="flex flex-col items-center">
                  <User className="w-6 h-6 mb-1" />
                  <span className="text-xs">Account</span>
                </div>
                <div className="flex flex-col items-center">
                  <Star className="w-6 h-6 mb-1" />
                  <span className="text-xs">Wishlist</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 mb-1" />
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs">Cart</span>
                </div>
              </div>

              {/* Bulk Order Button for Mobile */}
              <button className="w-full mt-6 border border-gray-300 px-4 py-3 rounded-lg hover:bg-red-400 hover:text-white font-medium">
                Bulk Order
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
