import { X, Layers, FlipHorizontal, Copy, RotateCcw, MoveRight, Layers2 } from "lucide-react";

export default function EditArtModal({
  art,
  onClose,
  onCenter,
  onDuplicate,
  onFlipX,
  onFlipY,
  onRotate,
  onRemoveWhite,
  onChangeArt,
  onUpdateSize,
  onLayerDown,
  onLayerUp
}) {
  if (!art) return null;

  return (
    <div className="absolute inset-0 bg-white z-[130] p-6 overflow-y-auto rounded-lg shadow-xl max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button className="text-lg font-bold text-gray-600 hover:text-blue-600" onClick={onClose}>
          ←
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Edit Art</h2>
        <button className="text-lg text-gray-600 hover:text-blue-600" onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6 mb-6 justify-around">
        <button onClick={onCenter} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <MoveRight className="text-xl mb-2" />
          <p className="text-sm">Center</p>
        </button>

        <button onClick={onDuplicate} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Copy className="text-xl mb-2" />
          <p className="text-sm">Duplicate</p>
        </button>

        <button onClick={onFlipX} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FlipHorizontal className="text-xl mb-2" />
          <p className="text-sm">Flip X</p>
        </button>

        <button onClick={onFlipY} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FlipHorizontal className="text-xl rotate-90 mb-2" />
          <p className="text-sm">Flip Y</p>
        </button>

        <button onClick={onLayerUp} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Layers className="text-xl mb-2" />
          <p className="text-sm">Layer Up</p>
        </button>
        <button onClick={onLayerDown} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Layers2 className="text-xl mb-2" />
          <p className="text-sm">Layer Down</p>
        </button>
      </div>

      {/* Rotation */}
      <div className="mb-6">
        <label className="font-semibold block mb-2 text-gray-700">Rotation</label>
        <input
          type="range"
          min="-180"
          max="180"
          value={art.rotation || 0}
          onChange={(e) => onRotate(Number(e.target.value))}
          className="w-full bg-gray-200 rounded-md focus:outline-none"
        />
        <input
          type="number"
          value={art.rotation || 0}
          onChange={(e) => onRotate(Number(e.target.value))}
          className="border p-2 w-20 mt-2 rounded-md focus:outline-none"
        />
      </div>

      {/* Remove White */}
      <div className="flex justify-between items-center py-4 border-t">
        <div>
          <p className="font-semibold text-gray-700">Remove White</p>
        </div>
        <label className="switch">
          <input type="checkbox" onChange={onRemoveWhite} />
        </label>
      </div>

      {/* Change Art */}
      <div className="flex justify-between items-center py-4 border-t">
        <p className="font-semibold text-gray-700">Change Art</p>
        <button className="text-blue-600 font-medium hover:underline" onClick={onChangeArt}>
          Change
        </button>
      </div>

      {/* Art Size */}
      <div className="py-4 border-t">
        <p className="font-semibold text-gray-700 mb-2">Art Size</p>

        <div className="flex items-center gap-4">
          <input
            type="number"
            value={art.width || 10}
            onChange={(e) => onUpdateSize("width", Number(e.target.value))}
            className="border p-2 w-24 rounded-md focus:outline-none"
          />
          <span>×</span>
          <input
            type="number"
            value={art.height || 10}
            onChange={(e) => onUpdateSize("height", Number(e.target.value))}
            className="border p-2 w-24 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200">
          Save Design
        </button>
      </div>
    </div>
  );
}
