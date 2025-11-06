"use client";
import Image from "next/image";
import { useState } from "react";
import front_side from '@/public/front_side.webp';
import back_side from '@/public/back_side.webp';

export default function Page() {
  const [view, setView] = useState("back");

  return (
    <div className="flex h-screen bg-gray-100 pb-10">
      {/* Sidebar */}
      <aside className="w-28 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6">
        <button className="flex flex-col items-center hover:text-blue-400">
          <span className="text-3xl">☁️</span>
          <span className="text-sm mt-1">Upload</span>
        </button>
        <button className="flex flex-col items-center hover:text-blue-400">
          <span className="text-3xl">🔤</span>
          <span className="text-sm mt-1">Add Text</span>
        </button>
        <button className="flex flex-col items-center hover:text-blue-400">
          <span className="text-3xl">🖼️</span>
          <span className="text-sm mt-1">Add Art</span>
        </button>
        <button className="flex flex-col items-center hover:text-blue-400">
          <span className="text-3xl">🎨</span>
          <span className="text-sm mt-1">Colors</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left panel */}
        <section className="w-1/3 bg-white shadow-md p-10 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-8">What’s next for you?</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center border rounded-xl p-6 hover:shadow-lg cursor-pointer">
              <span className="text-4xl mb-2">☁️</span>
              <span className="font-medium">Uploads</span>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-xl p-6 hover:shadow-lg cursor-pointer">
              <span className="text-4xl mb-2">🔤</span>
              <span className="font-medium">Add Text</span>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-xl p-6 hover:shadow-lg cursor-pointer">
              <span className="text-4xl mb-2">🖼️</span>
              <span className="font-medium">Add Art</span>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-xl p-6 hover:shadow-lg cursor-pointer">
              <span className="text-4xl mb-2">👕</span>
              <span className="font-medium text-center">Change Products</span>
            </div>
          </div>

          <p className="text-gray-600 text-center mt-8">
            💡 Drag & drop a file anywhere to upload.
          </p>
        </section>

        {/* Right product preview */}
        <section className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-[800px] h-[500px]">
            {view === "back" ? (
              <Image
                src={back_side}
                alt="Cap Back"
                fill
                className="object-contain rounded-lg"
              />
            ) : (
              <Image
                src={front_side}
                alt="Cap Front"
                fill
                className="object-contain rounded-lg w-full h-full"
              />
            )}

            {/* Example art overlay */}
            {/* {view === "back" && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-semibold rotate-12">
                  hello
                </div>
              </div>
            )} */}
          </div>

          {/* View controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-4 flex flex-col">
            <button
              onClick={() => setView("front")}
              className={`w-20 h-20 border-2 rounded-xl overflow-hidden ${
                view === "front" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={front_side}
                alt="Front View"
                width={80}
                height={80}
                className="object-cover"
              />
              <p className="text-xs font-medium text-center">Front</p>
            </button>

            <button
              onClick={() => setView("back")}
              className={`w-20 h-20 border-2 rounded-xl overflow-hidden ${
                view === "back" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={back_side}
                alt="Back View"
                width={80}
                height={80}
                className="object-cover"
              />
              <p className="text-xs font-medium text-center">Back</p>
            </button>
          </div>

          {/* Zoom button */}
          <button className="absolute bottom-30 right-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-2xl">
            🔍
          </button>
        </section>
      </main>
    </div>
  );
}
