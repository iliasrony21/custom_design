import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  User,
  ShoppingCart,
  Menu,
  ChevronRight,
} from "lucide-react";
import logo from "@/public/logo.png";

export default function CustomizePageHeader() {
  return (
    <header className="w-full bg-white fixed-top border-b border-black/10 sticky top-0 z-50">
      <div className="mx-auto flex h-16  items-center px-4 sm:px-6 lg:px-8">
        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden p-2 -ml-2 text-black/70 hover:text-black transition-colors">
          <Menu size={20} />
        </button>

        {/* LEFT SIDE: brand + breadcrumb */}
        <div className="flex flex-1 items-center gap-4 lg:gap-6">
          {/* Logo for mobile */}
          <Link href="/" className="lg:hidden relative h-8 w-28">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Breadcrumb area */}
          {/* Breadcrumb area */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-black/70">
            <Link href="/my-designs" className="hover:text-black">
              My Designs
            </Link>
            <span className="text-black/40">›</span>
            <span className="flex items-center gap-1">
              Untitled design
              <span className="text-black/50">✎</span>
            </span>
          </nav>
        </div>

        {/* CENTER LOGO - Desktop only */}
        <div className="flex flex-1 justify-center">
          <Link
            href="/"
            className="relative h-9 w-36 sm:h-10 sm:w-40 hidden lg:block"
          >
            <Image
              src={logo}
              alt="Center Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* RIGHT SIDE: call/chat + sign in + cart */}
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
          {/* Call section - Desktop only */}
          <div className="hidden xl:flex items-center gap-2 text-sm text-black/80 group cursor-pointer">
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <Phone
                size={16}
                className="text-black/70 group-hover:text-orange-600 transition-colors"
              />
            </div>
            <div className="leading-tight">
             
              <div className="font-semibold text-black group-hover:text-orange-600 transition-colors">
                01304591910
              </div>
            </div>
          </div>

          {/* Chat section - Desktop only */}
          <Link
            href="/chat"
            className="hidden xl:flex items-center gap-2 text-sm text-black/80 group"
          >
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <MessageCircle
                size={16}
                className="text-black/70 group-hover:text-orange-600 transition-colors"
              />
            </div>
            <div className="leading-tight">
            
              <div className="font-semibold text-orange-600 group-hover:text-orange-700 transition-colors">
                Chat Now
              </div>
            </div>
          </Link>

          {/* Mobile call/chat icons */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/tel:8442228343"
              className="p-2 text-black/70 hover:text-black transition-colors"
            >
              <Phone size={18} />
            </Link>
            <Link
              href="/chat"
              className="p-2 text-black/70 hover:text-black transition-colors"
            >
              <MessageCircle size={18} />
            </Link>
          </div>

          {/* Sign In */}
          <Link
            href="/signin"
            className="flex items-center gap-1 text-sm text-black/80 hover:text-black transition-colors group p-2 rounded-lg hover:bg-white/50"
          >
            <User
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            {/* <span className="hidden sm:inline">Sign In</span> */}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center text-black/80 hover:text-black transition-colors group p-2 rounded-lg hover:bg-white/50"
          >
            <ShoppingCart
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            {/* Cart count badge */}
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-600 text-xs font-medium text-white shadow-sm group-hover:scale-110 transition-transform">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE BREADCRUMB BAR - Optional secondary bar for mobile */}
      <div className="lg:hidden border-t border-black/10 bg-white/50">
        <div className="mx-auto px-4 py-2 text-sm text-black/70">
          <nav className="flex items-center gap-2">
            <Link
              href="/my-designs"
              className="hover:text-black transition-colors"
            >
              My Designs
            </Link>
            <ChevronRight size={16} className="text-black/40" />
            <span className="font-medium text-black">Untitled design</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
