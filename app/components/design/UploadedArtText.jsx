// app/components/design/UploadedArtText.jsx
"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { RotateCcw, X } from "lucide-react";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoIosResize } from "react-icons/io";

const UploadedArtText = ({
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
  getTextPath,
}) => {
  const textRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const pixelWidth = canvasSize?.width
    ? (canvasSize.width * text.width) / 100
    : 100;
  const pixelHeight = canvasSize?.height
    ? (canvasSize.height * text.height) / 100
    : 50;

  const pathData = useMemo(
    () =>
      text.shape && text.shape !== "none"
        ? getTextPath(text.text, text.shape, pixelWidth, pixelHeight)
        : null,
    [text.shape, text.text, pixelWidth, pixelHeight, getTextPath]
  );

  const uniquePathId = `text-path-${text.id}`;

  const getTextAnchor = () =>
    text.align === "left" ? "start" : text.align === "right" ? "end" : "middle";

  const getDominantBaseline = () =>
    text.verticalAlign === "top"
      ? "hanging"
      : text.verticalAlign === "bottom"
      ? "baseline"
      : "middle";

  const getStrokeWidth = (outline) =>
    !outline || outline === "none"
      ? 0
      : outline.includes("thick")
      ? 3
      : outline.includes("medium")
      ? 2
      : 1;

  const getStrokeColor = (outline) =>
    !outline || outline === "none" ? "none" : outline.split(" ")[0];

  const getTextPosition = () =>
    pathData
      ? { x: "50%", y: "50%" }
      : text.align === "left"
      ? { x: "0%", y: "50%" }
      : text.align === "right"
      ? { x: "100%", y: "50%" }
      : { x: "50%", y: "50%" };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(text);

    const startX = e.clientX;
    const startY = e.clientY;

    if (e.target.closest(".resize-handle")) {
      setIsDragging(true);
      onResize && onResize(text.id, startX, startY, canvasRef);
    } else if (e.target.closest(".rotate-handle")) {
      setIsDragging(true);
      onRotate && onRotate(text.id, startX, startY, canvasRef);
    } else {
      setIsDragging(true);
      onDrag && onDrag(text.id, startX, startY, canvasRef);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [isDragging]);

//   return (
//     <div
//       ref={textRef}
//       onMouseDown={handleMouseDown}
//       className={isSelected ? "ring-2 ring-blue-500 ring-inset" : ""}
//       style={{
//         left: `${text.x}%`,
//         top: `${text.y}%`,
//         width: `${text.width}%`,
//         height: `${text.height}%`,
//         position: "absolute", // 🔥 IMPORTANT
//         zIndex: isSelected ? 50 : text.zIndex || 10,
//         cursor: isDragging ? "grabbing" : "grab",
//         transform: `rotate(${text.rotation}deg) scaleX(${
//           text.flipX ? -1 : 1
//         }) scaleY(${text.flipY ? -1 : 1})`,
//         transformOrigin: "center center",
//         pointerEvents: "auto",
//       }}
//     >
//       <svg
//         width="100%"
//         height="100%"
//         viewBox={`0 0 ${pixelWidth} ${pixelHeight}`}
//         style={{ overflow: "visible" }}
//       >
//         {pathData && (
//           <defs>
//             <path id={uniquePathId} d={pathData} />
//           </defs>
//         )}
//         <img
//           fill={text.color}
//           fontFamily={text.font}
//           fontSize={text.size}
//           fontWeight="normal"
//           textAnchor={getTextAnchor()}
//           dominantBaseline={getDominantBaseline()}
//           stroke={getStrokeColor(text.outline)}
//           strokeWidth={getStrokeWidth(text.outline)}
//           style={{ pointerEvents: "none" }}
//         >
//           {pathData ? (
//             <textPath
//               href={`#${uniquePathId}`}
//               startOffset="50%"
//               method="align"
//               spacing="auto"
//             >
//               {text.text}
//             </textPath>
//           ) : (
//             <tspan
//               x={getTextPosition().x}
//               y={getTextPosition().y}
//               alignmentBaseline="middle"
//             >
//               {text.text}
//             </tspan>
//           )}
//         </img>
//       </svg>

//       {isSelected && (
//         <>
//           {/* Remove */}
//           <button
//             className="absolute -right-2 -top-2 remove-handle bg-red-500 text-white rounded-full p-1"
//             onClick={(e) => {
//               e.stopPropagation();
//               onRemove && onRemove(text.id);
//             }}
//           >
//             <X className="w-3 h-3" />
//           </button>

//           {/* Resize */}
//           <div className="absolute -right-1 -bottom-1 resize-handle">
//             <IoIosResize className="w-3 h-3 text-white bg-blue-500 rounded-full p-1" />
//           </div>

//           {/* Rotate */}
//           <div className="absolute -left-2 -top-2 rotate-handle">
//             <RotateCcw className="w-5 h-5 text-blue-500 bg-white rounded-full p-1" />
//           </div>

//           {/* Duplicate */}
//           <button
//             className="absolute -left-2 -bottom-2 duplicate-handle"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDuplicate && onDuplicate(text.id);
//             }}
//           >
//             <HiOutlineDuplicate className="w-5 h-5 bg-green-500 rounded-full text-white p-1" />
//           </button>
//         </>
//       )}
//     </div>
//   );

return (
  <div
    ref={textRef}
    onMouseDown={handleMouseDown}
    className={isSelected ? "ring-2 ring-blue-500 ring-inset" : ""}
    style={{
      position: "absolute",
      left: `${text.x}%`,
      top: `${text.y}%`,
      width: `${text.width}%`,
      height: `${text.height}%`,
      transform: `rotate(${text.rotation}deg) scaleX(${text.flipX ? -1 : 1}) scaleY(${text.flipY ? -1 : 1})`,
      transformOrigin: "center center",
      pointerEvents: "auto",
      zIndex: isSelected ? 50 : text.zIndex || 10,
      cursor: isDragging ? "grabbing" : "grab",
    }}
  >
    {/* 🔥 CASE 1: IMAGE ART */}
    {text.type === "image" && (
      <img
        src={text.src}
        alt="art"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    )}

    {/* 🔥 CASE 2: TEXT ART */}
    {text.type !== "image" && (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${pixelWidth} ${pixelHeight}`}
        style={{ overflow: "visible" }}
      >
        {/* curve support */}
        {pathData && (
          <defs>
            <path id={uniquePathId} d={pathData} />
          </defs>
        )}

        <text
          fill={text.color}
          fontFamily={text.font}
          fontSize={text.size}
          stroke={getStrokeColor(text.outline)}
          strokeWidth={getStrokeWidth(text.outline)}
          textAnchor={getTextAnchor()}
          dominantBaseline={getDominantBaseline()}
          style={{ pointerEvents: "none" }}
        >
          {pathData ? (
            <textPath href={`#${uniquePathId}`} startOffset="50%">
              {text.text}
            </textPath>
          ) : (
            <tspan
              x={getTextPosition().x}
              y={getTextPosition().y}
              alignmentBaseline="middle"
            >
              {text.text}
            </tspan>
          )}
        </text>
      </svg>
    )}

    {/* SELECTION HANDLES */}
    {isSelected && (
      <>
        <button
          className="absolute -right-2 -top-4 remove-handle bg-red-500 text-white rounded-full p-1"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(text.id);
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute -right-3 -bottom-3 resize-handle">
          <IoIosResize className="w-6 h-6 text-white bg-blue-500 rounded-full p-1" />
        </div>

        <div className="absolute -left-2 -top-3 rotate-handle">
          <RotateCcw className="w-6 h-6 text-blue-500 bg-white rounded-full p-1" />
        </div>

        <button
          className="absolute -left-3 -bottom-3 duplicate-handle"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(text.id);
          }}
        >
          <HiOutlineDuplicate className="w-6 h-6 bg-green-500 rounded-full text-white p-1" />
        </button>
      </>
    )}
  </div>
);
};




export default UploadedArtText;
