"use client";

import { useRef, useState, useEffect, forwardRef } from "react";
import NextImage from "next/image";
import { ZoomIn } from "lucide-react";
import front_side from "@/public/front.jpg";
import back_side from "@/public/back_side.webp";
import UploadedImage from "./UploadedImage";

const DesignCanvas = forwardRef(({
  view,
  uploadedImages,
  selectedImageForEditing,
  onViewChange,
  onImageClick,
  onDrag,
  onResize,
  onRotate,
  onRemoveUpload,
}, ref) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  
  const currentUploadedImages = uploadedImages[view];
  const productImage = view === "back" ? back_side : front_side;

  // Update canvas size when component mounts/resizes
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasSize({
          width: rect.width,
          height: rect.height
        });
        
        console.log("Canvas size:", rect.width, rect.height);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Combine forwarded ref with internal ref
  useEffect(() => {
    if (ref) {
      ref.current = canvasRef.current;
    }
  }, [ref]);

  return (
    <section className="flex-1 flex flex-col items-center justify-center relative">
      {/* Main Product Image */}
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <NextImage
          src={productImage}
          alt="Product View"
          fill
          className="object-contain rounded-lg pointer-events-none select-none"
        />

        {/* Design Canvas Area - Dashed Border with proper overflow hidden */}
        <div
          ref={canvasRef}
          className="absolute top-5 right-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[550px] h-[50%] max-h-[400px] border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white/5"
        >
          {/* Canvas content area */}
          <div 
            className="relative w-full h-full"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {currentUploadedImages.map((image) => (
              <UploadedImage
                key={image.id}
                image={image}
                isSelected={selectedImageForEditing?.id === image.id}
                onDrag={onDrag}
                onResize={onResize}
                onRotate={onRotate}
                onRemove={onRemoveUpload}
                onClick={onImageClick}
                canvasRef={canvasRef}
                canvasSize={canvasSize}
              />
            ))}
          </div>
        </div>
      </div>

      <ViewToggles view={view} onViewChange={onViewChange} />
      <ZoomButton />
    </section>
  );
});

DesignCanvas.displayName = 'DesignCanvas';

const ViewToggles = ({ view, onViewChange }) => (
  <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-4 flex flex-col">
    <ViewToggle
      view="front"
      currentView={view}
      image={front_side}
      label="Front"
      onChange={onViewChange}
    />
    <ViewToggle
      view="back"
      currentView={view}
      image={back_side}
      label="Back"
      onChange={onViewChange}
    />
  </div>
);

const ViewToggle = ({ view, currentView, image, label, onChange }) => (
  <button
    onClick={() => onChange(view)}
    className={`w-20 h-20 border-2 rounded-xl overflow-hidden ${
      currentView === view ? "border-red-500" : "border-gray-300"
    }`}
  >
    <NextImage
      src={image}
      alt={label}
      width={80}
      height={80}
      className="object-cover"
    />
    <p className="text-xs font-medium text-center">{label}</p>
  </button>
);

const ZoomButton = () => (
  <button className="absolute bottom-24 right-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
    <ZoomIn />
  </button>
);

export default DesignCanvas;