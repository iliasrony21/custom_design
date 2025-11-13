import { useState, useEffect } from "react";
import {
  AlignHorizontalSpaceAround,
  Layers,
  Layers2,
  FlipHorizontal2,
  FlipVertical2,
  Copy,
  Crop,
} from "lucide-react";

const EditInterface = ({
  selectedImage,
  onUpdateImageProperty,
  onCrop,
  onDuplicate,
  onFlipHorizontal,
  onFlipVertical,
  onCenter,
  onMoveLayer,
  onReset,
  onApplyEdits,
}) => {
  const [width, setWidth] = useState(selectedImage?.width || 8.4);
  const [height, setHeight] = useState(selectedImage?.height || 11.2);
  const [contrast, setContrast] = useState(selectedImage?.contrast || 200);
  const [oneColor, setOneColor] = useState(selectedImage?.oneColor ?? true);
  const [invertColor, setInvertColor] = useState(selectedImage?.invertColor ?? false);
  const [shades, setShades] = useState(selectedImage?.shades ?? false);
  const [removeBg, setRemoveBg] = useState(selectedImage?.removeBg ?? false);
  const [rotation, setRotation] = useState(selectedImage?.rotation || 0);

  // Sync with selected image changes
  useEffect(() => {
    if (selectedImage) {
      setWidth(selectedImage.width || 8.4);
      setHeight(selectedImage.height || 11.2);
      setContrast(selectedImage.contrast || 200);
      setOneColor(selectedImage.oneColor ?? true);
      setInvertColor(selectedImage.invertColor ?? false);
      setShades(selectedImage.shades ?? false);
      setRemoveBg(selectedImage.removeBg ?? false);
      setRotation(selectedImage.rotation || 0);
    }
  }, [selectedImage]);

  const handlePropertyChange = (property, value) => {
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
      case "removeBg":
        setRemoveBg(value);
        break;
      case "rotation":
        setRotation(value);
        break;
      default:
        break;
    }
    onUpdateImageProperty(property, value);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-lg w-full overflow-auto">
      {/* Upload Size */}
      <div className="border-b border-gray-200 pb-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium">Upload Size</h3>
          <p className="text-xs text-gray-500">Width × Height (in)</p>
        </div>
        <div className="space-x-2 mt-2">
          <input
            type="number"
            value={width}
            onChange={(e) => handlePropertyChange("width", Number(e.target.value))}
            className="w-16 text-center border rounded px-2 py-1"
          />
          <span>×</span>
          <input
            type="number"
            value={height}
            onChange={(e) => handlePropertyChange("height", Number(e.target.value))}
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

      {/* One Color Section */}
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
          <h3 className="text-sm font-medium">
            Make One Color <span className="text-xs text-blue-500">New!</span>
          </h3>
          <input
            type="checkbox"
            checked={oneColor}
            onChange={(e) => handlePropertyChange("oneColor", e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        {oneColor && (
          <div className="bg-gray-100 rounded-xl px-4 py-2 space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium mb-2">Contrast</h3>
              <input
                type="range"
                min="1"
                max="255"
                value={contrast}
                onChange={(e) => handlePropertyChange("contrast", Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">{contrast}%</div>
            </div>

            <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
              <h3 className="text-sm font-medium">Invert color</h3>
              <input
                type="checkbox"
                checked={invertColor}
                onChange={(e) => handlePropertyChange("invertColor", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
              <h3 className="text-sm font-medium">Shades of color</h3>
              <input
                type="checkbox"
                checked={shades}
                onChange={(e) => handlePropertyChange("shades", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Remove Background */}
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <h3 className="text-sm font-medium">Remove Background Color</h3>
        <input
          type="checkbox"
          checked={removeBg}
          onChange={(e) => handlePropertyChange("removeBg", e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      {/* Style Tools */}
      <StyleTools
        onCrop={onCrop}
        onDuplicate={onDuplicate}
        onFlipHorizontal={onFlipHorizontal}
        onFlipVertical={onFlipVertical}
        onCenter={onCenter}
        onMoveLayer={onMoveLayer}
      />

      {/* Rotation */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-sm font-medium mb-2">Rotation</h3>
        <input
          type="number"
          value={rotation}
          onChange={(e) => handlePropertyChange("rotation", Number(e.target.value))}
          className="w-16 text-center border rounded px-2 py-1 mb-2"
        />
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation}
          onChange={(e) => handlePropertyChange("rotation", Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-1 gap-4">
        <button
          onClick={onReset}
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

const StyleTools = ({
  onCrop,
  onDuplicate,
  onFlipHorizontal,
  onFlipVertical,
  onCenter,
  onMoveLayer,
}) => (
  <div className="bg-white border-b border-gray-200 p-3 space-y-3">
    <div className="flex items-center space-x-6">
      <ToolButton icon={AlignHorizontalSpaceAround} label="Center" onClick={onCenter} />
      <LayeringTool onMoveLayer={onMoveLayer} />
      <FlipTool onFlipHorizontal={onFlipHorizontal} onFlipVertical={onFlipVertical} />
    </div>
    <div className="flex items-center space-x-6">
      <ToolButton icon={Copy} label="Duplicate" onClick={onDuplicate} />
      <ToolButton icon={Crop} label="Crop" onClick={onCrop} />
    </div>
  </div>
);

const ToolButton = ({ icon: Icon, label, onClick, disabled = false }) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 p-2 rounded hover:bg-gray-100"
    >
      <Icon size={18} />
    </button>
    <span className="text-xs mt-1 text-gray-600">{label}</span>
  </div>
);

const LayeringTool = ({ onMoveLayer }) => (
  <div className="flex flex-col items-center">
    <div className="flex space-x-1">
      <button
        onClick={() => onMoveLayer("up")}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Layers />
      </button>
      <button
        onClick={() => onMoveLayer("down")}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Layers2 />
      </button>
    </div>
    <span className="text-xs mt-1 text-gray-600">Layering</span>
  </div>
);

const FlipTool = ({ onFlipHorizontal, onFlipVertical }) => (
  <div className="flex flex-col items-center">
    <div className="flex space-x-1">
      <button
        onClick={onFlipHorizontal}
        className="p-2 rounded hover:bg-gray-100"
      >
        <FlipHorizontal2 />
      </button>
      <button
        onClick={onFlipVertical}
        className="p-2 rounded hover:bg-gray-100"
      >
        <FlipVertical2 />
      </button>
    </div>
    <span className="text-xs mt-1 text-gray-600">Flip</span>
  </div>
);

export default EditInterface;