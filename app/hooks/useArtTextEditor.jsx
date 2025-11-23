"use client";

import { useState, useRef, useCallback } from "react";

export const useArtTextEditor = () => {
  const [view, setView] = useState("front");
  const [showArtTextPanel, setShowArtTextPanel] = useState(false);
  const [uploadedArtTexts, setUploadedArtTexts] = useState({
    front: [],
    back: [],
  });
  const [selectedArtTextForEditing, setSelectedArtTextForEditing] =
    useState(null);
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

    // Always create a new object to trigger React re-render
    const updated = { ...selectedArtTextForEditing, ...updates };

    // Update the selected art text for immediate reflection in UI
    setSelectedArtTextForEditing(updated);

    // Update the array of uploaded art texts immediately
    setUploadedArtTexts((prev) => {
      const updatedTexts = prev[view].map((txt) =>
        txt.id === selectedArtTextForEditing.id ? updated : txt
      );
      return {
        ...prev,
        [view]: updatedTexts, // Ensure it triggers re-render
      };
    });
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
  setUploadedArtTexts((prev) => {
    const newUploadedArtTexts = [...prev[view], newText];
    return {
      ...prev,
      [view]: newUploadedArtTexts,
    };
  });

  setSelectedArtTextForEditing(newText);
  setInputText("");
  setTextMode(false);
  setShowArtTextPanel(true);
}, [
  inputArtText,
  font,
  color,
  outline,
  shape,
  textSize,
  rotation,
  flipX,
  flipY,
  textAlign,
  textVerticalAlign,
  view,
]);


//   const handleTextClick = useCallback((txt) => {
//     setSelectedArtTextForEditing(txt);
//     setShowArtTextPanel(true);
//     setFont(txt.font);
//     setColor(txt.color);
//     setOutline(txt.outline);
//     setShape(txt.shape);
//     setTextSize(txt.size);
//     setRotation(txt.rotation);
//     setFlipX(txt.flipX);
//     setFlipY(txt.flipY);
//     setTextAlign(txt.align);
//     setTextVerticalAlign(txt.verticalAlign);
//   }, []);

  const handleTextClick = useCallback((txt) => {
  setSelectedArtTextForEditing(txt);
  setShowArtTextPanel(true);
  // Sync all properties with the selected text
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


const handleDuplicateArtText = useCallback(
    (id) => {
      const original = uploadedArtTexts[view].find((t) => t.id === id);
      if (!original) return;
      const duplicated = {
        ...original,
        id: Date.now().toString(),
        x: original.x + 5,
        y: original.y + 5,
        zIndex: Date.now(),
      };
      setUploadedArtTexts((prev) => ({
        ...prev,
        [view]: [...prev[view], duplicated],
      }));
      setSelectedArtTextForEditing(duplicated);
      setShowArtTextPanel(true);
    },
    [uploadedArtTexts, view]
  );

  const handleRemoveArtText = useCallback(
    (id) => {
      setUploadedArtTexts((prev) => ({
        ...prev,
        [view]: prev[view].filter((t) => t.id !== id),
      }));
      if (selectedArtTextForEditing?.id === id) {
        setSelectedArtTextForEditing(null);
        setShowArtTextPanel(false);
      }
    },
    [view, selectedArtTextForEditing]
  );

const handleArtTextDrag = useCallback((id, startX, startY, canvasRef) => {
  const item = uploadedArtTexts[view].find((t) => t.id === id);
  if (!item || !canvasRef?.current) return;

  const rect = canvasRef.current.getBoundingClientRect();
  const cw = rect.width;
  const ch = rect.height;

  dragData.current = {
    startX,
    startY,
    initX: (item.x / 100) * cw,
    initY: (item.y / 100) * ch,
  };

  const move = (ev) => {
    const dx = ev.clientX - dragData.current.startX;
    const dy = ev.clientY - dragData.current.startY;
    const newX = ((dragData.current.initX + dx) / cw) * 100;
    const newY = ((dragData.current.initY + dy) / ch) * 100;

    // Immediately update the position of the art text
    updateArtTextInRealTime({
      x: Math.max(0, Math.min(100 - item.width, newX)),
      y: Math.max(0, Math.min(100 - item.height, newY)),
    });
  };

  const stop = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
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

const handleAddEmoji = (emojiSrc) => {
  const newArt = {
    id: Date.now().toString(),
    type: "image",  // Important to mark it as an image type
    src: emojiSrc,  // Store the emoji source
    x: 30,
    y: 30,
    width: 20,
    height: 20,
    rotation: 0,
    flipX: false,
    flipY: false,
    zIndex: Date.now(),
  };

  // Ensure to update uploadedArtTexts with the new art and trigger state updates
  setUploadedArtTexts((prev) => ({
    ...prev,
    [view]: [...prev[view], newArt],
  }));

  // Set the newly added art text as the selected item for editing
  setSelectedArtTextForEditing(newArt);
  setShowArtTextPanel(true); // Show the editing panel for this emoji
};


const handleArtTextResize = useCallback(
  (id, startX, startY, canvasRef) => {
    const item = uploadedArtTexts[view].find((t) => t.id === id);
    if (!item || !canvasRef?.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;

    const initWidth = item.width;
    const initHeight = item.height;

    const move = (ev) => {
      const dx = ((ev.clientX - startX) / cw) * 100;
      const dy = ((ev.clientY - startY) / ch) * 100;

      const newWidth = Math.max(5, initWidth + dx);
      const newHeight = Math.max(5, initHeight + dy);

      // Update size in real-time
      updateArtTextInRealTime({
        width: Math.min(100, newWidth),
        height: Math.min(100, newHeight),
      });
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  },
  [uploadedArtTexts, view, updateArtTextInRealTime]
);


  const handleArtTextRotate = useCallback(
    (id, startX, startY, canvasRef) => {
      const item = uploadedArtTexts[view].find((t) => t.id === id);
      if (!item || !canvasRef?.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const centerX =
        rect.left + ((item.x + item.width / 2) / 100) * rect.width;
      const centerY =
        rect.top + ((item.y + item.height / 2) / 100) * rect.height;

      const startAngle =
        (Math.atan2(startY - centerY, startX - centerX) * 180) / Math.PI;

      const initialRotation = item.rotation || 0;

      const move = (ev) => {
        const currentAngle =
          (Math.atan2(ev.clientY - centerY, ev.clientX - centerX) * 180) /
          Math.PI;
        const delta = currentAngle - startAngle;
        updateArtTextInRealTime({ rotation: initialRotation + delta });
      };

      const stop = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", stop);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", stop);
    },
    [uploadedArtTexts, view, updateArtTextInRealTime]
  );

  //   return {
  //     view, showArtTextPanel, uploadedArtTexts, selectedArtTextForEditing, artTextMode, inputArtText,
  //     font, color, outline, shape, textSize, rotation, flipX, flipY, textAlign, textVerticalAlign,
  //     setView, setShowArtTextPanel, setUploadedArtTexts, setSelectedArtTextForEditing, setTextMode, setInputText,
  //     setFont, setColor, setOutline, setShape, setTextSize, setRotation, setFlipX, setFlipY, setTextAlign, setTextVerticalAlign,
  //     handleAddText, handleTextClick, handleDuplicateArtText, handleRemoveArtText, handleArtTextDrag, updateArtTextInRealTime,handleAddEmoji,
  //   };
  return {
    view,
    showArtTextPanel,
    uploadedArtTexts,
    selectedArtTextForEditing,
    artTextMode,
    inputArtText,
    font,
    color,
    outline,
    shape,
    textSize,
    rotation,
    flipX,
    flipY,
    textAlign,
    textVerticalAlign,
    setView,
    setShowArtTextPanel,
    setUploadedArtTexts,
    setSelectedArtTextForEditing,
    setTextMode,
    setInputText,
    setFont,
    setColor,
    setOutline,
    setShape,
    setTextSize,
    setRotation,
    setFlipX,
    setFlipY,
    setTextAlign,
    setTextVerticalAlign,
    handleAddText,
    handleTextClick,
    handleDuplicateArtText,
    handleRemoveArtText,
    handleArtTextDrag,
    handleArtTextResize, // ✅ NEW
    handleArtTextRotate, // ✅ NEW
    updateArtTextInRealTime,
    handleAddEmoji,
   
  };
};
