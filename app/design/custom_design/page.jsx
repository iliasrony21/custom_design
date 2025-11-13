"use client";
import { useRef } from "react";
import Sidebar from "@/app/components/design/Sidebar";
import MainPanel from "@/app/components/design/MainPanel";
import DesignCanvas from "@/app/components/design/DesignCanvas";
import { useImageEditor } from "@/app/hooks/useImageEditor";

export default function CustomDesign() {
  const {
    // State
    view,
    showUploadPanel,
    uploadedImages,
    selectedImageForEditing,
    uploadMode,
    cropMode,
    cropHandles,
    isDragging,
    activeHandle,
    dragType,
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
    cropArea,
    
    // Refs
    canvasRef,
    cropContainerRef,
    
    // Setters
    setShowUploadPanel,
    setUploadMode,
    setSelectedImageForEditing,
    setCropMode,
    setCropHandles,
    setWidth,
    setHeight,
    setContrast,
    setOneColor,
    setInvertColor,
    setShades,
    setRemoveBg,
    setRotation,
    setFlipX,
    setFlipY,
    
    // Handlers
    handleDeselectImage, 
    handleViewChange,
    handleUploadButtonClick,
    handleImageClick,
    handleUpload,
    handleDrag,
    handleResize,
    handleRotate,
    removeUpload,
    updateImageProperty,
    handleCropHandleMouseDown,
    handleCrop,
    applyCrop,
    cancelCrop,
    duplicateImage,
    flipHorizontal,
    flipVertical,
    centerImage,
    moveLayer,
    applyEdits,
    resetToOriginal,
  } = useImageEditor();

  return (
    <div className="flex h-screen bg-gray-100 pb-10 relative">
      <Sidebar onUploadClick={handleUploadButtonClick} />
      
      <MainPanel
        showUploadPanel={showUploadPanel}
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
        flipX={flipX}
        flipY={flipY}
        cropMode={cropMode}
        cropHandles={cropHandles}
        cropArea={cropArea}
        canvasRef={canvasRef}
        cropContainerRef={cropContainerRef}
        isDragging={isDragging}
        activeHandle={activeHandle}
        onUploadButtonClick={handleUploadButtonClick}
        onShowUploadPanelChange={setShowUploadPanel}
        onUpload={handleUpload}
        onUpdateImageProperty={updateImageProperty}
        onCropHandleMouseDown={handleCropHandleMouseDown}
        onCrop={handleCrop}
        onCancelCrop={cancelCrop}
        onApplyCrop={applyCrop}
        onCropHandlesChange={setCropHandles}
        onCenterImage={centerImage}
        onMoveLayer={moveLayer}
        onFlipHorizontal={flipHorizontal}
        onFlipVertical={flipVertical}
        onDuplicateImage={duplicateImage}
        onResetToOriginal={resetToOriginal}
        onApplyEdits={applyEdits}
        setWidth={setWidth}
        setHeight={setHeight}
        setContrast={setContrast}
        setOneColor={setOneColor}
        setInvertColor={setInvertColor}
        setShades={setShades}
        setRemoveBg={setRemoveBg}
        setRotation={setRotation}
        setFlipX={setFlipX}
        setFlipY={setFlipY}
      />

      <DesignCanvas
        ref={canvasRef}
        view={view}
        uploadedImages={uploadedImages}
        selectedImageForEditing={selectedImageForEditing}
        onViewChange={handleViewChange}
        onImageClick={handleImageClick}
        onDrag={handleDrag}
        onResize={handleResize}
        onRotate={handleRotate}
        onRemoveUpload={removeUpload}
        onDeselectImage={handleDeselectImage} 
      />

      {/* REMOVE THIS DUPLICATE CANVAS */}
      {/* <canvas ref={canvasRef} style={{ display: "none" }} /> */}
    </div>
  );
}