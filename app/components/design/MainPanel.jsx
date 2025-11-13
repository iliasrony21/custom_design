import { ImageUp, Type, BookImage, ShoppingBagIcon } from "lucide-react";
import UploadPanelOverlay from "./UploadPanelOverlay";

const MainPanel = ({ 
  showUploadPanel, 
  uploadMode, 
  selectedImageForEditing,
  width,
  height,
  contrast,
  oneColor,
  invertColor,
  shades,
  removeBg,
  rotation,
  flipX,
  flipY,
  cropMode,
  cropHandles,
  cropArea,
  canvasRef,
  cropContainerRef,
  isDragging,
  activeHandle,
  onUploadButtonClick,
  onShowUploadPanelChange,
  onUpload,
  onUpdateImageProperty,
  onCropHandleMouseDown,
  onCrop,
  onCancelCrop,
  onApplyCrop,
  onCropHandlesChange,
  onCenterImage,
  onMoveLayer,
  onFlipHorizontal,
  onFlipVertical,
  onDuplicateImage,
  onResetToOriginal,
  onApplyEdits,
  setWidth,
  setHeight,
  setContrast,
  setOneColor,
  setInvertColor,
  setShades,
  setRemoveBg,
  setRotation,
  setFlipX,
  setFlipY
}) => {
  return (
    <aside className="w-.5/3 2xl:w-[400px] bg-white shadow-md z-20 relative">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-8">What's next for you?</h2>

        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={onUploadButtonClick}
            className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer"
          >
            <ImageUp className="text-4xl mb-2" />
            <span className="font-medium">Uploads</span>
          </div>

          <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
            <Type className="w-8 h-8 mb-2" />
            <span className="font-medium">Add Text</span>
          </div>

          <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
            <BookImage className="text-4xl mb-2" />
            <span className="font-medium">Add Art</span>
          </div>

          <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
            <ShoppingBagIcon className="text-4xl mb-2" />
            <span className="font-medium text-center">Change Products</span>
          </div>
        </div>

        <p className="text-gray-600 text-center mt-8">
          💡 Drag & drop a file anywhere to upload.
        </p>
      </div>

      {/* Upload modal overlay */}
      {showUploadPanel && (
        <UploadPanelOverlay
          uploadMode={uploadMode}
          selectedImageForEditing={selectedImageForEditing}
          width={width}
          height={height}
          contrast={contrast}
          oneColor={oneColor}
          invertColor={invertColor}
          shades={shades}
          removeBg={removeBg}
          rotation={rotation}
          cropMode={cropMode}
          cropHandles={cropHandles}
          cropArea={cropArea}
          canvasRef={canvasRef}
          cropContainerRef={cropContainerRef}
          isDragging={isDragging}
          activeHandle={activeHandle}
          onClose={() => onShowUploadPanelChange(false)}
          onUpload={onUpload}
          onUpdateImageProperty={onUpdateImageProperty}
          onCropHandleMouseDown={onCropHandleMouseDown}
          onCrop={onCrop}
          onCancelCrop={onCancelCrop}
          onApplyCrop={onApplyCrop}
          onCropHandlesChange={onCropHandlesChange}
          onCenterImage={onCenterImage}
          onMoveLayer={onMoveLayer}
          onFlipHorizontal={onFlipHorizontal}
          onFlipVertical={onFlipVertical}
          onDuplicateImage={onDuplicateImage}
          onResetToOriginal={onResetToOriginal}
          onApplyEdits={onApplyEdits}
          setWidth={setWidth}
          setHeight={setHeight}
          setContrast={setContrast}
          setOneColor={setOneColor}
          setInvertColor={setInvertColor}
          setShades={setShades}
          setRemoveBg={setRemoveBg}
          setRotation={setRotation}
        />
      )}
    </aside>
  );
};

export default MainPanel;