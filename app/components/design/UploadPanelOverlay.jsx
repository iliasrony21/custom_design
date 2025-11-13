import { X, Upload, AlignHorizontalSpaceAround, Layers, Layers2, FlipHorizontal2, FlipVertical2, Copy, Crop } from "lucide-react";

const UploadPanelOverlay = ({
  uploadMode,
  selectedImageForEditing,
  width,
  height,
  contrast,
  oneColor,
  invertColor,
  shades,
  removeBg,
  rotation,
  cropMode,
  cropHandles,
  cropArea,
  canvasRef,
  cropContainerRef,
  isDragging,
  activeHandle,
  onClose,
  onUpload,
  onUpdateImageProperty,
  onCropHandleMouseDown,
  onCrop,
  onCancelCrop,
  onApplyCrop,
  onCropHandlesChange,
  onCenterImage,
  onMoveLayer,
  onFlipHorizontal,
  onFlipVertical,
  onDuplicateImage,
  onResetToOriginal,
  onApplyEdits,
  setWidth,
  setHeight,
  setContrast,
  setOneColor,
  setInvertColor,
  setShades,
  setRemoveBg,
  setRotation,
}) => {
  return (
    <div className="absolute inset-0 bg-white border-l border-gray-200 shadow-2xl flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">
          {uploadMode ? "Upload Image" : "Edit Uploads"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {uploadMode ? (
        <UploadInterface onUpload={onUpload} />
      ) : (
        <EditInterface
          selectedImageForEditing={selectedImageForEditing}
          width={width}
          height={height}
          contrast={contrast}
          oneColor={oneColor}
          invertColor={invertColor}
          shades={shades}
          removeBg={removeBg}
          rotation={rotation}
          cropMode={cropMode}
          cropHandles={cropHandles}
          cropArea={cropArea}
          canvasRef={canvasRef}
          cropContainerRef={cropContainerRef}
          isDragging={isDragging}
          activeHandle={activeHandle}
          onUpdateImageProperty={onUpdateImageProperty}
          onCropHandleMouseDown={onCropHandleMouseDown}
          onCrop={onCrop}
          onCancelCrop={onCancelCrop}
          onApplyCrop={onApplyCrop}
          onCropHandlesChange={onCropHandlesChange}
          onCenterImage={onCenterImage}
          onMoveLayer={onMoveLayer}
          onFlipHorizontal={onFlipHorizontal}
          onFlipVertical={onFlipVertical}
          onDuplicateImage={onDuplicateImage}
          onResetToOriginal={onResetToOriginal}
          onApplyEdits={onApplyEdits}
          setWidth={setWidth}
          setHeight={setHeight}
          setContrast={setContrast}
          setOneColor={setOneColor}
          setInvertColor={setInvertColor}
          setShades={setShades}
          setRemoveBg={setRemoveBg}
          setRotation={setRotation}
        />
      )}
    </div>
  );
};

const UploadInterface = ({ onUpload }) => {
  return (
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
        onChange={onUpload}
        className="hidden"
      />
      <p className="mt-4 text-gray-500">or Drag & Drop Anywhere</p>
    </div>
  );
};

const EditInterface = ({
  selectedImageForEditing,
  width,
  height,
  contrast,
  oneColor,
  invertColor,
  shades,
  removeBg,
  rotation,
  cropMode,
  cropHandles,
  cropArea,
  canvasRef,
  cropContainerRef,
  isDragging,
  activeHandle,
  onUpdateImageProperty,
  onCropHandleMouseDown,
  onCrop,
  onCancelCrop,
  onApplyCrop,
  onCropHandlesChange,
  onCenterImage,
  onMoveLayer,
  onFlipHorizontal,
  onFlipVertical,
  onDuplicateImage,
  onResetToOriginal,
  onApplyEdits,
  setWidth,
  setHeight,
  setContrast,
  setOneColor,
  setInvertColor,
  setShades,
  setRemoveBg,
  setRotation,
}) => {
  return (
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
              onUpdateImageProperty("width", Number(e.target.value));
            }}
            className="w-16 text-center border rounded px-2 py-1"
          />
          <span>×</span>
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(Number(e.target.value));
              onUpdateImageProperty("height", Number(e.target.value));
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
              onUpdateImageProperty("oneColor", e.target.checked);
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
                  onUpdateImageProperty("contrast", Number(e.target.value));
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
                  onUpdateImageProperty("invertColor", e.target.checked);
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
                  onUpdateImageProperty("shades", e.target.checked);
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
            onUpdateImageProperty("removeBg", e.target.checked);
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
              onClick={onCenterImage}
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
                onClick={() => onMoveLayer("up")}
              >
                <Layers />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => onMoveLayer("down")}
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
                onClick={onFlipHorizontal}
              >
                <FlipHorizontal2 />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={onFlipVertical}
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
              onClick={onDuplicateImage}
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
              onClick={onCrop}
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
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Crop Modal */}
      {cropMode && selectedImageForEditing && (
        <CropModal
          selectedImageForEditing={selectedImageForEditing}
          cropHandles={cropHandles}
          cropArea={cropArea}
          cropContainerRef={cropContainerRef}
          isDragging={isDragging}
          activeHandle={activeHandle}
          onCropHandleMouseDown={onCropHandleMouseDown}
          onCropHandlesChange={onCropHandlesChange}
          onCancelCrop={onCancelCrop}
          onApplyCrop={onApplyCrop}
        />
      )}

      {/* Rotation */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-sm font-medium mb-2">Rotation</h3>
        <input
          type="number"
          value={rotation}
          onChange={(e) => {
            setRotation(Number(e.target.value));
            onUpdateImageProperty("rotation", Number(e.target.value));
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
            onUpdateImageProperty("rotation", Number(e.target.value));
          }}
          className="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-1 gap-4">
        <button
          onClick={onResetToOriginal}
          className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          Reset To Original
        </button>
        <button
          onClick={onApplyEdits}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Save Design
        </button>
      </div>
    </div>
  );
};

const CropModal = ({
  selectedImageForEditing,
  cropHandles,
  cropArea,
  cropContainerRef,
  isDragging,
  activeHandle,
  onCropHandleMouseDown,
  onCropHandlesChange,
  onCancelCrop,
  onApplyCrop,
}) => {
  const handleFullImage = () => {
    onCropHandlesChange({
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
    });
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
            onClick={onCancelCrop}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <div className="space-x-4">
            <button
              onClick={handleFullImage}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Full Image
            </button>
            <button
              onClick={handleSquareCrop}
              className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Square
            </button>
            <button
              onClick={onApplyCrop}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPanelOverlay;