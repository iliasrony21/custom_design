"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function CropEditor({ imageSrc, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    const img = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const radians = (rotation * Math.PI) / 180;
    const safeArea = Math.max(img.width, img.height) * 2;

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(radians);
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.drawImage(img, (safeArea - img.width) / 2, (safeArea - img.height) / 2);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.putImageData(
      data,
      -croppedAreaPixels.x,
      -croppedAreaPixels.y
    );

    const croppedImage = canvas.toDataURL("image/jpeg");
    onCropDone(croppedImage);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (error) => reject(error));
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col justify-center items-center z-50">
      <div className="relative w-[90vw] h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mt-4 flex items-center gap-4 text-white">
        <label>
          Zoom:
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </label>

        <label>
          Rotate:
          <input
            type="range"
            min={0}
            max={360}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>

        <button
          onClick={getCroppedImg}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Crop
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
