const CropModal = ({
  selectedImage,
  cropHandles,
  cropContainerRef,
  canvasRef,
  isDragging,
  activeHandle,
  onCropHandleMouseDown,
  onCropHandlesChange,
  onApplyCrop,
  onCancelCrop,
}) => {
  const cropArea = {
    x: cropHandles.left,
    y: cropHandles.top,
    width: cropHandles.right - cropHandles.left,
    height: cropHandles.bottom - cropHandles.top,
  };

  const handleFullImage = () => {
    onCropHandlesChange({ top: 0, right: 100, bottom: 100, left: 0 });
  };

  const handleSquareCrop = () => {
    const size = Math.min(80, 100 - cropHandles.left);
    onCropHandlesChange({
      top: 10,
      right: cropHandles.left + size,
      bottom: 10 + size,
      left: 10,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Crop Image - Drag handles to resize crop area
        </h3>

        <CropControls
          cropHandles={cropHandles}
          cropArea={cropArea}
          onCropHandlesChange={onCropHandlesChange}
        />

        <CropPreview
          selectedImage={selectedImage}
          cropHandles={cropHandles}
          cropContainerRef={cropContainerRef}
          onCropHandleMouseDown={onCropHandleMouseDown}
        />

        <CropTips />

        <CropActions
          onCancel={onCancelCrop}
          onFullImage={handleFullImage}
          onSquareCrop={handleSquareCrop}
          onApply={onApplyCrop}
        />
      </div>
    </div>
  );
};

const CropControls = ({ cropHandles, cropArea, onCropHandlesChange }) => (
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
            onCropHandlesChange((prev) => ({
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
            onCropHandlesChange((prev) => ({
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
            onCropHandlesChange((prev) => ({
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
            onCropHandlesChange((prev) => ({
              ...prev,
              bottom: parseFloat(e.target.value),
            }))
          }
          className="w-full"
        />
      </div>
    </div>
    <div className="mt-2 text-center text-sm text-gray-600">
      Crop Area: {cropArea.width.toFixed(1)}% × {cropArea.height.toFixed(1)}%
    </div>
  </div>
);

const CropPreview = ({ selectedImage, cropHandles, cropContainerRef, onCropHandleMouseDown }) => (
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
      src={selectedImage.url}
      alt="Crop preview"
      className="w-full h-full object-contain"
    />

    {/* Crop area with handles */}
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
      <div
        className="absolute w-full h-2 cursor-n-resize -top-1"
        onMouseDown={(e) => onCropHandleMouseDown(e, "top")}
      />
      <div
        className="absolute w-full h-2 cursor-s-resize -bottom-1"
        onMouseDown={(e) => onCropHandleMouseDown(e, "bottom")}
      />
      <div
        className="absolute h-full w-2 cursor-w-resize -left-1"
        onMouseDown={(e) => onCropHandleMouseDown(e, "left")}
      />
      <div
        className="absolute h-full w-2 cursor-e-resize -right-1"
        onMouseDown={(e) => onCropHandleMouseDown(e, "right")}
      />

      {/* Corner handles */}
      <div
        className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-nw-resize -top-2 -left-2 rounded-sm"
        onMouseDown={(e) => onCropHandleMouseDown(e, "top-left")}
      />
      <div
        className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-ne-resize -top-2 -right-2 rounded-sm"
        onMouseDown={(e) => onCropHandleMouseDown(e, "top-right")}
      />
      <div
        className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-sw-resize -bottom-2 -left-2 rounded-sm"
        onMouseDown={(e) => onCropHandleMouseDown(e, "bottom-left")}
      />
      <div
        className="absolute w-4 h-4 bg-blue-500 border-2 border-white cursor-se-resize -bottom-2 -right-2 rounded-sm"
        onMouseDown={(e) => onCropHandleMouseDown(e, "bottom-right")}
      />
    </div>

    {/* Grid overlay */}
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
);

const CropTips = () => (
  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
    <p className="text-sm text-yellow-800 text-center">
      💡 <strong>Drag the blue handles</strong> to resize the crop area. Use edges for single-axis resizing and corners for both axes.
    </p>
  </div>
);

const CropActions = ({ onCancel, onFullImage, onSquareCrop, onApply }) => (
  <div className="flex justify-between mt-6">
    <button
      onClick={onCancel}
      className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
    >
      Cancel
    </button>
    <div className="space-x-4">
      <button
        onClick={onFullImage}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Full Image
      </button>
      <button
        onClick={onSquareCrop}
        className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Square
      </button>
      <button
        onClick={onApply}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Apply Crop
      </button>
    </div>
  </div>
);

export default CropModal;