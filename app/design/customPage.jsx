"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  Type,
  Palette,
  ImageUp,
  BookImage,
  ShoppingBagIcon,
  ZoomIn,
  X,
  RotateCw,
  Maximize2,
  Trash2,
  Upload,
  AlignHorizontalSpaceAround,
  Crop,
  Layers,
  Layers2,
  FlipHorizontal2,
  FlipVertical2,
  Copy,
} from "lucide-react";

import front_side from "@/public/front_side.webp";
import back_side from "@/public/back_side.webp";

export default function Page() {
  const [width, setWidth] = useState(8.4);
  const [height, setHeight] = useState(11.2);
  const [contrast, setContrast] = useState(200);
  const [oneColor, setOneColor] = useState(true);
  const [invertColor, setInvertColor] = useState(false);
  const [shades, setShades] = useState(false);
  const [removeBg, setRemoveBg] = useState(true);
  const [rotation, setRotation] = useState(0);

  const [view, setView] = useState("front");
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    front: [],
    back: [],
  });
  const [selectedImageForEditing, setSelectedImageForEditing] = useState(null);
  const [uploadMode, setUploadMode] = useState(true); // true = upload, false = edit

  const dragData = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const rotateData = useRef({ angle: 0 });
  const resizeData = useRef({ size: 200 });

  // Get current uploaded images based on view
  const currentUploadedImages = uploadedImages[view];

  // Handle upload - add new image to current view
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    const newImage = {
      id: Date.now(),
      url,
      name: file.name,
      x: 290,
      y: 130,
      size: 230,
      rotate: 0,
      width: width,
      height: height,
      contrast: contrast,
      oneColor: oneColor,
      invertColor: invertColor,
      shades: shades,
      removeBg: removeBg,
      rotation: rotation,
    };

    // Add to current view
    setUploadedImages((prev) => ({
      ...prev,
      [view]: [...prev[view], newImage],
    }));

    // Automatically select the new image for editing
    setSelectedImageForEditing(newImage);
    setUploadMode(false); // Switch to edit mode
  };

  // Handle drag
  const handleDrag = (e, imageId) => {
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    dragData.current = {
      x: image.x,
      y: image.y,
      startX: e.clientX,
      startY: e.clientY,
    };

    const move = (ev) => {
      const dx = ev.clientX - dragData.current.startX;
      const dy = ev.clientY - dragData.current.startY;

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId
            ? { ...img, x: dragData.current.x + dx, y: dragData.current.y + dy }
            : img
        ),
      }));
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Handle resize
  const handleResize = (e, imageId) => {
    e.stopPropagation();
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    resizeData.current.size = image.size;
    const startY = e.clientY;

    const move = (ev) => {
      const delta = ev.clientY - startY;
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId
            ? { ...img, size: Math.max(80, resizeData.current.size + delta) }
            : img
        ),
      }));
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Handle rotate
  const handleRotate = (e, imageId) => {
    e.stopPropagation();
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    const startX = e.clientX;
    rotateData.current.angle = image.rotate;

    const move = (ev) => {
      const delta = ev.clientX - startX;
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId
            ? { ...img, rotate: rotateData.current.angle + delta * 0.5 }
            : img
        ),
      }));
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Remove uploaded image
  const removeUpload = (imageId) => {
    setUploadedImages((prev) => ({
      ...prev,
      [view]: prev[view].filter((img) => img.id !== imageId),
    }));

    // If we're removing the currently selected image, clear selection
    if (selectedImageForEditing && selectedImageForEditing.id === imageId) {
      setSelectedImageForEditing(null);
      setUploadMode(true);
    }
  };

  // Handle image click to select for editing
  const handleImageClick = (image) => {
    setSelectedImageForEditing(image);
    setUploadMode(false);
    setShowUploadPanel(true);
  };

  // Handle upload button click - always show upload interface
  const handleUploadButtonClick = () => {
    setShowUploadPanel(true);
    setUploadMode(true);
    setSelectedImageForEditing(null);
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
    setSelectedImageForEditing(null);
    setUploadMode(true);
  };

  // Apply edits to the selected image
  const applyEdits = () => {
    if (selectedImageForEditing) {
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? {
                ...img,
                width: width,
                height: height,
                contrast: contrast,
                oneColor: oneColor,
                invertColor: invertColor,
                shades: shades,
                removeBg: removeBg,
                rotation: rotation,
              }
            : img
        ),
      }));
    }
    setShowUploadPanel(false);
  };

  // Reset to original uploaded image
  const resetToOriginal = () => {
    if (selectedImageForEditing) {
      // Reset all edit properties to default
      setWidth(8.4);
      setHeight(11.2);
      setContrast(200);
      setOneColor(true);
      setInvertColor(false);
      setShades(false);
      setRemoveBg(true);
      setRotation(0);

      // Reset image position and size
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? {
                ...img,
                x: 290,
                y: 130,
                size: 230,
                rotate: 0,
                width: 8.4,
                height: 11.2,
                contrast: 200,
                oneColor: true,
                invertColor: false,
                shades: false,
                removeBg: true,
                rotation: 0,
              }
            : img
        ),
      }));
    }
  };

  // Center the selected image
  const centerImage = () => {
    if (selectedImageForEditing) {
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? { ...img, x: 290, y: 130 }
            : img
        ),
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pb-10 relative">
      {/* Sidebar */}
      <aside className="w-28 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6">
        <button
          onClick={handleUploadButtonClick}
          className="flex flex-col items-center hover:text-red-400"
        >
          <ImageUp />
          <span className="text-sm mt-1">Upload</span>
        </button>
        <button className="flex flex-col items-center hover:text-red-400">
          <Type className="w-8 h-8 " />
          <span className="text-sm mt-1">Add Text</span>
        </button>
        <button className="flex flex-col items-center hover:text-red-400">
          <BookImage className="w-8 h-8" />
          <span className="text-sm mt-1">Add Art</span>
        </button>
        <button className="flex flex-col items-center hover:text-red-400">
          <Palette />
          <span className="text-sm mt-1">Colors</span>
        </button>
      </aside>

      {/* Main left section */}
      <aside className="w-1/3 2xl:w-[400px] bg-white shadow-md z-20 relative">
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-8">What's next for you?</h2>

          <div className="grid grid-cols-2 gap-6">
            <div
              onClick={handleUploadButtonClick}
              className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer"
            >
              <ImageUp className="text-4xl mb-2" />
              <span className="font-medium">Uploads</span>
            </div>

            <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <Type className="w-8 h-8 mb-2" />
              <span className="font-medium">Add Text</span>
            </div>

            <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <BookImage className="text-4xl mb-2" />
              <span className="font-medium">Add Art</span>
            </div>

            <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <ShoppingBagIcon className="text-4xl mb-2" />
              <span className="font-medium text-center">Change Products</span>
            </div>
          </div>

          <p className="text-gray-600 text-center mt-8">
            💡 Drag & drop a file anywhere to upload.
          </p>
        </div>

        {/* Upload modal overlay */}
        {showUploadPanel && (
          <div className="absolute inset-0 bg-white border-l border-gray-200 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">
                {uploadMode ? "Upload Image" : "Edit Uploads"}
              </h3>
              <button
                onClick={() => setShowUploadPanel(false)}
                className="text-gray-600 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadMode ? (
              // Upload interface - ALWAYS shows when clicking upload button
              <div className="flex-1 flex flex-col items-center justify-center">
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Browse Your Computer
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
                <p className="mt-4 text-gray-500">or Drag & Drop Anywhere</p>
              </div>
            ) : (
              // Edit interface - only shows when an image is selected for editing
              <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-lg w-full overflow-auto">
                {/* Upload Size */}
                <div className="border-b border-gray-200 pb-4 flex justify-between">
                  <div className="left">
                    <h3 className="text-sm font-medium">Upload Size</h3>
                    <p className="text-xs text-gray-500">Width × Height (in)</p>
                  </div>
                  <div className="right space-x-2 mt-2">
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-16 text-center border rounded px-2 py-1"
                    />
                    <span>×</span>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-16 text-center border rounded px-2 py-1"
                    />
                  </div>
                </div>

                {/* Edit Color */}
                <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Edit Color</h3>
                    <p className="text-xs text-gray-500">White</p>
                  </div>
                  <div className="w-6 h-6 bg-white border rounded"></div>
                </div>

                <div className="space-y-4">
                  {/* One Color Toggle */}
                  <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Make One Color{" "}
                      <span className="text-xs text-blue-500">New!</span>
                    </h3>
                    <input
                      type="checkbox"
                      checked={oneColor}
                      onChange={() => setOneColor(!oneColor)}
                      className="toggle-checkbox"
                    />
                  </div>

                  {/* Show these only if oneColor is true */}
                  {oneColor && (
                    <div className="bg-gray-200 rounded-xl px-4">
                      {/* Contrast Slider */}
                      <div className="border-b border-gray-200 pb-4 ">
                        <h3 className="text-sm font-medium mb-2">Contrast</h3>
                        <input
                          type="range"
                          min="1"
                          max="255"
                          value={contrast}
                          onChange={(e) => setContrast(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      {/* Invert Colors */}
                      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Invert color</h3>
                        <input
                          type="checkbox"
                          checked={invertColor}
                          onChange={() => setInvertColor(!invertColor)}
                          className="toggle-checkbox"
                        />
                      </div>

                      {/* Shades */}
                      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Shades of color</h3>
                        <input
                          type="checkbox"
                          checked={shades}
                          onChange={() => setShades(!shades)}
                          className="toggle-checkbox"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remove Background */}
                <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                  <h3 className="text-sm font-medium">
                    Remove Background Color
                  </h3>
                  <input
                    type="checkbox"
                    checked={removeBg}
                    onChange={() => setRemoveBg(!removeBg)}
                    className="toggle-checkbox"
                  />
                </div>

                {/* Styles */}
                <div className="bg-white border-b border-gray-200 p-3 space-y-3">
                  {/* Row 1 */}
                  <div className="flex items-center space-x-6">
                    {/* Center Tool */}
                    <div className="flex flex-col items-center">
                      <button
                        className="disabled:opacity-50 p-2 rounded hover:bg-gray-100"
                        onClick={centerImage}
                      >
                        <AlignHorizontalSpaceAround />
                      </button>
                      <span className="text-xs mt-1 text-gray-600">Center</span>
                    </div>

                    {/* Layering Tool */}
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-1">
                        <button className="p-2 rounded hover:bg-gray-100">
                          <Layers />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <Layers2 />
                        </button>
                      </div>
                      <span className="text-xs mt-1 text-gray-600">
                        Layering
                      </span>
                    </div>

                    {/* Flip Tool */}
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-1">
                        <button className="p-2 rounded hover:bg-gray-100">
                          <FlipHorizontal2 />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <FlipVertical2 />
                        </button>
                      </div>
                      <span className="text-xs mt-1 text-gray-600">Flip</span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center space-x-6">
                    {/* Duplicate Tool */}
                    <div className="flex flex-col items-center">
                      <button className="p-2 rounded hover:bg-gray-100">
                        <Copy />
                      </button>
                      <span className="text-xs mt-1 text-gray-600">
                        Duplicate
                      </span>
                    </div>

                    {/* Crop Tool */}
                    <div className="flex flex-col items-center">
                      <button className="p-2 rounded hover:bg-gray-100">
                        <Crop />
                      </button>
                      <span className="text-xs mt-1 text-gray-600">Crop</span>
                    </div>
                  </div>
                </div>

                {/* Rotation */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-medium mb-2">Rotation</h3>
                  <input
                    type="number"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-16 text-center border rounded px-2 py-1 mb-2"
                  />
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-1 gap-4">
                  <button
                    onClick={resetToOriginal}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
                  >
                    Reset To Original
                  </button>
                  <button
                    onClick={applyEdits}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Save Design
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Main design canvas */}
      <section className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-full h-full">
          <Image
            src={view === "back" ? back_side : front_side}
            alt="Product View"
            fill
            className="object-contain rounded-lg"
          />

          {/* Uploaded image overlays - Multiple images can be displayed */}
          {currentUploadedImages.map((image) => (
            <div
              key={image.id}
              className="absolute group cursor-move"
              onMouseDown={(e) => handleDrag(e, image.id)}
              onClick={() => handleImageClick(image)}
              style={{
                top: image.y,
                left: image.x,
                width: image.size,
                height: image.size,
                transform: `rotate(${image.rotate}deg)`,
                transformOrigin: "center center",
              }}
            >
              <img
                src={image.url}
                alt="Uploaded"
                className={`w-full h-full object-contain border-2 rounded shadow-lg ${
                  selectedImageForEditing?.id === image.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              />
              {/* ❌ top-left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeUpload(image.id);
                }}
                className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow hover:scale-110 z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
              {/* ⟳ bottom-left rotate */}
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleRotate(e, image.id);
                }}
                className="absolute -bottom-2 -left-2 bg-white rounded-full p-1 shadow hover:scale-110 z-10"
              >
                <RotateCw className="w-3 h-3 text-blue-600" />
              </button>
              {/* ⤢ bottom-right resize */}
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleResize(e, image.id);
                }}
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow hover:scale-110 cursor-se-resize z-10"
              >
                <Maximize2 className="w-3 h-3 text-green-600" />
              </button>
            </div>
          ))}
        </div>

        {/* View toggles */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-4 flex flex-col">
          <button
            onClick={() => handleViewChange("front")}
            className={`w-20 h-20 border-2 rounded-xl overflow-hidden ${
              view === "front" ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Image
              src={front_side}
              alt="Front"
              width={80}
              height={80}
              className="object-cover"
            />
            <p className="text-xs font-medium text-center">Front</p>
          </button>
          <button
            onClick={() => handleViewChange("back")}
            className={`w-20 h-20 border-2 rounded-xl overflow-hidden ${
              view === "back" ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Image
              src={back_side}
              alt="Back"
              width={80}
              height={80}
              className="object-cover"
            />
            <p className="text-xs font-medium text-center">Back</p>
          </button>
        </div>

        {/* Zoom button */}
        <button className="absolute bottom-24 right-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
          <ZoomIn />
        </button>
      </section>
    </div>
  );
}
