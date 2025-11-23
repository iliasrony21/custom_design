"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

// Replace these with your actual images
import mainImage from '@/public/main.jpeg';
import gallery1 from '@/public/main2.jpeg';
import gallery2 from '@/public/main3.jpeg';
import gallery3 from '@/public/main4.jpeg';
import gallery4 from '@/public/main5.jpg';
import gallery5 from '@/public/1.jpg';
import gallery6 from '@/public/2.jpg';
import Link from 'next/link';

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('True Royal Heather');

  const deliveryOptions = [
    { label: 'First Delivery', date: 'Dec 9' },
    { label: 'Run Delivery', date: 'Dec 3' },
    { label: 'Super Push', date: 'Dec 1' }
  ];

  const colorOptions = [
    { name: 'True Royal Heather', class: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { name: 'Black', class: 'bg-gray-900' },
    { name: 'Navy', class: 'bg-blue-900' },
    { name: 'Red', class: 'bg-red-600' },
    { name: 'Forest Green', class: 'bg-green-700' },
    { name: 'Charcoal', class: 'bg-gray-600' }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Image Gallery */}
          <div className="lg:w-1/2">
            {/* Main Image Swiper */}
            <div className="mb-4">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="main-swiper rounded-lg"
              >
                <SwiperSlide>
                  <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={mainImage}
                      alt="Sport-Tek Performance Quarter Zip Pullover"
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={gallery1}
                      alt="Product view 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={gallery2}
                      alt="Product view 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={gallery3}
                      alt="Product view 3"
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={gallery4}
                      alt="Product view 4"
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <div className="mt-4">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="thumbnail-swiper"
              >
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={mainImage}
                      alt="Thumbnail 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery1}
                      alt="Thumbnail 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery2}
                      alt="Thumbnail 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery3}
                      alt="Thumbnail 4"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery4}
                      alt="Thumbnail 5"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery5}
                      alt="Thumbnail 6"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-20 bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={gallery6}
                      alt="Thumbnail 7"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sport-Tek Performance Quarter Zip Pullover - Printed
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">(789 ratings)</span>
                <span className="text-sm text-gray-600">35 reviews</span>
              </div>

              {/* Delivery Options */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                {deliveryOptions.map((option, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-900">{option.label}</div>
                    <div className="text-lg font-bold text-blue-600">{option.date}</div>
                  </div>
                ))}
              </div>
                {/* Additional Color Options */}
            <div className="mt-6 bg-white rounded-sm p-2 shadow-sm">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Available Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
                {colorOptions.map((color, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-8 h-8 rounded-md mx-auto  ${color.class} border border-gray-200`} />
                    <span className="text-xs text-gray-700">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

              <div className="border-t border-b border-gray-200 py-6 space-y-6">
                {/* Decoration Section */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Decoration:</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Printing
                    </span>
                  </div>
                </div> */}

                {/* Colors Section */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Colors:</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">No Minimum</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className={`w-8 h-8 rounded-full ${colorOptions[0].class} border-2 border-white shadow-sm`} />
                      <span className="text-sm font-medium text-gray-900">
                        {colorOptions[0].name}
                      </span>
                      <span className="text-sm text-gray-600 ml-auto">XS - 4XL</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Check Sales for all colors
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Minimum Quantity: <span className="font-medium">1</span>
                  </div>
                </div> */}

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Size:</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                          selectedSize === size
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-4">
                <Link href={'/design/custom_design'} className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  Start Designing
                </Link>
                
                <div className="flex justify-center gap-4 text-sm mt-4">
                  <button className="text-red-600 hover:text-red-800 font-medium">
                    Request a Sample
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-red-600 hover:text-red-800 font-medium">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .main-swiper .swiper-button-next,
        .main-swiper .swiper-button-prev {
          color: gray;
         padding:5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .main-swiper .swiper-button-next:after,
        .main-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .thumbnail-swiper .swiper-slide-thumb-active {
          border-color: #2563eb !important;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;