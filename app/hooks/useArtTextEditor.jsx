"use client";

import { useState, useRef, useCallback } from "react";

export const useArtTextEditor = () => {
  const [view, setView] = useState("front");
  const [showArtTextPanel, setShowArtTextPanel] = useState(false);
  const [uploadedArtTexts, setUploadedArtTexts] = useState({ front: [], back: [] });
  const [selectedArtTextForEditing, setSelectedArtTextForEditing] = useState(null);
  const [artTextMode, setTextMode] = useState(true);
  const [inputArtText, setInputText] = useState("");

  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#000000");
  const [outline, setOutline] = useState("none");
  const [shape, setShape] = useState("none");
  const [textSize, setTextSize] = useState(24);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [textAlign, setTextAlign] = useState("center");
  const [textVerticalAlign, setTextVerticalAlign] = useState("middle");

  const dragData = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const updateArtTextInRealTime = useCallback(
    (updates) => {
      if (!selectedArtTextForEditing) return;
      const updated = { ...selectedArtTextForEditing, ...updates };
      setSelectedArtTextForEditing(updated);
      setUploadedArtTexts((prev) => ({
        ...prev,
        [view]: prev[view].map((txt) =>
          txt.id === selectedArtTextForEditing.id ? updated : txt
        ),
      }));
    },
    [selectedArtTextForEditing, view]
  );

  const handleAddText = useCallback(() => {
    if (!inputArtText.trim()) return;
    const newText = {
      id: Date.now().toString(),
      text: inputArtText,
      font,
      color,
      outline,
      shape,
      size: textSize,
      rotation,
      flipX,
      flipY,
      align: textAlign,
      verticalAlign: textVerticalAlign,
      x: 30,
      y: 40,
      width: 40,
      height: 15,
      zIndex: Date.now(),
    };
    setUploadedArtTexts((prev) => ({ ...prev, [view]: [...prev[view], newText] }));
    setSelectedArtTextForEditing(newText);
    setInputText("");
    setTextMode(false);
    setShowArtTextPanel(true);
  }, [
    inputArtText, font, color, outline, shape,
    textSize, rotation, flipX, flipY, textAlign, textVerticalAlign, view
  ]);

  const handleTextClick = useCallback((txt) => {
    setSelectedArtTextForEditing(txt);
    setShowArtTextPanel(true);
    setFont(txt.font);
    setColor(txt.color);
    setOutline(txt.outline);
    setShape(txt.shape);
    setTextSize(txt.size);
    setRotation(txt.rotation);
    setFlipX(txt.flipX);
    setFlipY(txt.flipY);
    setTextAlign(txt.align);
    setTextVerticalAlign(txt.verticalAlign);
  }, []);

  const handleDuplicateArtText = useCallback((id) => {
    const original = uploadedArtTexts[view].find(t => t.id === id);
    if (!original) return;
    const duplicated = { ...original, id: Date.now().toString(), x: original.x + 5, y: original.y + 5, zIndex: Date.now() };
    setUploadedArtTexts((prev) => ({ ...prev, [view]: [...prev[view], duplicated] }));
    setSelectedArtTextForEditing(duplicated);
    setShowArtTextPanel(true);
  }, [uploadedArtTexts, view]);

  const handleRemoveArtText = useCallback((id) => {
    setUploadedArtTexts((prev) => ({ ...prev, [view]: prev[view].filter(t => t.id !== id) }));
    if (selectedArtTextForEditing?.id === id) {
      setSelectedArtTextForEditing(null);
      setShowArtTextPanel(false);
    }
  }, [view, selectedArtTextForEditing]);

  const handleArtTextDrag = useCallback((id, startX, startY, canvasRef) => {
    const item = uploadedArtTexts[view].find(t => t.id === id);
    if (!item || !canvasRef?.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const cw = rect.width, ch = rect.height;

    dragData.current = { startX, startY, initX: (item.x/100)*cw, initY: (item.y/100)*ch };

    const move = (ev) => {
      const dx = ev.clientX - dragData.current.startX;
      const dy = ev.clientY - dragData.current.startY;
      const newX = ((dragData.current.initX + dx)/cw)*100;
      const newY = ((dragData.current.initY + dy)/ch)*100;
      updateArtTextInRealTime({ x: Math.max(0, Math.min(100 - item.width, newX)), y: Math.max(0, Math.min(100 - item.height, newY)) });
    };
    const stop = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", stop); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", stop);
  }, [uploadedArtTexts, view, updateArtTextInRealTime]);

//   const handleAddEmoji = useCallback((emoji) => {
//    const newEmoji = {
//     id: Date.now().toString(),
//     type: "emoji",
//     text: emoji,
//     font: "Arial",
//     size: 48,
//     x: 30,
//     y: 30,
//     width: 20,
//     height: 20,
//     zIndex: Date.now(),
//     rotation: 0,
//     flipX: false,
//     flipY: false,
//   };

//   setUploadedArtTexts((prev) => ({
//     ...prev,
//     [view]: [...prev[view], newEmoji]
//   }));

//   setSelectedArtTextForEditing(newEmoji);
// }, [view]);

const handleAddEmoji = (emoji) => {
  const newEmoji = {
    id: Date.now().toString(),
    text: emoji,
    font: "Arial",
    size: 48,
    x: 30,
    y: 30,
    width: 20,
    height: 20,
    zIndex: Date.now(),
    rotation: 0,
    flipX: false,
    flipY: false,
  };

  setUploadedArtTexts((prev) => ({
    ...prev,
    [view]: [...prev[view], newEmoji]
  }));

  setSelectedArtTextForEditing(newEmoji);
};



  return {
    view, showArtTextPanel, uploadedArtTexts, selectedArtTextForEditing, artTextMode, inputArtText,
    font, color, outline, shape, textSize, rotation, flipX, flipY, textAlign, textVerticalAlign,
    setView, setShowArtTextPanel, setUploadedArtTexts, setSelectedArtTextForEditing, setTextMode, setInputText,
    setFont, setColor, setOutline, setShape, setTextSize, setRotation, setFlipX, setFlipY, setTextAlign, setTextVerticalAlign,
    handleAddText, handleTextClick, handleDuplicateArtText, handleRemoveArtText, handleArtTextDrag, updateArtTextInRealTime,handleAddEmoji,
  };
};
