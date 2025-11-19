import { useState, useRef, useCallback } from "react";

export const useAddTextEditor = () => {
  // State declarations
  const [view, setView] = useState("front");
  const [showTextPanel, setShowTextPanel] = useState(false);
  const [uploadedTexts, setUploadedTexts] = useState({ front: [], back: [] });
  const [selectedTextForEditing, setSelectedTextForEditing] = useState(null);
  const [textMode, setTextMode] = useState(true);
  const [inputText, setInputText] = useState("");

  // Text editing state
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

  // Modal states
  const [showFontModal, setShowFontModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showOutlineModal, setShowOutlineModal] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [showAlignmentModal, setShowAlignmentModal] = useState(false);

  // Drag and resize states
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null);
  const [dragType, setDragType] = useState(null);

  // Refs
  const dragData = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const rotateData = useRef({ angle: 0 });
  const resizeData = useRef({ size: 100 });




  
  // Available options
  const availableFonts = [
    "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana", 
    "Courier New", "Impact", "Comic Sans MS", "Trebuchet MS", "Avenir",
    "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins",
  ];

  const availableColors = [
    "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
    "#FF00FF", "#00FFFF", "#FFFFFF", "#808080", "#FFA500",
  ];

  const availableOutlines = [
    "none", "black thin", "black medium", "black thick", 
    "white thin", "white medium", "white thick", 
    "gold thin", "old gold medium", "gold thick",
  ];

  const availableShapes = [
    "none", "normal", "curve", "arch", "bridge", 
    "valley", "pinch", "bulge", "perspective", 
    "pointed", "downward", "upward", "cone"
  ];

  const availableAlignments = [
    { value: "left", label: "Left Align" },
    { value: "center", label: "Center Align" },
    { value: "right", label: "Right Align" },
  ];

  const availableVerticalAlignments = [
    { value: "top", label: "Top" },
    { value: "middle", label: "Middle" },
    { value: "bottom", label: "Bottom" },
  ];

  // Get text path for shape transformation
  const getTextPath = useCallback((text, shapeType, width, height) => {
    if (shapeType === "none" || shapeType === "normal") return null;

    const w = width;
    const h = height;
    const padding = 5; // Padding to prevent text clipping
    
    const paths = {
      "curve": `M${padding},${h-padding} Q${w/2},${h/4} ${w-padding},${h-padding}`,
      "arch": `M${padding},${h-padding} Q${w/2},${-h/4} ${w-padding},${h-padding}`,
      "bridge": `M${padding},${h/2} Q${w/4},${h-padding} ${w/2},${h-padding} T${w-padding},${h/2}`,
      "valley": `M${padding},${h/2} Q${w/4},${padding} ${w/2},${padding} T${w-padding},${h/2}`,
      "pinch": `M${padding},${h/2} Q${w/2},${h-padding} ${w-padding},${h/2}`,
      "bulge": `M${padding},${h/2} Q${w/2},${padding} ${w-padding},${h/2}`,
      "pointed": `M${padding},${h-padding} L${w/2},${padding} L${w-padding},${h-padding}`,
      "downward": `M${padding},${padding} L${w-padding},${h-padding}`,
      "upward": `M${padding},${h-padding} L${w-padding},${padding}`,
      "cone": `M${padding},${h-padding} Q${w/2},${padding} ${w-padding},${h-padding}`,
    };

    return paths[shapeType] || null;
  }, []);

  // Handle duplicate text
  const handleDuplicateText = useCallback((textId) => {
    const currentUploadedTexts = uploadedTexts[view];
    const textToDuplicate = currentUploadedTexts.find((txt) => txt.id === textId);
    
    if (!textToDuplicate) return;

    const duplicatedText = {
      ...textToDuplicate,
      id: Date.now().toString(),
      x: Math.min(95, textToDuplicate.x + 5),
      y: Math.min(95, textToDuplicate.y + 5),
      zIndex: Date.now(),
    };

    setUploadedTexts((prev) => ({
      ...prev,
      [view]: [...prev[view], duplicatedText],
    }));

    setSelectedTextForEditing(duplicatedText);
  }, [view, uploadedTexts]);

  // Update text in real-time
  const updateTextInRealTime = useCallback(
    (updates) => {
      if (!selectedTextForEditing) return;

      const updatedText = {
        ...selectedTextForEditing,
        ...updates,
      };

      setSelectedTextForEditing(updatedText);

      setUploadedTexts((prev) => ({
        ...prev,
        [view]: prev[view].map((txt) =>
          txt.id === selectedTextForEditing.id ? updatedText : txt
        ),
      }));
    },
    [selectedTextForEditing, view]
  );

  // Handlers
  const handleAddText = useCallback(() => {
    if (!inputText.trim()) return;

    const newText = {
      id: Date.now().toString(),
      text: inputText,
      font: font,
      color: color,
      outline: outline,
      shape: shape,
      size: textSize,
      rotation: rotation,
      flipX: flipX,
      flipY: flipY,
      align: textAlign,
      verticalAlign: textVerticalAlign,
      x: 30,
      y: 40,
      width: 40,
      height: 15,
      zIndex: Date.now(),
    };

    setUploadedTexts((prev) => ({
      ...prev,
      [view]: [...prev[view], newText],
    }));

    setInputText("");
    setTextMode(false);
    setSelectedTextForEditing(newText);
  }, [
    inputText, font, color, outline, shape, textSize, rotation,
    flipX, flipY, textAlign, textVerticalAlign, view,
  ]);

  const handleTextClick = useCallback((text) => {
    setSelectedTextForEditing(text);
    setShowTextPanel(true);
    setTextMode(false);

    // Sync all properties with the selected text
    setFont(text.font || "Arial");
    setColor(text.color || "#000000");
    setOutline(text.outline || "none");
    setShape(text.shape || "none");
    setTextSize(text.size || 24);
    setRotation(text.rotation || 0);
    setFlipX(text.flipX || false);
    setFlipY(text.flipY || false);
    setTextAlign(text.align || "center");
    setTextVerticalAlign(text.verticalAlign || "middle");
  }, []);

  // Real-time update handlers
  const handleTextContentChange = useCallback(
    (newText) => updateTextInRealTime({ text: newText }),
    [updateTextInRealTime]
  );

  const handleFontChange = useCallback(
    (newFont) => {
      setFont(newFont);
      updateTextInRealTime({ font: newFont });
    },
    [updateTextInRealTime]
  );

  const handleColorChange = useCallback(
    (newColor) => {
      setColor(newColor);
      updateTextInRealTime({ color: newColor });
    },
    [updateTextInRealTime]
  );

  const handleOutlineChange = useCallback(
    (newOutline) => {
      setOutline(newOutline);
      updateTextInRealTime({ outline: newOutline });
    },
    [updateTextInRealTime]
  );

  const handleShapeChange = useCallback(
    (newShape) => {
      setShape(newShape);
      updateTextInRealTime({ shape: newShape });
    },
    [updateTextInRealTime]
  );

  const handleTextAlignChange = useCallback(
    (newAlign) => {
      setTextAlign(newAlign);
      updateTextInRealTime({ align: newAlign });
    },
    [updateTextInRealTime]
  );

  const handleVerticalAlignChange = useCallback(
    (newVerticalAlign) => {
      setTextVerticalAlign(newVerticalAlign);
      updateTextInRealTime({ verticalAlign: newVerticalAlign });
    },
    [updateTextInRealTime]
  );

  const handleTextSizeChange = useCallback(
    (newSize) => {
      setTextSize(newSize);
      updateTextInRealTime({ size: newSize });
    },
    [updateTextInRealTime]
  );

  const handleRotationChange = useCallback(
    (newRotation) => {
      setRotation(newRotation);
      updateTextInRealTime({ rotation: newRotation });
    },
    [updateTextInRealTime]
  );

  const handleFlipXChange = useCallback(
    (newFlipX) => {
      setFlipX(newFlipX);
      updateTextInRealTime({ flipX: newFlipX });
    },
    [updateTextInRealTime]
  );

  const handleFlipYChange = useCallback(
    (newFlipY) => {
      setFlipY(newFlipY);
      updateTextInRealTime({ flipY: newFlipY });
    },
    [updateTextInRealTime]
  );

  // Layer management functions
  const bringToFront = useCallback(() => {
    if (!selectedTextForEditing) return;
    const currentUploadedTexts = uploadedTexts[view];
    const maxZIndex = Math.max(...currentUploadedTexts.map(txt => txt.zIndex || 0));
    updateTextInRealTime({ zIndex: maxZIndex + 1 });
  }, [selectedTextForEditing, uploadedTexts, view, updateTextInRealTime]);

  const sendToBack = useCallback(() => {
    if (!selectedTextForEditing) return;
    const currentUploadedTexts = uploadedTexts[view];
    const minZIndex = Math.min(...currentUploadedTexts.map(txt => txt.zIndex || 0));
    updateTextInRealTime({ zIndex: minZIndex - 1 });
  }, [selectedTextForEditing, uploadedTexts, view, updateTextInRealTime]);

  const bringForward = useCallback(() => {
    if (!selectedTextForEditing) return;
    const currentZIndex = selectedTextForEditing.zIndex || 0;
    updateTextInRealTime({ zIndex: currentZIndex + 1 });
  }, [selectedTextForEditing, updateTextInRealTime]);

  const sendBackward = useCallback(() => {
    if (!selectedTextForEditing) return;
    const currentZIndex = selectedTextForEditing.zIndex || 0;
    updateTextInRealTime({ zIndex: currentZIndex - 1 });
  }, [selectedTextForEditing, updateTextInRealTime]);

  // Text alignment functions
  const alignTextLeft = useCallback(() => handleTextAlignChange("left"), [handleTextAlignChange]);
  const alignTextCenter = useCallback(() => handleTextAlignChange("center"), [handleTextAlignChange]);
  const alignTextRight = useCallback(() => handleTextAlignChange("right"), [handleTextAlignChange]);
  const alignTextTop = useCallback(() => handleVerticalAlignChange("top"), [handleVerticalAlignChange]);
  const alignTextMiddle = useCallback(() => handleVerticalAlignChange("middle"), [handleVerticalAlignChange]);
  const alignTextBottom = useCallback(() => handleVerticalAlignChange("bottom"), [handleVerticalAlignChange]);

  // Fixed center text function
  const centerText = useCallback(() => {
    if (!selectedTextForEditing) return;
    
    const centerX = 50 - (selectedTextForEditing.width / 2);
    const centerY = 50 - (selectedTextForEditing.height / 2);

    const boundedX = Math.max(0, Math.min(100 - selectedTextForEditing.width, centerX));
    const boundedY = Math.max(0, Math.min(100 - selectedTextForEditing.height, centerY));

    updateTextInRealTime({ 
      x: boundedX,
      y: boundedY
    });
  }, [selectedTextForEditing, updateTextInRealTime]);

  // Rest of your existing handlers (drag, resize, rotate, remove, etc.)
  const handleTextDrag = useCallback(
    (id, startX, startY, canvasRef) => {
      const currentUploadedTexts = uploadedTexts[view];
      const text = currentUploadedTexts.find((txt) => txt.id === id);
      if (!text) return;

      const canvasElement = canvasRef?.current;
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      const startXPixel = (text.x / 100) * canvasWidth;
      const startYPixel = (text.y / 100) * canvasHeight;

      dragData.current = { x: startXPixel, y: startYPixel, startX, startY };

      const move = (ev) => {
        const dx = ev.clientX - dragData.current.startX;
        const dy = ev.clientY - dragData.current.startY;

        const newXPixel = dragData.current.x + dx;
        const newYPixel = dragData.current.y + dy;

        const newXPercent = (newXPixel / canvasWidth) * 100;
        const newYPercent = (newYPixel / canvasHeight) * 100;

        const textWidthPercent = text.width;
        const textHeightPercent = text.height;

        const minX = 0;
        const minY = 0;
        const maxX = 100 - textWidthPercent;
        const maxY = 100 - textHeightPercent;

        const boundedX = Math.max(minX, Math.min(maxX, newXPercent));
        const boundedY = Math.max(minY, Math.min(maxY, newYPercent));

        updateTextInRealTime({ x: boundedX, y: boundedY });
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [view, uploadedTexts, updateTextInRealTime]
  );

  const handleTextResize = useCallback(
    (id, startX, startY, canvasRef) => {
      const currentUploadedTexts = uploadedTexts[view];
      const text = currentUploadedTexts.find((txt) => txt.id === id);
      if (!text) return;

      const canvasElement = canvasRef?.current;
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      const initialWidthPercent = text.width;
      const initialHeightPercent = text.height;
      const initialXPercent = text.x;
      const initialYPercent = text.y;

      resizeData.current = {
        width: initialWidthPercent,
        height: initialHeightPercent,
        x: initialXPercent,
        y: initialYPercent,
        startX, startY,
      };

      const move = (ev) => {
        const deltaX = ev.clientX - resizeData.current.startX;
        const deltaY = ev.clientY - resizeData.current.startY;

        const scaleFactor = 0.5;
        let newWidthPercent = resizeData.current.width + (deltaX / canvasWidth) * 100 * scaleFactor;
        let newHeightPercent = resizeData.current.height + (deltaY / canvasHeight) * 100 * scaleFactor;

        const minSize = 5;
        const maxSize = 95;

        newWidthPercent = Math.max(minSize, Math.min(maxSize, newWidthPercent));
        newHeightPercent = Math.max(minSize, Math.min(maxSize, newHeightPercent));

        const widthChange = newWidthPercent - resizeData.current.width;
        const heightChange = newHeightPercent - resizeData.current.height;

        const boundedX = Math.max(0, Math.min(100 - newWidthPercent, resizeData.current.x));
        const boundedY = Math.max(0, Math.min(100 - newHeightPercent, resizeData.current.y));

        updateTextInRealTime({
          width: newWidthPercent,
          height: newHeightPercent,
          x: boundedX,
          y: boundedY,
        });
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [view, uploadedTexts, updateTextInRealTime]
  );

  const handleTextRotate = useCallback(
    (id, startX, startY, canvasRef) => {
      const currentUploadedTexts = uploadedTexts[view];
      const text = currentUploadedTexts.find((txt) => txt.id === id);
      if (!text) return;

      const canvasElement = canvasRef?.current;
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();

      const centerXPixel = (text.x / 100) * rect.width + ((text.width / 100) * rect.width) / 2;
      const centerYPixel = (text.y / 100) * rect.height + ((text.height / 100) * rect.height) / 2;

      const startAngle = Math.atan2(startY - centerYPixel, startX - centerXPixel);
      rotateData.current.angle = text.rotation || 0;

      const move = (ev) => {
        const currentAngle = Math.atan2(ev.clientY - centerYPixel, ev.clientX - centerXPixel);
        const delta = currentAngle - startAngle;
        const newAngle = rotateData.current.angle + delta * (180 / Math.PI);

        updateTextInRealTime({ rotation: newAngle });
        setRotation(newAngle);
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [view, uploadedTexts, updateTextInRealTime]
  );

  const handleRemoveText = useCallback(
    (id) => {
      setUploadedTexts((prev) => ({
        ...prev,
        [view]: prev[view].filter((txt) => txt.id !== id),
      }));
      if (selectedTextForEditing?.id === id) {
        setSelectedTextForEditing(null);
      }
    },
    [view, selectedTextForEditing]
  );

  const handleDeselectText = useCallback(() => {
    setSelectedTextForEditing(null);
  }, []);

  const handleFontSelect = useCallback(
    (selectedFont) => {
      handleFontChange(selectedFont);
      setShowFontModal(false);
    },
    [handleFontChange]
  );

  const handleColorSelect = useCallback(
    (selectedColor) => {
      handleColorChange(selectedColor);
      setShowColorModal(false);
    },
    [handleColorChange]
  );

  const handleOutlineSelect = useCallback(
    (selectedOutline) => {
      handleOutlineChange(selectedOutline);
      setShowOutlineModal(false);
    },
    [handleOutlineChange]
  );

  const handleShapeSelect = useCallback(
    (selectedShape) => {
      handleShapeChange(selectedShape);
      setShowShapeModal(false);
    },
    [handleShapeChange]
  );

  const handleAlignmentSelect = useCallback(
    (selectedAlignment) => {
      handleTextAlignChange(selectedAlignment);
      setShowAlignmentModal(false);
    },
    [handleTextAlignChange]
  );

  const flipHorizontal = useCallback(() => {
    const newFlipX = !flipX;
    handleFlipXChange(newFlipX);
  }, [flipX, handleFlipXChange]);

  const flipVertical = useCallback(() => {
    const newFlipY = !flipY;
    handleFlipYChange(newFlipY);
  }, [flipY, handleFlipYChange]);

  const duplicateText = useCallback(() => {
    if (!selectedTextForEditing) return;
    handleDuplicateText(selectedTextForEditing.id);
  }, [selectedTextForEditing, handleDuplicateText]);

  const resetTextToDefault = useCallback(() => {
    if (selectedTextForEditing) {
      const defaultValues = {
        font: "Arial",
        color: "#000000",
        outline: "none",
        shape: "none",
        size: 24,
        rotation: 0,
        flipX: false,
        flipY: false,
        align: "center",
        verticalAlign: "middle",
      };

      setFont(defaultValues.font);
      setColor(defaultValues.color);
      setOutline(defaultValues.outline);
      setShape(defaultValues.shape);
      setTextSize(defaultValues.size);
      setRotation(defaultValues.rotation);
      setFlipX(defaultValues.flipX);
      setFlipY(defaultValues.flipY);
      setTextAlign(defaultValues.align);
      setTextVerticalAlign(defaultValues.verticalAlign);

      updateTextInRealTime(defaultValues);
    }
  }, [selectedTextForEditing, updateTextInRealTime]);

  const closeAllModals = useCallback(() => {
    setShowFontModal(false);
    setShowColorModal(false);
    setShowOutlineModal(false);
    setShowShapeModal(false);
    setShowAlignmentModal(false);
  }, []);

  return {
    // State
    view, showTextPanel, uploadedTexts, selectedTextForEditing, textMode, inputText,
    font, color, outline, shape, textSize, rotation, flipX, flipY,
    textAlign, textVerticalAlign, showFontModal, showColorModal, showOutlineModal,
    showShapeModal, showAlignmentModal, isDragging, activeHandle, dragType,
    availableFonts, availableColors, availableOutlines, availableShapes,
    availableAlignments, availableVerticalAlignments,

    // Setters
    setView, setShowTextPanel, setUploadedTexts, setSelectedTextForEditing, setTextMode, setInputText,
    setFont, setColor, setOutline, setShape, setTextSize, setRotation, setFlipX, setFlipY,
    setTextAlign, setTextVerticalAlign, setShowFontModal, setShowColorModal, setShowOutlineModal,
    setShowShapeModal, setShowAlignmentModal, setIsDragging, setActiveHandle, setDragType,

    // Handlers
    handleAddText, handleTextClick, handleTextDrag, handleTextResize, handleTextRotate,
    handleRemoveText, handleDeselectText, handleFontSelect, handleColorSelect,
    handleOutlineSelect, handleShapeSelect, handleAlignmentSelect, flipHorizontal,
    flipVertical, duplicateText, centerText, resetTextToDefault, closeAllModals,
    
    // Real-time handlers
    handleTextContentChange, handleFontChange, handleColorChange, handleOutlineChange,
    handleShapeChange, handleTextSizeChange, handleRotationChange, handleFlipXChange,
    handleFlipYChange, handleTextAlignChange, handleVerticalAlignChange,

    // Layer management
    bringToFront, sendToBack, bringForward, sendBackward,

    // Text alignment
    alignTextLeft, alignTextCenter, alignTextRight, alignTextTop, alignTextMiddle, alignTextBottom,

    // Shape function
    getTextPath,
    handleDuplicateText,
  };
};