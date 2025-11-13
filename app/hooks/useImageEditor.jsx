import { useState, useRef } from "react";

export const useImageEditor = () => {
  // State declarations
  const [view, setView] = useState("front");
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({ front: [], back: [] });
  const [selectedImageForEditing, setSelectedImageForEditing] = useState(null);
  const [uploadMode, setUploadMode] = useState(true);
  const [cropMode, setCropMode] = useState(false);
  const [cropHandles, setCropHandles] = useState({
    top: 10,
    right: 90,
    bottom: 90,
    left: 10,
  });
  const [originalImageUrls, setOriginalImageUrls] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null);
  const [dragType, setDragType] = useState(null);

  // Image editing state - Using inches for width/height
  const [width, setWidth] = useState(1.24); // Inches
  const [height, setHeight] = useState(1.24); // Inches
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [oneColor, setOneColor] = useState(false);
  const [invertColor, setInvertColor] = useState(false);
  const [shades, setShades] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const cropContainerRef = useRef(null);
  const dragData = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const rotateData = useRef({ angle: 0 });
  const resizeData = useRef({ size: 100 });

  // Calculate crop area from handles
  const cropArea = {
    x: cropHandles.left,
    y: cropHandles.top,
    width: cropHandles.right - cropHandles.left,
    height: cropHandles.bottom - cropHandles.top,
  };

  // Convert inches to pixels (assuming 96 DPI for web)
  const inchesToPixels = (inches) => Math.round(inches * 96);
  const pixelsToInches = (pixels) => parseFloat((pixels / 96).toFixed(2));

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

  // Handle upload
  // const handleUpload = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const url = URL.createObjectURL(file);

  //   // Get canvas dimensions safely
  //   const canvasElement = canvasRef?.current;
  //   let canvasWidth = 400;
  //   let canvasHeight = 400;

  //   if (canvasElement) {
  //     const rect = canvasElement.getBoundingClientRect();
  //     canvasWidth = rect.width;
  //     canvasHeight = rect.height;
  //   }

  //   const newImage = {
  //     id: Date.now(),
  //     url,
  //     name: file.name,
  //     x: canvasWidth / 2,
  //     y: canvasHeight / 2,
  //     size: inchesToPixels(1.4), // Convert default inches to pixels
  //     width: 1.4, // Store in inches
  //     height: 1.4, // Store in inches
  //     rotation: 0,
  //     contrast: 100,
  //     brightness: 100,
  //     saturation: 100,
  //     hue: 0,
  //     oneColor: false,
  //     invertColor: false,
  //     shades: false,
  //     removeBg: false,
  //     flipX: false,
  //     flipY: false,
  //   };

  //   setUploadedImages((prev) => ({
  //     ...prev,
  //     [view]: [...prev[view], newImage],
  //   }));

  //   setSelectedImageForEditing(newImage);
  //   setUploadMode(false);
  // };

  // Enhanced handleUpload function with better center calculation
  // Update the handleUpload function with proper center positioning
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    // Get canvas dimensions safely
    const canvasElement = canvasRef?.current;
    let canvasWidth = 400;
    let canvasHeight = 400;

    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
    }

    // Calculate center position of the canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const newImage = {
      id: Date.now(),
      url,
      name: file.name,
      x: centerX, // Position at center X
      y: centerY, // Position at center Y
      size: inchesToPixels(1.4), // Convert default inches to pixels
      width: 1.4, // Store in inches
      height: 1.4, // Store in inches
      rotation: 0,
      contrast: 100,
      brightness: 100,
      saturation: 100,
      hue: 0,
      oneColor: false,
      invertColor: false,
      shades: false,
      removeBg: false,
      flipX: false,
      flipY: false,
    };

    setUploadedImages((prev) => ({
      ...prev,
      [view]: [...prev[view], newImage],
    }));

    setSelectedImageForEditing(newImage);
    setUploadMode(false);
    setShowUploadPanel(true); // Close upload panel after upload
  };

  // Handle drag with proper boundaries - FIXED for all edges
  // Update the handleDrag function with proper boundary constraints
  const handleDrag = (e, imageId, canvasRef) => {
    const currentUploadedImages = uploadedImages[view];
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    // Get canvas boundaries
    const canvasElement = canvasRef?.current;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    dragData.current = {
      x: image.x,
      y: image.y,
      startX: e.clientX,
      startY: e.clientY,
    };

    const move = (ev) => {
      const dx = ev.clientX - dragData.current.startX;
      const dy = ev.clientY - dragData.current.startY;

      const newX = dragData.current.x + dx;
      const newY = dragData.current.y + dy;

      // Calculate boundaries - ensure NO part of image goes outside canvas
      const imgSize = image.size;
      const halfWidth = imgSize / 2;
      const halfHeight = imgSize / 2;

      // Calculate boundaries to keep entire image within canvas
      const minX = halfWidth; // Left edge of image at x=0
      const minY = halfHeight; // Top edge of image at y=0
      const maxX = canvasWidth - halfWidth; // Right edge of image at canvas width
      const maxY = canvasHeight - halfHeight; // Bottom edge of image at canvas height

      const boundedX = Math.max(minX, Math.min(maxX, newX));
      const boundedY = Math.max(minY, Math.min(maxY, newY));

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId ? { ...img, x: boundedX, y: boundedY } : img
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

  // Update the handleResize function with proper max size constraints
  const handleResize = (e, imageId, canvasRef) => {
    e.stopPropagation();
    const currentUploadedImages = uploadedImages[view];
    const image = currentUploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    // Get canvas boundaries
    const canvasElement = canvasRef?.current;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Calculate maximum size that fits within canvas
    const maxSize = Math.min(canvasWidth, canvasHeight);

    resizeData.current.size = image.size;
    const startY = e.clientY;

    const move = (ev) => {
      const delta = ev.clientY - startY;
      let newSize = resizeData.current.size + delta;

      const minSize = inchesToPixels(0.5); // minimum image size in pixels (0.5 inches)

      // Ensure image doesn't exceed canvas boundaries
      const boundedSize = Math.min(Math.max(newSize, minSize), maxSize);

      // Convert pixels to inches for width/height display
      const newSizeInInches = pixelsToInches(boundedSize);

      // After resize, reposition image to stay within bounds
      const halfSize = boundedSize / 2;
      let newX = image.x;
      let newY = image.y;

      // Reposition to keep image within canvas after resize
      newX = Math.max(halfSize, Math.min(canvasWidth - halfSize, newX));
      newY = Math.max(halfSize, Math.min(canvasHeight - halfSize, newY));

      // Update size (in pixels), width/height (in inches), and position
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === imageId
            ? {
                ...img,
                size: boundedSize,
                width: newSizeInInches,
                height: newSizeInInches,
                x: newX,
                y: newY,
              }
            : img
        ),
      }));

      // Update selected image state if this is the selected image
      if (selectedImageForEditing?.id === imageId) {
        setSelectedImageForEditing((prev) => ({
          ...prev,
          size: boundedSize,
          width: newSizeInInches,
          height: newSizeInInches,
          x: newX,
          y: newY,
        }));
        setWidth(newSizeInInches);
        setHeight(newSizeInInches);
      }
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
    const currentUploadedImages = uploadedImages[view];
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

      if (selectedImageForEditing?.id === imageId) {
        setSelectedImageForEditing((prev) => ({ ...prev, rotation: newAngle }));
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

  // Background removal function
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

          if (!targetColor) {
            const samplePoints = [];
            const sampleSize = 5;

            for (let i = 0; i < sampleSize; i++) {
              for (let j = 0; j < sampleSize; j++) {
                const tlIndex = 4 * (j * canvas.width + i);
                samplePoints.push([
                  data[tlIndex],
                  data[tlIndex + 1],
                  data[tlIndex + 2],
                ]);

                const trIndex = 4 * (j * canvas.width + (canvas.width - 1 - i));
                samplePoints.push([
                  data[trIndex],
                  data[trIndex + 1],
                  data[trIndex + 2],
                ]);

                const blIndex =
                  4 * ((canvas.height - 1 - j) * canvas.width + i);
                samplePoints.push([
                  data[blIndex],
                  data[blIndex + 1],
                  data[blIndex + 2],
                ]);

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

            const diff = Math.sqrt(
              Math.pow(r - targetR, 2) +
                Math.pow(g - targetG, 2) +
                Math.pow(b - targetB, 2)
            );

            if (diff <= tolerance) {
              data[i + 3] = 0;
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
  const handleImageClick = (image) => {
    setSelectedImageForEditing(image);
    setUploadMode(false);
    setShowUploadPanel(true);

    // Sync all properties with the selected image
    setWidth(image.width || 1.4);
    setHeight(image.height || 1.4);
    setContrast(image.contrast || 100);
    setBrightness(image.brightness || 100);
    setSaturation(image.saturation || 100);
    setHue(image.hue || 0);
    setOneColor(image.oneColor ?? false);
    setInvertColor(image.invertColor ?? false);
    setShades(image.shades ?? false);
    setRotation(image.rotation || 0);
    setFlipX(image.flipX ?? false);
    setFlipY(image.flipY ?? false);

    const removeBgValue = image.removeBg ?? false;
    setRemoveBg(removeBgValue);

    if (removeBgValue && !originalImageUrls[image.id]) {
      setOriginalImageUrls((prev) => ({
        ...prev,
        [image.id]: image.url,
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

  // Update image property - FIXED for inches conversion
  const updateImageProperty = async (property, value) => {
    if (!selectedImageForEditing) return;

    console.log(`Updating property: ${property} to:`, value);

    if (property === "removeBg") {
      try {
        if (value) {
          if (!originalImageUrls[selectedImageForEditing.id]) {
            setOriginalImageUrls((prev) => ({
              ...prev,
              [selectedImageForEditing.id]: selectedImageForEditing.url,
            }));
          }

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

          setSelectedImageForEditing((prev) => ({
            ...prev,
            url: processedUrl,
            removeBg: true,
          }));
        } else {
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

    // Special handling for width and height (in inches)
    if (property === "width" || property === "height") {
      const newValueInInches = parseFloat(value);
      const newValueInPixels = inchesToPixels(newValueInInches);

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? {
                ...img,
                [property]: newValueInInches,
                size: newValueInPixels, // Update size in pixels for rendering
              }
            : img
        ),
      }));

      setSelectedImageForEditing((prev) => ({
        ...prev,
        [property]: newValueInInches,
        size: newValueInPixels,
      }));

      if (property === "width") {
        setWidth(newValueInInches);
      } else {
        setHeight(newValueInInches);
      }

      return;
    }

    // For ALL properties including color editing
    setUploadedImages((prev) => ({
      ...prev,
      [view]: prev[view].map((img) =>
        img.id === selectedImageForEditing.id
          ? { ...img, [property]: value }
          : img
      ),
    }));

    setSelectedImageForEditing((prev) => ({
      ...prev,
      [property]: value,
    }));

    // Update the corresponding state
    switch (property) {
      case "contrast":
        setContrast(value);
        break;
      case "brightness":
        setBrightness(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      case "hue":
        setHue(value);
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
    setCropHandles({
      top: 10,
      right: 90,
      bottom: 90,
      left: 10,
    });
  };

  // Enhanced apply crop function with inches conversion
  // const applyCrop = async () => {
  //   if (!selectedImageForEditing || !canvasRef.current) return;

  //   const img = new Image();
  //   img.src = selectedImageForEditing.url;
  //   img.crossOrigin = "anonymous";

  //   img.onload = () => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     const cropX = (cropHandles.left / 100) * img.width;
  //     const cropY = (cropHandles.top / 100) * img.height;
  //     const cropWidth = ((cropHandles.right - cropHandles.left) / 100) * img.width;
  //     const cropHeight = ((cropHandles.bottom - cropHandles.top) / 100) * img.height;

  //     canvas.width = cropWidth;
  //     canvas.height = cropHeight;

  //     ctx.drawImage(
  //       img,
  //       cropX,
  //       cropY,
  //       cropWidth,
  //       cropHeight,
  //       0,
  //       0,
  //       cropWidth,
  //       cropHeight
  //     );

  //     const croppedUrl = canvas.toDataURL("image/png");

  //     const canvasElement = canvasRef.current;
  //     let canvasWidth = 400;
  //     let canvasHeight = 400;

  //     if (canvasElement) {
  //       const rect = canvasElement.getBoundingClientRect();
  //       canvasWidth = rect.width;
  //       canvasHeight = rect.height;
  //     }

  //     const newSize = Math.min(cropWidth, cropHeight) * 0.5;
  //     const newSizeInInches = pixelsToInches(newSize);

  //     setUploadedImages((prev) => ({
  //       ...prev,
  //       [view]: prev[view].map((image) =>
  //         image.id === selectedImageForEditing.id
  //           ? {
  //               ...image,
  //               url: croppedUrl,
  //               x: canvasWidth / 2,
  //               y: canvasHeight / 2,
  //               size: newSize,
  //               width: newSizeInInches,
  //               height: newSizeInInches,
  //             }
  //           : image
  //       ),
  //     }));

  //     setSelectedImageForEditing((prev) => ({
  //       ...prev,
  //       url: croppedUrl,
  //       x: canvasWidth / 2,
  //       y: canvasHeight / 2,
  //       size: newSize,
  //       width: newSizeInInches,
  //       height: newSizeInInches,
  //     }));

  //     setCropMode(false);
  //     setWidth(newSizeInInches);
  //     setHeight(newSizeInInches);
  //   };
  // };

  // Update applyCrop function
  const applyCrop = async () => {
    if (!selectedImageForEditing || !canvasRef.current) return;

    const img = new Image();
    img.src = selectedImageForEditing.url;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const cropX = (cropHandles.left / 100) * img.width;
      const cropY = (cropHandles.top / 100) * img.height;
      const cropWidth =
        ((cropHandles.right - cropHandles.left) / 100) * img.width;
      const cropHeight =
        ((cropHandles.bottom - cropHandles.top) / 100) * img.height;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const croppedUrl = canvas.toDataURL("image/png");

      const canvasElement = canvasRef.current;
      let canvasWidth = 400;
      let canvasHeight = 400;

      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();
        canvasWidth = rect.width;
        canvasHeight = rect.height;
      }

      // Calculate center position
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      const newSize = Math.min(cropWidth, cropHeight) * 0.5;
      const newSizeInInches = pixelsToInches(newSize);

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((image) =>
          image.id === selectedImageForEditing.id
            ? {
                ...image,
                url: croppedUrl,
                x: centerX, // Position at center
                y: centerY, // Position at center
                size: newSize,
                width: newSizeInInches,
                height: newSizeInInches,
              }
            : image
        ),
      }));

      setSelectedImageForEditing((prev) => ({
        ...prev,
        url: croppedUrl,
        x: centerX,
        y: centerY,
        size: newSize,
        width: newSizeInInches,
        height: newSizeInInches,
      }));

      setCropMode(false);
      setWidth(newSizeInInches);
      setHeight(newSizeInInches);
    };
  };

  const cancelCrop = () => {
    setCropMode(false);
    setIsDragging(false);
    setActiveHandle(null);
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

// const centerImage = () => {
//   console.log('this is center');
//   if (selectedImageForEditing) {
//     // Get the actual canvas element
//     const canvasElement = canvasRef?.current;
    
//     if (!canvasElement) {
//       console.log('Canvas element not found');
//       return;
//     }

//     // Get the actual dimensions of the canvas
//     const rect = canvasElement.getBoundingClientRect();
//     const canvasWidth = rect.width;
//     const canvasHeight = rect.height;

//     console.log('Actual canvas dimensions:', canvasWidth, canvasHeight);

//     const centerX = canvasWidth / 2;
//     const centerY = canvasHeight / 2;

//     console.log('Centering image to:', centerX, centerY);
//     console.log('Current image position:', selectedImageForEditing.x, selectedImageForEditing.y);

//     // Update the image position
//     setUploadedImages((prev) => ({
//       ...prev,
//       [view]: prev[view].map((img) =>
//         img.id === selectedImageForEditing.id
//           ? { ...img, x: centerX, y: centerY }
//           : img
//       ),
//     }));

//     // Also update the selected image state
//     setSelectedImageForEditing((prev) => ({
//       ...prev,
//       x: centerX,
//       y: centerY,
//     }));
//   }
// };

  // Apply layer changes
  
 const centerImage = () => {
  console.log('this is center');
  if (selectedImageForEditing) {
    // Use the new method to get canvas dimensions
    if (canvasRef.current && canvasRef.current.getCanvasDimensions) {
      const dimensions = canvasRef.current.getCanvasDimensions();
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      console.log('Centering image to:', centerX, centerY);

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? { ...img, x: centerX, y: centerY }
            : img
        ),
      }));

      setSelectedImageForEditing((prev) => ({
        ...prev,
        x: centerX,
        y: centerY,
      }));
    } else {
      console.log('Canvas ref not available, using fallback dimensions');
      // Fallback to known dimensions
      const centerX = 550 / 2;
      const centerY = 225 / 2;
      
      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? { ...img, x: centerX, y: centerY }
            : img
        ),
      }));

      setSelectedImageForEditing((prev) => ({
        ...prev,
        x: centerX,
        y: centerY,
      }));
    }
  }
};
  
  const moveLayer = (direction) => {
    if (!selectedImageForEditing) return;

    const currentImages = [...uploadedImages[view]];
    const currentIndex = currentImages.findIndex(
      (img) => img.id === selectedImageForEditing.id
    );

    if (direction === "up" && currentIndex < currentImages.length - 1) {
      [currentImages[currentIndex], currentImages[currentIndex + 1]] = [
        currentImages[currentIndex + 1],
        currentImages[currentIndex],
      ];
    } else if (direction === "down" && currentIndex > 0) {
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
                size: inchesToPixels(Math.max(width, height)),
                contrast: contrast,
                brightness: brightness,
                saturation: saturation,
                hue: hue,
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
  // const resetToOriginal = () => {
  //   if (selectedImageForEditing) {
  //     setWidth(1.4);
  //     setHeight(1.4);
  //     setContrast(100);
  //     setBrightness(100);
  //     setSaturation(100);
  //     setHue(0);
  //     setOneColor(false);
  //     setInvertColor(false);
  //     setShades(false);
  //     setRemoveBg(false);
  //     setRotation(0);
  //     setFlipX(false);
  //     setFlipY(false);

  //     const canvasElement = canvasRef?.current;
  //     let canvasWidth = 400;
  //     let canvasHeight = 400;

  //     if (canvasElement) {
  //       const rect = canvasElement.getBoundingClientRect();
  //       canvasWidth = rect.width;
  //       canvasHeight = rect.height;
  //     }

  //     setUploadedImages((prev) => ({
  //       ...prev,
  //       [view]: prev[view].map((img) =>
  //         img.id === selectedImageForEditing.id
  //           ? {
  //               ...img,
  //               x: canvasWidth / 2,
  //               y: canvasHeight / 2,
  //               size: inchesToPixels(1.4),
  //               width: 1.4,
  //               height: 1.4,
  //               rotation: 0,
  //               contrast: 100,
  //               brightness: 100,
  //               saturation: 100,
  //               hue: 0,
  //               oneColor: false,
  //               invertColor: false,
  //               shades: false,
  //               removeBg: false,
  //               flipX: false,
  //               flipY: false,
  //             }
  //           : img
  //       ),
  //     }));
  //   }
  // };
  // Update resetToOriginal function
  const resetToOriginal = () => {
    if (selectedImageForEditing) {
      setWidth(1.4);
      setHeight(1.4);
      setContrast(100);
      setBrightness(100);
      setSaturation(100);
      setHue(0);
      setOneColor(false);
      setInvertColor(false);
      setShades(false);
      setRemoveBg(false);
      setRotation(0);
      setFlipX(false);
      setFlipY(false);

      const canvasElement = canvasRef?.current;
      let canvasWidth = 400;
      let canvasHeight = 400;

      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();
        canvasWidth = rect.width;
        canvasHeight = rect.height;
      }

      // Calculate center
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      setUploadedImages((prev) => ({
        ...prev,
        [view]: prev[view].map((img) =>
          img.id === selectedImageForEditing.id
            ? {
                ...img,
                x: centerX,
                y: centerY,
                size: inchesToPixels(1.4),
                width: 1.4,
                height: 1.4,
                rotation: 0,
                contrast: 100,
                brightness: 100,
                saturation: 100,
                hue: 0,
                oneColor: false,
                invertColor: false,
                shades: false,
                removeBg: false,
                flipX: false,
                flipY: false,
              }
            : img
        ),
      }));
    }
  };

  // Add this function to deselect images
  const handleDeselectImage = () => {
    console.log("hello deselect");
    setSelectedImageForEditing(null);
    setUploadMode(true); // Switch back to upload mode when nothing is selected
  };

  return {
    // State
    view,
    showUploadPanel,
    uploadedImages,
    selectedImageForEditing,
    uploadMode,
    cropMode,
    cropHandles,
    originalImageUrls,
    isDragging,
    activeHandle,
    dragType,
    width,
    height,
    contrast,
    brightness,
    saturation,
    hue,
    oneColor,
    invertColor,
    shades,
    removeBg,
    rotation,
    flipX,
    flipY,
    cropArea,

    // Refs
    canvasRef,
    cropContainerRef,
    dragData,
    rotateData,
    resizeData,

    // Setters
    setView,
    setShowUploadPanel,
    setUploadedImages,
    setSelectedImageForEditing,
    setUploadMode,
    setCropMode,
    setCropHandles,
    setOriginalImageUrls,
    setIsDragging,
    setActiveHandle,
    setDragType,
    setWidth,
    setHeight,
    setContrast,
    setBrightness,
    setSaturation,
    setHue,
    setOneColor,
    setInvertColor,
    setShades,
    setRemoveBg,
    setRotation,
    setFlipX,
    setFlipY,

    // Handlers
    handleDeselectImage,
    handleViewChange,
    handleUploadButtonClick,
    handleImageClick,
    handleUpload,
    handleDrag,
    handleResize,
    handleRotate,
    removeUpload,
    updateImageProperty,
    handleCropHandleMouseDown,
    handleCrop,
    applyCrop,
    cancelCrop,
    duplicateImage,
    flipHorizontal,
    flipVertical,
    centerImage,
    moveLayer,
    applyEdits,
    resetToOriginal,
  };
};
