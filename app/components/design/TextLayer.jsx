import React from "react";

const TextLayer = ({ textData, getTextPath }) => {
  // 1. Calculate dimensions in pixels (assuming percentage stored in state)
  // You might need to pass parent dimensions if these are strictly %
  const pixelWidth = 300; // Example: Replace with actual container width * (textData.width / 100)
  const pixelHeight = 150; // Example: Replace with actual container height * (textData.height / 100)
  
  // 2. Generate the path string
  const pathData = getTextPath(
    textData.text,
    textData.shape,
    pixelWidth,
    pixelHeight
  );

  // 3. Unique ID for the path (crucial for SVG linking)
  const pathId = `text-path-${textData.id}`;

  return (
    <div
      style={{
        position: "absolute",
        left: `${textData.x}%`,
        top: `${textData.y}%`,
        width: `${textData.width}%`,
        height: `${textData.height}%`,
        transform: `rotate(${textData.rotation}deg) scaleX(${textData.flipX ? -1 : 1}) scaleY(${textData.flipY ? -1 : 1})`,
        zIndex: textData.zIndex,
        cursor: "move",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${pixelWidth} ${pixelHeight}`}
        style={{ overflow: "visible" }}
      >
        {/* If a shape is selected, define the path invisibly */}
        {textData.shape !== "none" && pathData && (
          <defs>
            <path id={pathId} d={pathData} />
          </defs>
        )}

        <text
          fill={textData.color}
          fontSize={textData.size}
          fontFamily={textData.font}
          fontWeight="bold"
          textAnchor="middle" // Centers text horizontally
          dominantBaseline="middle" // Centers text vertically
          stroke={textData.outline !== "none" ? textData.outline.split(" ")[0] : "none"}
          strokeWidth={textData.outline !== "none" ? 1 : 0}
        >
          {textData.shape !== "none" && pathData ? (
            /* RENDER CURVED TEXT */
            <textPath
              href={`#${pathId}`}
              startOffset="50%" // Puts text in the middle of the curve
              method="align"
              spacing="auto"
            >
              {textData.text}
            </textPath>
          ) : (
            /* RENDER NORMAL TEXT */
            <tspan
              x="50%"
              y="50%"
              alignmentBaseline="middle"
            >
              {textData.text}
            </tspan>
          )}
        </text>
        
        {/* Debugging: Uncomment this to see the path line */}
        {/* {pathData && <path d={pathData} stroke="red" fill="none" />} */}
      </svg>
    </div>
  );
};

export default TextLayer;