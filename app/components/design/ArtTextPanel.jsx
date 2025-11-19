"use client";

import React from "react";

const ArtTextPanel = ({
  showArtTextPanel,
  onClose,
  artText,
  inputArtText,
  setArtInputText,
  handleAddArtText,
  font,
  setArtFont,
  color,
  setArtColor,
  outline,
  setArtOutline,
  shape,
  setArtShape,
  textSize,
  setArtTextSize,
  showFontModal,
  setShowFontModal,
  showColorModal,
  setShowColorModal,
  showOutlineModal,
  setShowOutlineModal,
  showShapeModal,
  setShowShapeModal,
  availableFonts,
  availableColors,
  availableOutlines,
  availableShapes,
}) => {
  if (!showArtTextPanel) return null;

  return (
    <div className="absolute left-0 right-0 top-0 w-full h-full bg-white shadow-xl z-50 flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Art Text Editor</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Text</label>
        <input
          type="text"
          value={inputArtText}
          onChange={(e) => setArtInputText(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Font */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Font</label>
        <select
          value={font}
          onChange={(e) => setArtFont(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {availableFonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Color</label>
        <select
          value={color}
          onChange={(e) => setArtColor(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {availableColors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Outline */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Outline</label>
        <select
          value={outline}
          onChange={(e) => setArtOutline(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {availableOutlines.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Shape */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shape</label>
        <select
          value={shape}
          onChange={(e) => setArtShape(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {availableShapes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Size</label>
        <input
          type="number"
          value={textSize}
          onChange={(e) => setArtTextSize(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddArtText}
        className="mt-auto w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Art Text
      </button>
      <button
  onClick={() => {
    setShowArtCategories(true);  // open emoji category modal
  }}
  className="mt-4 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
>
  Art Library
</button>
    </div>
  );
};

export default ArtTextPanel;
