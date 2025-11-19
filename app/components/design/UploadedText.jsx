"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { RotateCcw, X } from "lucide-react";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoIosResize } from "react-icons/io";

const UploadedText = ({
  text,
  isSelected,
  onDrag,
  onResize,
  onRotate,
  onRemove,
  onClick,
  canvasRef,
  canvasSize,
  onDuplicate,
  getTextPath, // MAKE SURE THIS PROP IS HERE
}) => {
  const textRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Calculate pixel dimensions
  const pixelWidth = canvasSize?.width ? (canvasSize.width * text.width) / 100 : 100;
  const pixelHeight = canvasSize?.height ? (canvasSize.height * text.height) / 100 : 50;

  // Generate SVG Path for shapes
  const pathData = useMemo(() => {
    if (!text.shape || text.shape === "none" || text.shape === "normal") return null;
    return getTextPath(text.text, text.shape, pixelWidth, pixelHeight);
  }, [text.shape, text.text, pixelWidth, pixelHeight, getTextPath]);

  const uniquePathId = `text-path-${text.id}`;

  // Get text alignment properties
  const getTextAnchor = () => {
    switch (text.align) {
      case "left": return "start";
      case "right": return "end";
      case "center": 
      default: return "middle";
    }
  };

  const getDominantBaseline = () => {
    switch (text.verticalAlign) {
      case "top": return "hanging";
      case "bottom": return "baseline";
      case "middle":
      default: return "middle";
    }
  };

  const getTextPosition = () => {
    if (pathData) return { x: "50%", y: "50%" };
    
    switch (text.align) {
      case "left": return { x: "0%", y: "50%" };
      case "right": return { x: "100%", y: "50%" };
      case "center":
      default: return { x: "50%", y: "50%" };
    }
  };

  // Event Handlers
  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(text);

    const startX = e.clientX;
    const startY = e.clientY;

    if (e.target.closest('.resize-handle')) {
      setIsResizing(true);
      onResize(text.id, startX, startY, canvasRef);
    } else if (e.target.closest('.rotate-handle')) {
      setIsRotating(true);
      onRotate(text.id, startX, startY, canvasRef);
    } else if (e.target.closest('.duplicate-handle') || e.target.closest('.remove-handle')) {
      // handled by click
    } else {
      setIsDragging(true);
      onDrag(text.id, startX, startY, canvasRef);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
  };

  useEffect(() => {
    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, isRotating]);

  // Get stroke properties
  const getStrokeWidth = (outline) => {
    if (!outline || outline === 'none') return 0;
    if (outline.includes('thick')) return 3;
    if (outline.includes('medium')) return 2;
    return 1;
  };

  const getStrokeColor = (outline) => {
    if (!outline || outline === 'none') return 'none';
    return outline.split(' ')[0];
  };

  const containerStyle = {
    left: `${text.x}%`,
    top: `${text.y}%`,
    width: `${text.width}%`,
    height: `${text.height}%`,
    position: 'absolute',
    zIndex: isSelected ? 50 : text.zIndex || 10,
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    transform: `rotate(${text.rotation}deg) scaleX(${text.flipX ? -1 : 1}) scaleY(${text.flipY ? -1 : 1})`,
    transformOrigin: 'center center',
  };

  const textPosition = getTextPosition();

  return (
    <div
      ref={textRef}
      className={`group ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
      style={containerStyle}
      onMouseDown={handleMouseDown}
    >
      {/* SVG Layer */}
      <div className="w-full h-full relative overflow-visible">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${pixelWidth} ${pixelHeight}`}
          style={{ overflow: "visible" }}
        >
          {pathData && (
            <defs>
              <path id={uniquePathId} d={pathData} />
            </defs>
          )}

          <text
            fill={text.color}
            fontFamily={text.font}
            fontSize={text.size}
            fontWeight="normal"
            textAnchor={getTextAnchor()}
            dominantBaseline={getDominantBaseline()}
            stroke={getStrokeColor(text.outline)}
            strokeWidth={getStrokeWidth(text.outline)}
            style={{ pointerEvents: 'none' }}
          >
            {pathData ? (
              <textPath
                href={`#${uniquePathId}`}
                startOffset="50%"
                method="align"
                spacing="auto"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {text.text}
              </textPath>
            ) : (
              <tspan 
                x={textPosition.x} 
                y={textPosition.y}
                alignmentBaseline="middle"
              >
                {text.text}
              </tspan>
            )}
          </text>
          
          {/* Debug Path Line */}
          {/* {pathData && <path d={pathData} stroke="rgba(255,0,0,0.3)" fill="none" strokeWidth="1" />} */}
        </svg>
      </div>

      {/* Controls Layer */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ transform: `scaleX(${text.flipX ? -1 : 1}) scaleY(${text.flipY ? -1 : 1})` }}>
        {isSelected && (
          <>
            {/* Remove */}
            <button
              className="remove-handle absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:bg-red-600 pointer-events-auto"
              onClick={(e) => { e.stopPropagation(); onRemove(text.id); }}
            >
              <X className="w-3 h-3" />
            </button>

            {/* Resize */}
            <div className="resize-handle absolute -bottom-2 -right-2 w-5 h-5 bg-blue-500 border-2 border-white rounded-full cursor-se-resize shadow-md flex items-center justify-center pointer-events-auto">
              <IoIosResize className="w-3 h-3 text-white" />
            </div>

            {/* Rotate */}
            <div className="rotate-handle absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-white text-gray-700 border border-gray-300 rounded-full cursor-grab flex items-center justify-center shadow-md hover:bg-gray-50 pointer-events-auto">
              <RotateCcw className="w-3 h-3 text-blue-500" />
            </div>

            {/* Duplicate */}
            <button
              className="duplicate-handle absolute -top-3 -left-3 w-6 h-6 bg-green-500 text-white rounded-full shadow-md border-2 border-white flex items-center justify-center hover:bg-green-600 pointer-events-auto"
              onClick={(e) => { e.stopPropagation(); onDuplicate && onDuplicate(text.id); }}
            >
              <HiOutlineDuplicate className="w-3 h-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadedText;