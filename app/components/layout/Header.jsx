"use client";

import { useState } from "react";
import { ShoppingBag, User, Star, ChevronDown, Menu, X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import logo from '@/public/logo.png';

import TopBar from "./TopBar";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const handleHover = (menu) => setActiveMenu(menu);
  const handleLeave = () => setActiveMenu(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const toggleExpandedItem = (itemName) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

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

  // Mobile menu items - simplified version without complex dropdowns
  const mobileMenuItems = [
    { name: "Home", href: "#" },
    { 
      name: "Collections", 
      href: "#",
      subItems: [
        { name: "New Arrivals", href: "#" },
        { name: "Best Sellers", href: "#" },
        { name: "Limited Edition", href: "#" },
        { name: "T-Shirts", href: "#" },
        { name: "Hoodies", href: "#" },
        { name: "Accessories", href: "#" }
      ]
    },
    { 
      name: "Shop", 
      href: "#",
      subItems: [
        { name: "Men", href: "#" },
        { name: "Women", href: "#" },
        { name: "Kids", href: "#" },
        { name: "Accessories", href: "#" }
      ]
    },
    { name: "Blog", href: "#" },
    { 
      name: "Pages", 
      href: "#",
      subItems: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
  ];

  return (
    <header className="relative">
      {/* Topbar */}
      <TopBar />

      {/* Main Header */}
      <div className="flex items-center justify-between px-0 md:px-10 relative">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
        >
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
        <div className="flex items-center gap-5 px-4 md:px-0">
          <User className="w-5 h-5 cursor-pointer hover:text-green-500" />
          <Star className="w-5 h-5 cursor-pointer hover:text-green-500" />
          <div className="relative">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-green-500" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <button className="hidden md:block border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-green-400 hover:text-white">
            Bulk Order
          </button>
        </div>

        {/* Global Dropdown (Collections + Shop) - Desktop */}
        {["Collections", "Shop"].includes(activeMenu) && (
          <div
            onMouseEnter={() => handleHover(activeMenu)}
            onMouseLeave={handleLeave}
            className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[90vw] bg-white shadow-lg rounded-2xl transition-all duration-700 ease-in-out transform origin-top z-50 ${
              activeMenu
                ? "opacity-100 scale-100 translate-y-0 visible"
                : "opacity-0 scale-95 -translate-y-2 invisible"
            }`}
          >
            <div className="p-8">{dropdowns[activeMenu]}</div>
          </div>
        )}
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Image src={logo} alt="Logo" width={120} height={40} />
              <button 
                onClick={toggleMobileMenu}
                className="p-2"
              >
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
                            className="hover:text-green-500"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                          <button 
                            onClick={() => toggleExpandedItem(item.name)}
                            className="p-1 hover:text-green-500"
                          >
                            {expandedItems.includes(item.name) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {/* Sub-items - hidden by default, shown when expanded */}
                        {expandedItems.includes(item.name) && (
                          <ul className="space-y-2 pl-4 mt-2">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <a 
                                  href={subItem.href} 
                                  className="block py-2 text-gray-600 hover:text-green-500"
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
                        className="block font-medium text-lg py-2 hover:text-green-500"
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
                    <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs">Cart</span>
                </div>
              </div>

              {/* Bulk Order Button for Mobile */}
              <button className="w-full mt-6 border border-gray-300 px-4 py-3 rounded-lg hover:bg-green-400 hover:text-white font-medium">
                Bulk Order
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}