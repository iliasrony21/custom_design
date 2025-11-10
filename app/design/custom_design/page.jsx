"use client";
import NextImage from "next/image";
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
  // Enhanced crop state and functions
  const [cropMode, setCropMode] = useState(false);
  const [cropHandles, setCropHandles] = useState({
    top: 10,
    right: 90,
    bottom: 90,
    left: 10,
  });
  // const [cropArea, setCropArea] = useState({
  //   x: 10,
  //   y: 10,
  //   width: 80,
  //   height: 80,
  // });
  // Store original URLs to reset properly
  const [originalImageUrls, setOriginalImageUrls] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null);
  const [dragType, setDragType] = useState(null); // 'move', 'nw', 'ne', 'sw', 'se'
  const canvasRef = useRef(null);
  const cropContainerRef = useRef(null);

  // Calculate crop area from handles
  const cropArea = {
    x: cropHandles.left,
    y: cropHandles.top,
    width: cropHandles.right - cropHandles.left,
    height: cropHandles.bottom - cropHandles.top,
  };

  // Handle crop handle dragging
  const handleCropHandleMouseDown = (e, handleType) => {
    e.stopPropagation();
    setIsDragging(true);
    setActiveHandle(handleType);

    const startX = e.clientX;
    const startY = e.clientY;
    const startHandles = { ...cropHandles };

    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;

      const deltaX =
        ((moveEvent.clientX - startX) / cropContainerRef.current?.offsetWidth) *
        100;
      const deltaY =
        ((moveEvent.clientY - startY) /
          cropContainerRef.current?.offsetHeight) *
        100;

      let newHandles = { ...startHandles };

      switch (handleType) {
        case "top":
          newHandles.top = Math.max(
            0,
            Math.min(newHandles.bottom - 5, startHandles.top + deltaY)
          );
          break;
        case "bottom":
          newHandles.bottom = Math.max(
            newHandles.top + 5,
            Math.min(100, startHandles.bottom + deltaY)
          );
          break;
        case "left":
          newHandles.left = Math.max(
            0,
            Math.min(newHandles.right - 5, startHandles.left + deltaX)
          );
          break;
        case "right":
          newHandles.right = Math.max(
            newHandles.left + 5,
            Math.min(100, startHandles.right + deltaX)
          );
          break;
        case "top-left":
          newHandles.top = Math.max(
            0,
            Math.min(newHandles.bottom - 5, startHandles.top + deltaY)
          );
          newHandles.left = Math.max(
            0,
            Math.min(newHandles.right - 5, startHandles.left + deltaX)
          );
          break;
        case "top-right":
          newHandles.top = Math.max(
            0,
            Math.min(newHandles.bottom - 5, startHandles.top + deltaY)
          );
          newHandles.right = Math.max(
            newHandles.left + 5,
            Math.min(100, startHandles.right + deltaX)
          );
          break;
        case "bottom-left":
          newHandles.bottom = Math.max(
            newHandles.top + 5,
            Math.min(100, startHandles.bottom + deltaY)
          );
          newHandles.left = Math.max(
            0,
            Math.min(newHandles.right - 5, startHandles.left + deltaX)
          );
          break;
        case "bottom-right":
          newHandles.bottom = Math.max(
            newHandles.top + 5,
            Math.min(100, startHandles.bottom + deltaY)
          );
          newHandles.right = Math.max(
            newHandles.left + 5,
            Math.min(100, startHandles.right + deltaX)
          );
          break;
        default:
          break;
      }

      setCropHandles(newHandles);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveHandle(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const [width, setWidth] = useState(8.4);
  const [height, setHeight] = useState(11.2);
  const [contrast, setContrast] = useState(200);
  const [oneColor, setOneColor] = useState(true);
  const [invertColor, setInvertColor] = useState(false);
  const [shades, setShades] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  const [view, setView] = useState("front");
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    front: [],
    back: [],
  });
  const [selectedImageForEditing, setSelectedImageForEditing] = useState(null);
  const [uploadMode, setUploadMode] = useState(true);

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
      flipX: false,
      flipY: false,
    };

    setUploadedImages((prev) => ({
      ...prev,
      [view]: [...prev[view], newImage],
    }));

    setSelectedImageForEditing(newImage);
    setUploadMode(false);
  };

  const handleCropMouseDown = (e, type = "move") => {
    e.stopPropagation();
    setIsDragging(true);
    setDragType(type);

    const startX = e.clientX;
    const startY = e.clientY;
    const startCrop = { ...cropArea };

    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;

      const deltaX =
        ((moveEvent.clientX - startX) / cropContainerRef.current?.offsetWidth) *
        100;
      const deltaY =
        ((moveEvent.clientY - startY) /
          cropContainerRef.current?.offsetHeight) *
        100;

      let newCropArea = { ...startCrop };

      switch (type) {
        case "move":
          newCropArea.x = Math.max(
            0,
            Math.min(100 - startCrop.width, startCrop.x + deltaX)
          );
          newCropArea.y = Math.max(
            0,
            Math.min(100 - startCrop.height, startCrop.y + deltaY)
          );
          break;
        case "nw":
          newCropArea.x = Math.max(
            0,
            Math.min(startCrop.x + startCrop.width - 10, startCrop.x + deltaX)
          );
          newCropArea.y = Math.max(
            0,
            Math.min(startCrop.y + startCrop.height - 10, startCrop.y + deltaY)
          );
          newCropArea.width = Math.max(
            10,
            Math.min(100 - newCropArea.x, startCrop.width - deltaX)
          );
          newCropArea.height = Math.max(
            10,
            Math.min(100 - newCropArea.y, startCrop.height - deltaY)
          );
          break;
        case "ne":
          newCropArea.y = Math.max(
            0,
            Math.min(startCrop.y + startCrop.height - 10, startCrop.y + deltaY)
          );
          newCropArea.width = Math.max(
            10,
            Math.min(100 - startCrop.x, startCrop.width + deltaX)
          );
          newCropArea.height = Math.max(
            10,
            Math.min(100 - newCropArea.y, startCrop.height - deltaY)
          );
          break;
        case "sw":
          newCropArea.x = Math.max(
            0,
            Math.min(startCrop.x + startCrop.width - 10, startCrop.x + deltaX)
          );
          newCropArea.width = Math.max(
            10,
            Math.min(100 - newCropArea.x, startCrop.width - deltaX)
          );
          newCropArea.height = Math.max(
            10,
            Math.min(100 - startCrop.y, startCrop.height + deltaY)
          );
          break;
        case "se":
          newCropArea.width = Math.max(
            10,
            Math.min(100 - startCrop.x, startCrop.width + deltaX)
          );
          newCropArea.height = Math.max(
            10,
            Math.min(100 - startCrop.y, startCrop.height + deltaY)
          );
          break;
        default:
          break;
      }

      setCropArea(newCropArea);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragType(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
  // const handleRotate = (e, imageId) => {
  //   e.stopPropagation();
  //   const image = currentUploadedImages.find((img) => img.id === imageId);
  //   if (!image) return;

  //   const startX = e.clientX;
  //   rotateData.current.angle = image.rotate;

  //   const move = (ev) => {
  //     const delta = ev.clientX - startX;
  //     setUploadedImages((prev) => ({
  //       ...prev,
  //       [view]: prev[view].map((img) =>
  //         img.id === imageId
  //           ? { ...img, rotate: rotateData.current.angle + delta * 0.5 }
  //           : img
  //       ),
  //     }));
  //   };

  //   const up = () => {
  //     window.removeEventListener("mousemove", move);
  //     window.removeEventListener("mouseup", up);
  //   };

  //   window.addEventListener("mousemove", move);
  //   window.addEventListener("mouseup", up);
  // };

  // Handle rotate by dragging corner
  const handleRotate = (e, imageId) => {
    e.stopPropagation();
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    const startX = e.clientX;
    rotateData.current.angle = image.rotation || 0;

    const move = (ev) => {
      const delta = ev.clientX - startX;
      const newAngle = rotateData.current.angle + delta * 0.5;

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId ? { ...img, rotation: newAngle } : img
        ),
      }));

      // Sync rotation state for side panel
      if (selectedImageForEditing?.id === imageId) {
        setRotation(newAngle);
      }
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Utility to remove white background
  // const removeWhiteBackground = async (imageUrl) => {
  //   return new Promise((resolve) => {
  //     const img = new Image();
  //     img.crossOrigin = "anonymous";
  //     img.src = imageUrl;
  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);

  //       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //       const data = imageData.data;

  //       // Remove near-white background
  //       for (let i = 0; i < data.length; i += 4) {
  //         if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) {
  //           data[i + 3] = 0; // transparent
  //         }
  //       }

  //       ctx.putImageData(imageData, 0, 0);
  //       resolve(canvas.toDataURL("image/png"));
  //     };
  //   });
  // };

  // Enhanced background removal function
  const removeBackground = async (
    imageUrl,
    targetColor = null,
    tolerance = 30
  ) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // If no specific color provided, detect the corner color as background
          if (!targetColor) {
            // Sample multiple points from corners to detect background color
            const samplePoints = [];
            const sampleSize = 5;

            // Sample from all four corners
            for (let i = 0; i < sampleSize; i++) {
              for (let j = 0; j < sampleSize; j++) {
                // Top-left corner
                const tlIndex = 4 * (j * canvas.width + i);
                samplePoints.push([
                  data[tlIndex],
                  data[tlIndex + 1],
                  data[tlIndex + 2],
                ]);

                // Top-right corner
                const trIndex = 4 * (j * canvas.width + (canvas.width - 1 - i));
                samplePoints.push([
                  data[trIndex],
                  data[trIndex + 1],
                  data[trIndex + 2],
                ]);

                // Bottom-left corner
                const blIndex =
                  4 * ((canvas.height - 1 - j) * canvas.width + i);
                samplePoints.push([
                  data[blIndex],
                  data[blIndex + 1],
                  data[blIndex + 2],
                ]);

                // Bottom-right corner
                const brIndex =
                  4 *
                  ((canvas.height - 1 - j) * canvas.width +
                    (canvas.width - 1 - i));
                samplePoints.push([
                  data[brIndex],
                  data[brIndex + 1],
                  data[brIndex + 2],
                ]);
              }
            }

            // Calculate average color
            const avgColor = samplePoints.reduce(
              (acc, color) => {
                acc[0] += color[0];
                acc[1] += color[1];
                acc[2] += color[2];
                return acc;
              },
              [0, 0, 0]
            );

            targetColor = [
              Math.round(avgColor[0] / samplePoints.length),
              Math.round(avgColor[1] / samplePoints.length),
              Math.round(avgColor[2] / samplePoints.length),
            ];
          }

          const [targetR, targetG, targetB] = targetColor;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate color difference
            const diff = Math.sqrt(
              Math.pow(r - targetR, 2) +
                Math.pow(g - targetG, 2) +
                Math.pow(b - targetB, 2)
            );

            // Remove pixels within tolerance range
            if (diff <= tolerance) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error("Failed to load image"));
    });
  };

  // Remove uploaded image
  const removeUpload = (imageId) => {
    setUploadedImages((prev) => ({
      ...prev,
      [view]: prev[view].filter((img) => img.id !== imageId),
    }));

    if (selectedImageForEditing && selectedImageForEditing.id === imageId) {
      setSelectedImageForEditing(null);
      setUploadMode(true);
    }
  };

  // Handle image click to select for editing
// Fix for background removal state persistence
const handleImageClick = (image) => {
  setSelectedImageForEditing(image);
  setUploadMode(false);
  setShowUploadPanel(true);

  // Sync editing panel with image properties
  setWidth(image.width || 8.4);
  setHeight(image.height || 11.2);
  setContrast(image.contrast || 200);
  setOneColor(image.oneColor ?? true);
  setInvertColor(image.invertColor ?? false);
  setShades(image.shades ?? false);
  setRotation(image.rotation || 0);
  setFlipX(image.flipX ?? false);
  setFlipY(image.flipY ?? false);
  
  // Special handling for removeBg to ensure proper state
  const removeBgValue = image.removeBg ?? false;
  setRemoveBg(removeBgValue);
  
  // If removeBg is true but we don't have the processed URL, process it
  if (removeBgValue && !originalImageUrls[image.id]) {
    setOriginalImageUrls(prev => ({
      ...prev,
      [image.id]: image.url
    }));
  }
};

  // Handle upload button click
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

  // Update the image property
  // const updateImageProperty = (property, value) => {
  //   if (!selectedImageForEditing) return;
  //   setUploadedImages((prev) => ({
  //     ...prev,
  //     [view]: prev[view].map((img) =>
  //       img.id === selectedImageForEditing.id ? { ...img, [property]: value } : img
  //     ),
  //   }));
  // };
  // const updateImageProperty = async (property, value) => {
  //   if (!selectedImageForEditing) return;

  //   // Handle background removal separately
  //   if (property === "removeBg" && value) {
  //     const processedUrl = await removeWhiteBackground(
  //       selectedImageForEditing.url
  //     );
  //     setUploadedImages((prev) => ({
  //       ...prev,
  //       [view]: prev[view].map((img) =>
  //         img.id === selectedImageForEditing.id
  //           ? { ...img, url: processedUrl }
  //           : img
  //       ),
  //     }));
  //     return;
  //   }

  //   setUploadedImages((prev) => ({
  //     ...prev,
  //     [view]: prev[view].map((img) =>
  //       img.id === selectedImageForEditing.id
  //         ? { ...img, [property]: value }
  //         : img
  //     ),
  //   }));
  // };

  const updateImageProperty = async (property, value) => {
    if (!selectedImageForEditing) return;

    // Handle background removal toggle
    if (property === "removeBg") {
      try {
        if (value) {
          // Store original URL if not already stored
          if (!originalImageUrls[selectedImageForEditing.id]) {
            setOriginalImageUrls((prev) => ({
              ...prev,
              [selectedImageForEditing.id]: selectedImageForEditing.url,
            }));
          }

          // Remove background
          const processedUrl = await removeBackground(
            selectedImageForEditing.url
          );
          setUploadedImages((prev) => ({
            ...prev,
            [view]: prev[view].map((img) =>
              img.id === selectedImageForEditing.id
                ? { ...img, url: processedUrl, removeBg: true }
                : img
            ),
          }));

          // Update selected image
          setSelectedImageForEditing((prev) => ({
            ...prev,
            url: processedUrl,
            removeBg: true,
          }));
        } else {
          // Reset to original image
          const originalUrl =
            originalImageUrls[selectedImageForEditing.id] ||
            selectedImageForEditing.url;
          setUploadedImages((prev) => ({
            ...prev,
            [view]: prev[view].map((img) =>
              img.id === selectedImageForEditing.id
                ? { ...img, url: originalUrl, removeBg: false }
                : img
            ),
          }));

          // Update selected image
          setSelectedImageForEditing((prev) => ({
            ...prev,
            url: originalUrl,
            removeBg: false,
          }));
        }
        setRemoveBg(value);
      } catch (error) {
        console.error("Background removal failed:", error);
        setRemoveBg(false);
      }
      return;
    }

    // Handle other properties
    setUploadedImages((prev) => ({
      ...prev,
      [view]: prev[view].map((img) =>
        img.id === selectedImageForEditing.id
          ? { ...img, [property]: value }
          : img
      ),
    }));

    // Update selected image
    setSelectedImageForEditing((prev) => ({
      ...prev,
      [property]: value,
    }));

    // Update local state for immediate feedback
    switch (property) {
      case "width":
        setWidth(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "contrast":
        setContrast(value);
        break;
      case "oneColor":
        setOneColor(value);
        break;
      case "invertColor":
        setInvertColor(value);
        break;
      case "shades":
        setShades(value);
        break;
      case "rotation":
        setRotation(value);
        break;
      case "flipX":
        setFlipX(value);
        break;
      case "flipY":
        setFlipY(value);
        break;
      default:
        break;
    }
  };

  
  // Enhanced crop function
  const handleCrop = () => {
    setCropMode(true);
    // Reset crop handles to cover most of the image
    setCropHandles({
      top: 10,
      right: 90,
      bottom: 90,
      left: 10,
    });
  };

  // Enhanced apply crop function for resize-based cropping
  const applyCrop = async () => {
    if (!selectedImageForEditing || !canvasRef.current) return;

    const img = new Image();
    img.src = selectedImageForEditing.url;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Calculate actual crop coordinates and dimensions from handles
      const cropX = (cropHandles.left / 100) * img.width;
      const cropY = (cropHandles.top / 100) * img.height;
      const cropWidth =
        ((cropHandles.right - cropHandles.left) / 100) * img.width;
      const cropHeight =
        ((cropHandles.bottom - cropHandles.top) / 100) * img.height;

      // Set canvas size to crop dimensions
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw cropped image
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight, // source coordinates
        0,
        0,
        cropWidth,
        cropHeight // destination coordinates
      );

      const croppedUrl = canvas.toDataURL("image/png");

      // Update the image with cropped version and center it
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((image) =>
          image.id === selectedImageForEditing.id
            ? {
                ...image,
                url: croppedUrl,
                x: 290, // Center position
                y: 130,
                size: 230, // Reset size
                width: cropWidth / 100, // Convert to inches approximation
                height: cropHeight / 100,
              }
            : image
        ),
      }));

      setSelectedImageForEditing((prev) => ({
        ...prev,
        url: croppedUrl,
        x: 290,
        y: 130,
        size: 230,
        width: cropWidth / 100,
        height: cropHeight / 100,
      }));

      setCropMode(false);
      // Update width and height in state
      setWidth(cropWidth / 100);
      setHeight(cropHeight / 100);
    };
  };

  const cancelCrop = () => {
    setCropMode(false);
    setIsDragging(false);
    setActiveHandle(null);
  };

  // Update the image container to use actual dimensions
  const getImageStyle = (image) => {
    const aspectRatio = image.width / image.height;
    const baseSize = image.size || 30;

    return {
      width: `${baseSize}px`,
      height: `${baseSize / aspectRatio}px`,
      transform: `
      rotate(${image.rotation || 0}deg)
      scaleX(${image.flipX ? -1 : 1})
      scaleY(${image.flipY ? -1 : 1})
    `,
      transformOrigin: "center center",
    };
  };

  const duplicateImage = () => {
    if (!selectedImageForEditing) return;
    const copy = {
      ...selectedImageForEditing,
      id: Date.now(),
      x: selectedImageForEditing.x + 40,
      y: selectedImageForEditing.y + 40,
    };
    setUploadedImages((prev) => ({
      ...prev,
      [view]: [...prev[view], copy],
    }));
    setSelectedImageForEditing(copy);
  };

  const flipHorizontal = () => {
    const newFlipX = !flipX;
    setFlipX(newFlipX);
    updateImageProperty("flipX", newFlipX);
  };

  const flipVertical = () => {
    const newFlipY = !flipY;
    setFlipY(newFlipY);
    updateImageProperty("flipY", newFlipY);
  };

  const centerImage = () => {
    if (selectedImageForEditing) {
      updateImageProperty("x", 290);
      updateImageProperty("y", 130);
    }
  };

  // Apply layer changes
  const moveLayer = (direction) => {
    if (!selectedImageForEditing) return;

    const currentImages = [...uploadedImages[view]];
    const currentIndex = currentImages.findIndex(
      (img) => img.id === selectedImageForEditing.id
    );

    if (direction === "up" && currentIndex < currentImages.length - 1) {
      // Move up
      [currentImages[currentIndex], currentImages[currentIndex + 1]] = [
        currentImages[currentIndex + 1],
        currentImages[currentIndex],
      ];
    } else if (direction === "down" && currentIndex > 0) {
      // Move down
      [currentImages[currentIndex], currentImages[currentIndex - 1]] = [
        currentImages[currentIndex - 1],
        currentImages[currentIndex],
      ];
    }

    setUploadedImages((prev) => ({
      ...prev,
      [view]: currentImages,
    }));
  };

  // Generate CSS filters based on image properties
  const getImageFilters = (image) => {
    const filters = [];

    if (image.oneColor) {
      filters.push(`contrast(${image.contrast}%)`);
      if (image.invertColor) filters.push("invert(1)");
      if (image.shades) filters.push("grayscale(1)");
    }

    if (image.removeBg) {
      filters.push("brightness(1.2) saturate(0.8)");
    }

    return filters.join(" ");
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
                flipX: flipX,
                flipY: flipY,
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
      setRemoveBg(false);
      setRotation(0);
      setFlipX(false);
      setFlipY(false);

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
                removeBg: false,
                rotation: 0,
                flipX: false,
                flipY: false,
              }
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
      <aside className="w-.5/3 2xl:w-[400px] bg-white shadow-md z-20 relative">
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
              // Upload interface
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
              // Edit interface
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
                      onChange={(e) => {
                        setWidth(Number(e.target.value));
                        updateImageProperty("width", Number(e.target.value));
                      }}
                      className="w-16 text-center border rounded px-2 py-1"
                    />
                    <span>×</span>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        setHeight(Number(e.target.value));
                        updateImageProperty("height", Number(e.target.value));
                      }}
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
                      onChange={(e) => {
                        setOneColor(e.target.checked);
                        updateImageProperty("oneColor", e.target.checked);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Show these only if oneColor is true */}
                  {oneColor && (
                    <div className="bg-gray-100 rounded-xl px-4 py-2 space-y-4">
                      {/* Contrast Slider */}
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-sm font-medium mb-2">Contrast</h3>
                        <input
                          type="range"
                          min="1"
                          max="255"
                          value={contrast}
                          onChange={(e) => {
                            setContrast(Number(e.target.value));
                            updateImageProperty(
                              "contrast",
                              Number(e.target.value)
                            );
                          }}
                          className="w-full"
                        />
                        <div className="text-xs text-gray-500 text-center">
                          {contrast}%
                        </div>
                      </div>

                      {/* Invert Colors */}
                      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Invert color</h3>
                        <input
                          type="checkbox"
                          checked={invertColor}
                          onChange={(e) => {
                            setInvertColor(e.target.checked);
                            updateImageProperty(
                              "invertColor",
                              e.target.checked
                            );
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>

                      {/* Shades */}
                      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Shades of color</h3>
                        <input
                          type="checkbox"
                          checked={shades}
                          onChange={(e) => {
                            setShades(e.target.checked);
                            updateImageProperty("shades", e.target.checked);
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                    onChange={(e) => {
                      setRemoveBg(e.target.checked);
                      updateImageProperty("removeBg", e.target.checked);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={() => moveLayer("up")}
                        >
                          <Layers />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={() => moveLayer("down")}
                        >
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
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={flipHorizontal}
                        >
                          <FlipHorizontal2 />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-gray-100"
                          onClick={flipVertical}
                        >
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
                      <button
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={duplicateImage}
                      >
                        <Copy />
                      </button>
                      <span className="text-xs mt-1 text-gray-600">
                        Duplicate
                      </span>
                    </div>

                    {/* Crop Tool */}

                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleCrop}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                        disabled={!selectedImageForEditing}
                      >
                        <Crop size={18} />
                      </button>
                      <span className="text-xs mt-1 text-gray-600">Crop</span>
                    </div>
                  </div>
                </div>

                {/* Crop Canvas (hidden) */}
                {/* Hidden canvas for image processing */}
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Resize-Based Crop Preview Overlay */}
                {cropMode && selectedImageForEditing && (
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                      <h3 className="text-xl font-semibold mb-4 text-center">
                        Crop Image - Drag handles to resize crop area
                      </h3>

                      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium mb-2">Crop Dimensions:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="block text-gray-600">
                              Left: {cropHandles.left.toFixed(1)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max={cropHandles.right - 5}
                              step="0.1"
                              value={cropHandles.left}
                              onChange={(e) =>
                                setCropHandles((prev) => ({
                                  ...prev,
                                  left: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600">
                              Right: {cropHandles.right.toFixed(1)}%
                            </label>
                            <input
                              type="range"
                              min={cropHandles.left + 5}
                              max="100"
                              step="0.1"
                              value={cropHandles.right}
                              onChange={(e) =>
                                setCropHandles((prev) => ({
                                  ...prev,
                                  right: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600">
                              Top: {cropHandles.top.toFixed(1)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max={cropHandles.bottom - 5}
                              step="0.1"
                              value={cropHandles.top}
                              onChange={(e) =>
                                setCropHandles((prev) => ({
                                  ...prev,
                                  top: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600">
                              Bottom: {cropHandles.bottom.toFixed(1)}%
                            </label>
                            <input
                              type="range"
                              min={cropHandles.top + 5}
                              max="100"
                              step="0.1"
                              value={cropHandles.bottom}
                              onChange={(e) =>
                                setCropHandles((prev) => ({
                                  ...prev,
                                  bottom: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="mt-2 text-center text-sm text-gray-600">
                          Crop Area: {cropArea.width.toFixed(1)}% ×{" "}
                          {cropArea.height.toFixed(1)}%
                        </div>
                      </div>

                      <div
                        ref={cropContainerRef}
                        className="relative border-2 border-gray-300 mx-auto bg-gray-200"
                        style={{
                          width: "400px",
                          height: "500px",
                          maxWidth: "90vw",
                          maxHeight: "50vh",
                        }}
                      >
                        <img
                          src={selectedImageForEditing.url}
                          alt="Crop preview"
                          className="w-full h-full object-contain"
                        />

                        {/* Resize-based crop area with handles on all sides */}
                        <div
                          className="absolute border-2 border-blue-500 bg-transparent bg-opacity-20"
                          style={{
                            left: `${cropHandles.left}%`,
                            top: `${cropHandles.top}%`,
                            width: `${cropHandles.right - cropHandles.left}%`,
                            height: `${cropHandles.bottom - cropHandles.top}%`,
                          }}
                        >
                          {/* Edge handles */}
                          {/* Top edge */}
                          <div
                            className="absolute w-full h-2 cursor-n-resize -top-1"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "top")
                            }
                          />
                          {/* Bottom edge */}
                          <div
                            className="absolute w-full h-2 cursor-s-resize -bottom-1"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "bottom")
                            }
                          />
                          {/* Left edge */}
                          <div
                            className="absolute h-full w-2 cursor-w-resize -left-1"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "left")
                            }
                          />
                          {/* Right edge */}
                          <div
                            className="absolute h-full w-2 cursor-e-resize -right-1"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "right")
                            }
                          />

                          {/* Corner handles */}
                          <div
                            className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-nw-resize -top-2 -left-2 rounded-sm"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "top-left")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-ne-resize -top-2 -right-2 rounded-sm"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "top-right")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-sw-resize -bottom-2 -left-2 rounded-sm"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "bottom-left")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-se-resize -bottom-2 -right-2 rounded-sm"
                            onMouseDown={(e) =>
                              handleCropHandleMouseDown(e, "bottom-right")
                            }
                          />
                        </div>

                        {/* Grid overlay for better precision */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-30">
                            {[...Array(9)].map((_, i) => (
                              <div
                                key={i}
                                className="border border-gray-400 border-dashed"
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800 text-center">
                          💡 <strong>Drag the blue handles</strong> to resize
                          the crop area. Use edges for single-axis resizing and
                          corners for both axes.
                        </p>
                      </div>

                      <div className="flex justify-between mt-6">
                        <button
                          onClick={cancelCrop}
                          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <div className="space-x-4">
                          <button
                            onClick={() => {
                              // Reset to full image
                              setCropHandles({
                                top: 0,
                                right: 100,
                                bottom: 100,
                                left: 0,
                              });
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Full Image
                          </button>
                          <button
                            onClick={() => {
                              // Reset to square crop
                              const size = Math.min(80, 100 - cropHandles.left);
                              setCropHandles({
                                top: 10,
                                right: cropHandles.left + size,
                                bottom: 10 + size,
                                left: 10,
                              });
                            }}
                            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                          >
                            Square
                          </button>
                          <button
                            onClick={applyCrop}
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Apply Crop
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rotation */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-medium mb-2">Rotation</h3>
                  <input
                    type="number"
                    value={rotation}
                    onChange={(e) => {
                      setRotation(Number(e.target.value));
                      updateImageProperty("rotation", Number(e.target.value));
                    }}
                    className="w-16 text-center border rounded px-2 py-1 mb-2"
                  />
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => {
                      setRotation(Number(e.target.value));
                      updateImageProperty("rotation", Number(e.target.value));
                    }}
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
          <NextImage
            src={view === "back" ? back_side : front_side}
            alt="Product View"
            fill
            className="object-contain rounded-lg"
          />

          {/* Uploaded image overlays */}
          {currentUploadedImages.map((image) => (
            <div
              key={image.id}
              className="absolute group cursor-move"
              onMouseDown={(e) => handleDrag(e, image.id)}
              onClick={() => handleImageClick(image)}
              style={{
                top: image.y,
                left: image.x,
                ...getImageStyle(image),
              }}
            >
              <img
                src={image.url}
                alt="Uploaded"
                className={`w-full h-full object-cover border-2 rounded shadow-lg ${
                  selectedImageForEditing?.id === image.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                style={{
                  filter: getImageFilters(image),
                }}
              />
              {/* Control buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeUpload(image.id);
                }}
                className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow hover:scale-110 z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleRotate(e, image.id);
                }}
                className="absolute -bottom-2 -left-2 bg-white rounded-full p-1 shadow hover:scale-110 z-10"
              >
                <RotateCw className="w-3 h-3 text-blue-600" />
              </button>
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
            <NextImage
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
            <NextImage
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
