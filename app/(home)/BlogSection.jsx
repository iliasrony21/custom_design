"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import news1 from "../../public/news1.jpg";
import news2 from "../../public/news2.jpg";
import news3 from "../../public/news3.jpg";
import news4 from "../../public/news4.jpg";
import { useEffect } from "react";

const blogPosts = [
  {
    id: 1,
    image: news4,
    tags: ["Print Company", "Print Shop"],
    title: "Are you ready to make it awesome with us",
    author: "admin",
    date: "August 20, 2022",
  },
  {
    id: 2,
    image: news2,
    tags: ["Print Company"],
    title: "The best custom T-shirt designer WordPress theme",
    author: "admin",
    date: "August 20, 2022",
  },
  {
    id: 3,
    image: news3,
    tags: ["Print Shop"],
    title: "We can make your work better",
    author: "admin",
    date: "August 20, 2022",
  },
  {
    id: 4,
    image: news4,
    tags: ["Print Company"],
    title: "The best custom T-shirt designer WordPress theme",
    author: "admin",
    date: "August 20, 2022",
  },
];

export default function BlogSection() {
  // Apply custom classes after Swiper mounts (ensures custom buttons work)
  useEffect(() => {
    const prevEl = document.querySelector(".custom-prev");
    const nextEl = document.querySelector(".custom-next");

    // Fix for Swiper 9+ where navigation elements need manual assignment
    const swiperEls = document.querySelectorAll(".swiper");
    swiperEls.forEach((swiperEl) => {
      if (swiperEl.swiper) {
        swiperEl.swiper.params.navigation.prevEl = prevEl;
        swiperEl.swiper.params.navigation.nextEl = nextEl;
        swiperEl.swiper.navigation.init();
        swiperEl.swiper.navigation.update();
      }
    });
  }, []);

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="md:text-4xl text-xl font-bold text-gray-900">Most recent news</h2>
          <a
            href="#"
            className="flex items-center bg-white gap-2 text-sm font-medium text-gray-800 hover:text-white shadow-xl border-gray-200 border p-3 rounded-xl hover:bg-red-500 transition-all duration-300"
          >
            View All News →
          </a>
        </div>

        {/* Custom navigation buttons */}
        <div className="absolute left-4 2xl:left-40 top-1/2 -translate-y-1/2 z-10">
          <button className="custom-prev w-12 h-12 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute right-4 2xl:right-40 top-1/2 -translate-y-1/2 z-10">
          <button className="custom-next w-12 h-12 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md my-3 hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg h-14 font-semibold text-gray-900 mb-4 hover:text-red-600 cursor-pointer">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      👤
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">by {post.author}</p>
                      <p>{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
