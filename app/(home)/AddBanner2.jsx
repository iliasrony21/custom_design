import Image from "next/image";
import banner_bg from "../../public/bannerbg.png";

export default function AddBanner2() {
  return (
    <section className="relative bg-gradient-to-r from-red-500 to-pink-500 py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-12">
        
        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-6 text-center lg:text-left w-full lg:w-2/5 text-white">
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Enjoy your vacations in the best <span className="text-yellow-300">T-shirts</span>
          </h3>
          <p className="text-lg text-gray-100 max-w-md mx-auto lg:mx-0">
            Comfortable. Stylish. Perfect for every adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-yellow-300 hover:text-red-700 transition-all duration-300">
              Shop Now →
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-red-600 transition-all duration-300">
              Contact Us →
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full lg:w-3/5 max-w-3xl">
          <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={banner_bg}
              alt="Promotional Banner"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 p-4"
              sizes="(max-width: 1024px) 90vw, 60vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
