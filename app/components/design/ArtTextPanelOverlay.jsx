import {
  X,
  ChevronRight,
  Check,
  Layers,
  Layers2,
  FlipHorizontal2,
  FlipVertical2,
  Copy,
  AlignHorizontalSpaceAround,
} from "lucide-react";
import { LuAlignLeft, LuAlignRight } from "react-icons/lu";
import { MdOutlineFormatAlignCenter } from "react-icons/md";

const ArtTextPanelOverlay = ({
  textMode,
  selectedTextForEditing,
  inputText,
  font,
  color,
  outline,
  shape,
  textSize,
  textRotation,
  textFlipX,
  textFlipY,
  textAlign, // Add this prop
  textVerticalAlign, // Add this prop
  showFontModal,
  showColorModal,
  showOutlineModal,
  showShapeModal,
  availableFonts,
  availableColors,
  availableOutlines,
  availableShapes,
  onClose,
  onTextModeChange,
  onAddText,
  onUpdateTextProperty,
  setInputText,
  setFont,
  setColor,
  setOutline,
  setShape,
  setTextSize,
  setTextRotation,
  setTextFlipX,
  setTextFlipY,
  setShowFontModal,
  setShowColorModal,
  setShowOutlineModal,
  setShowShapeModal,
  onFontSelect,
  onColorSelect,
  onOutlineSelect,
  onShapeSelect,
  onFlipTextHorizontal,
  onFlipTextVertical,
  onDuplicateText,
  onCenterText,
  onResetTextToDefault,
  alignTextLeft,
  alignTextCenter,
  alignTextRight,
  alignTextTop,
  alignTextMiddle,
  alignTextBottom,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
  // Add new real-time handlers
  handleTextContentChange,
  handleFontChange,
  handleColorChange,
  handleOutlineChange,
  handleShapeChange,
  handleTextSizeChange,
  handleRotationChange,
}) => {
  const handleAddTextClick = () => {
    console.log("Add Text button clicked, input text:", inputText);
    onAddText();
  };

  // Close all modals when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowFontModal(false);
      setShowColorModal(false);
      setShowOutlineModal(false);
      setShowShapeModal(false);
    }
  };

  console.log(
    "TextPanelOverlay render - textMode:",
    textMode,
    "selectedText:",
    selectedTextForEditing
  );

  return (
    <div className="absolute inset-0 bg-white border-l border-gray-200 shadow-2xl flex flex-col z-30">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">
          {textMode ? "Add Text" : "Edit Text"}
        </h3>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6" onClick={handleBackdropClick}>
        {textMode ? (
          // Add Text Mode
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <button
              onClick={handleAddTextClick}
              disabled={!inputText.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Text
            </button>
          </div>
        ) : (
          // Edit Text Mode - ALL CHANGES ARE REAL-TIME NOW
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={selectedTextForEditing?.text || ""}
                onChange={(e) => handleTextContentChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            {/* Font Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Font
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowFontModal(!showFontModal)}
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  <span style={{ fontFamily: font }}>{font}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {showFontModal && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
                    {availableFonts.map((fontOption) => (
                      <button
                        key={fontOption}
                        onClick={() => onFontSelect(fontOption)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex justify-between items-center"
                        style={{ fontFamily: fontOption }}
                      >
                        {fontOption}
                        {font === fontOption && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowColorModal(!showColorModal)}
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                    <span>{color}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {showColorModal && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-40 p-3">
                    <div className="grid grid-cols-5 gap-2">
                      {availableColors.map((colorOption) => (
                        <button
                          key={colorOption}
                          onClick={() => onColorSelect(colorOption)}
                          className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: colorOption }}
                          title={colorOption}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Outline Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Outline
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowOutlineModal(!showOutlineModal)}
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  <span>{outline}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {showOutlineModal && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
                    {availableOutlines.map((outlineOption) => (
                      <button
                        key={outlineOption}
                        onClick={() => onOutlineSelect(outlineOption)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex justify-between items-center"
                      >
                        {outlineOption}
                        {outline === outlineOption && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Shape Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Shape
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowShapeModal(!showShapeModal)}
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  <span>{shape}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {showShapeModal && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
                    {availableShapes.map((shapeOption) => (
                      <button
                        key={shapeOption}
                        onClick={() => onShapeSelect(shapeOption)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex justify-between items-center"
                      >
                        {shapeOption}
                        {shape === shapeOption && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Text Size - Real-time updates */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Text Size: {textSize}px
              </label>
              <input
                type="range"
                min="8"
                max="72"
                value={textSize}
                onChange={(e) => handleTextSizeChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Rotation - Real-time updates */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Rotation: {textRotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={textRotation}
                onChange={(e) => handleRotationChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Text Alignment Controls */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Text Alignment
              </label>
              <div className="flex gap-2">
                <button
                  onClick={alignTextLeft}
                  className={`p-2 border rounded-md ${
                    textAlign === "left"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                 <LuAlignLeft />
                </button>
                <button
                  onClick={alignTextCenter}
                  className={`p-2 border rounded-md ${
                    textAlign === "center"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                 <MdOutlineFormatAlignCenter />
                </button>
                <button
                  onClick={alignTextRight}
                  className={`p-2 border rounded-md ${
                    textAlign === "right"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                <LuAlignRight/>
                </button>
                

              </div>
            </div>

            {/* Vertical Alignment Controls */}
            {/* <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Vertical Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={alignTextTop}
                  className={`p-2 border rounded-md ${
                    textVerticalAlign === "top" ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Top
                </button>
                <button
                  onClick={alignTextMiddle}
                  className={`p-2 border rounded-md ${
                    textVerticalAlign === "middle" ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Middle
                </button>
                <button
                  onClick={alignTextBottom}
                  className={`p-2 border rounded-md ${
                    textVerticalAlign === "bottom" ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Bottom
                </button>
              </div>
            </div> */}

            {/* Layer Controls */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="layer">
                  <button
                    onClick={bringToFront}
                    className="p-2 m-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    <Layers />
                  </button>
                  <button
                    onClick={sendToBack}
                    className="p-2 m-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    <Layers2 />
                  </button>
                  <label className="block text-sm text-center font-medium text-gray-700">
                    Layer
                  </label>
                </div>

                {/* <button
                  onClick={bringForward}
                  className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Bring Forward
                </button>
                <button
                  onClick={sendBackward}
                  className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Send Backward
                </button> */}

                <div className="flip">
                  <button
                    onClick={onFlipTextHorizontal}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                  >
                    <FlipHorizontal2 />
                  </button>
                  <button
                    onClick={onFlipTextVertical}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                  >
                    <FlipVertical2 />
                  </button>
                  <label className="block text-sm text-center font-medium text-gray-700">
                    Flip
                  </label>
                </div>
                <div className="duplicate">
                  <button
                    onClick={onDuplicateText}
                    className="bg-blue-200 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-300"
                  >
                    <Copy />
                  </button>
                  <label className="block text-sm text-center font-medium text-gray-700">
                    Duplicate
                  </label>
                </div>
                <div className="center">
                  <button
                    onClick={onCenterText}
                    className="bg-blue-200 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-300"
                  >
                    <AlignHorizontalSpaceAround />
                  </button>
                  <label className="block text-sm text-center font-medium text-gray-700">
                    center
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}

            <button
              onClick={onResetTextToDefault}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              Reset to Default
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtTextPanelOverlay;
