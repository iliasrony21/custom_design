import { X, RotateCw, Maximize2 } from "lucide-react";

const UploadedImage = ({
  image,
  isSelected,
  onDrag,
  onResize,
  onRotate,
  onRemove,
  onClick,
  canvasRef,
}) => {
  const getImageStyle = (image) => {
    const baseSize = image.size || 30;
    return {
      width: `${baseSize}px`,
      height: `${baseSize}px`,
      transform: `
        translate(-50%, -50%)
        rotate(${image.rotation || 0}deg)
        scaleX(${image.flipX ? -1 : 1})
        scaleY(${image.flipY ? -1 : 1})
      `,
      transformOrigin: "center center",
    };
  };

  const getImageFilters = (image) => {
    const filters = [];

    // Apply basic color adjustments
    if (image.contrast !== undefined && image.contrast !== 100) {
      filters.push(`contrast(${image.contrast}%)`);
    }
    if (image.brightness !== undefined && image.brightness !== 100) {
      filters.push(`brightness(${image.brightness}%)`);
    }
    if (image.saturation !== undefined && image.saturation !== 100) {
      filters.push(`saturate(${image.saturation}%)`);
    }
    if (image.hue !== undefined && image.hue !== 0) {
      filters.push(`hue-rotate(${image.hue}deg)`);
    }

    // Apply special effects
    if (image.oneColor) {
      filters.push("saturate(500%)");
    }
    if (image.shades) {
      filters.push("grayscale(100%)");
    }
    if (image.invertColor) {
      filters.push("invert(100%)");
    }
    if (image.removeBg) {
      filters.push("brightness(1.1) saturate(1.1)");
    }

    return filters.join(" ");
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    onDrag(e, image.id, canvasRef);
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    onResize(e, image.id, canvasRef);
  };

  const handleRotateStart = (e) => {
    e.stopPropagation();
    onRotate(e, image.id);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(image.id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(image);
  };

  return (
    <div
      className="absolute cursor-move group"
      onMouseDown={handleDragStart}
      onClick={handleClick}
      style={{
        top: `${image.y}px`,
        left: `${image.x}px`,
        ...getImageStyle(image),
      }}
    >
      <img
        src={image.url}
        alt="Uploaded"
        className={`w-full h-full object-contain border-2 rounded shadow-lg transition-all ${
          isSelected ? "border-blue-500 border-2" : "border-transparent"
        } group-hover:border-gray-400`}
        style={{ 
          filter: getImageFilters(image),
        }}
        draggable="false"
      />

      {isSelected && (
        <>
          <ControlButton
            position="top-left"
            onClick={handleRemove}
            icon={X}
            className="text-red-600 bg-white"
          />

          <ControlButton
            position="bottom-left"
            onMouseDown={handleRotateStart}
            icon={RotateCw}
            className="text-blue-600 bg-white"
          />

          <ControlButton
            position="bottom-right"
            onMouseDown={handleResizeStart}
            icon={Maximize2}
            className="text-green-600 bg-white cursor-se-resize"
          />
        </>
      )}
    </div>
  );
};

const ControlButton = ({ position, onClick, onMouseDown, icon: Icon, className }) => {
  const positionClasses = {
    "top-left": "-top-2 -left-2",
    "bottom-left": "-bottom-2 -left-2",
    "bottom-right": "-bottom-2 -right-2",
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={`absolute ${positionClasses[position]} rounded-full p-1 shadow hover:scale-110 z-10 transition-transform ${className}`}
    >
      <Icon className="w-3 h-3" />
    </button>
  );
};

export default UploadedImage;