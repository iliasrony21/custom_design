import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from '@/public/logo.png';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 pt-16 pb-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 text-black text-2xl font-bold mb-4">
          
            <span><Image src={logo} alt="Logo" width={150} height={50} /></span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Design your style, wear your vibe. Custom T-shirts made just for you.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-black text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-red-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Design Your Tee</a></li>
            <li><a href="#" className="hover:text-red-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-black text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-red-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-black text-lg font-semibold mb-4">Stay in the Loop</h3>
          <p className="text-gray-400 mb-4">Subscribe for updates, deals, and new T-shirt drops.</p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-8 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Cods. All rights reserved.</p>
        <div className="flex gap-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-red-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-red-400 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-red-400 transition"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}
