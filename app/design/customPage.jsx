"use client";
import { useRef } from "react";
import Sidebar from "@/app/components/design/Sidebar";
import MainPanel from "@/app/components/design/MainPanel";
import DesignCanvas from "@/app/components/design/DesignCanvas";
import { useImageEditor } from "@/app/hooks/useImageEditor";
import { useAddTextEditor } from "@/app/hooks/useAddTextEditor";

export default function CustomDesign() {
  const {
    // Image Editor State
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

  const {
    // Text Editor State
    showTextPanel,
    uploadedTexts,
    selectedTextForEditing,
    textMode,
    inputText,
    font,
    color,
    outline,
    shape,
    textSize,
    rotation: textRotation,
    flipX: textFlipX,
    flipY: textFlipY,
    textAlign, // ADD THIS
    textVerticalAlign, // ADD THIS
    showFontModal,
    showColorModal,
    showOutlineModal,
    showShapeModal,
    availableFonts,
    availableColors,
    availableOutlines,
    availableShapes,

    // Text Setters
    setShowTextPanel,
    setUploadedTexts,
    setSelectedTextForEditing,
    setTextMode,
    setInputText,
    setFont,
    setColor,
    setOutline,
    setShape,
    setTextSize,
    setRotation: setTextRotation,
    setFlipX: setTextFlipX,
    setFlipY: setTextFlipY,
    setShowFontModal,
    setShowColorModal,
    setShowOutlineModal,
    setShowShapeModal,

    // Text Handlers
    handleAddText,
    updateTextInRealTime,
    handleTextClick,
    handleTextDrag,
    handleTextResize,
    handleTextRotate,
    handleRemoveText,
    handleDeselectText,
    handleFontSelect,
    handleColorSelect,
    handleOutlineSelect,
    handleShapeSelect,
    flipHorizontal: flipTextHorizontal,
    flipVertical: flipTextVertical,
    duplicateText,
    centerText,
    resetTextToDefault,
    closeAllModals,
    getTextPath,

    // Alignment and layering functions - ADD THESE
    alignTextLeft,
    alignTextCenter,
    alignTextRight,
    alignTextTop,
    alignTextMiddle,
    alignTextBottom,
    bringToFront,
    sendToBack,
    bringForward,
    sendBackward,

    // NEW: Real-time handlers
    handleTextContentChange,
    handleFontChange,
    handleColorChange,
    handleOutlineChange,
    handleShapeChange,
    handleTextSizeChange,
    handleRotationChange,
    handleFlipXChange,
    handleFlipYChange,
    handleTextAlignChange,
    handleVerticalAlignChange,
  } = useAddTextEditor();
  // Art Text part 

  // Enhanced button click handlers to manage modal visibility
  const handleUploadButtonClickEnhanced = () => {
    console.log("Upload button clicked");
    setShowUploadPanel(true);
    setShowTextPanel(false);
    setUploadMode(true);
    setSelectedImageForEditing(null);
    closeAllModals();
  };

  const handleTextButtonClickEnhanced = () => {
    console.log("Text button clicked");
    setShowTextPanel(true);
    setShowUploadPanel(false);
    setTextMode(true);
    setSelectedTextForEditing(null);
    setInputText("");
    closeAllModals();
  };
  const handleArtButtonClickEnhanced = () => {
    console.log("Art button clicked");
    // setShowTextPanel(false);
    // setShowUploadPanel(false);
    // setTextMode(true);
    // setSelectedTextForEditing(null);
    // setInputText("");
    // closeAllModals();
  };

  // Enhanced close handlers
  const handleCloseUploadPanel = () => {
    console.log("Closing upload panel");
    setShowUploadPanel(false);
    setSelectedImageForEditing(null);
  };

  const handleCloseTextPanel = () => {
    console.log("Closing text panel");
    setShowTextPanel(false);
    setSelectedTextForEditing(null);
    closeAllModals();
  };

  return (
    <div className="flex h-screen bg-gray-100 pb-10 relative">
      <Sidebar
        onUploadClick={handleUploadButtonClickEnhanced}
        onTextButtonClick={handleTextButtonClickEnhanced}
        onArtButtonClick={handleArtButtonClickEnhanced}
      />

      <MainPanel
        // Image Props
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
        onUploadButtonClick={handleUploadButtonClickEnhanced}
        onAddTextButtonClick={handleTextButtonClickEnhanced}
        onArtTextButtonClick={handleArtButtonClickEnhanced}
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
        // Text Props
        showTextPanel={showTextPanel}
        textMode={textMode}
        selectedTextForEditing={selectedTextForEditing}
        inputText={inputText}
        font={font}
        color={color}
        outline={outline}
        shape={shape}
        textSize={textSize}
        textRotation={textRotation}
        textFlipX={textFlipX}
        textFlipY={textFlipY}
        textAlign={textAlign}
        textVerticalAlign={textVerticalAlign}
        showFontModal={showFontModal}
        showColorModal={showColorModal}
        showOutlineModal={showOutlineModal}
        showShapeModal={showShapeModal}
        availableFonts={availableFonts}
        availableColors={availableColors}
        availableOutlines={availableOutlines}
        availableShapes={availableShapes}
        onShowTextPanelChange={setShowTextPanel}
        onTextModeChange={setTextMode}
        onAddText={handleAddText}
        onUpdateTextProperty={updateTextInRealTime} // FIX THIS LINE
        setInputText={setInputText}
        setFont={setFont}
        setColor={setColor}
        setOutline={setOutline}
        setShape={setShape}
        setTextSize={setTextSize}
        setTextRotation={setTextRotation}
        setTextFlipX={setTextFlipX}
        setTextFlipY={setTextFlipY}
        setShowFontModal={setShowFontModal}
        setShowColorModal={setShowColorModal}
        setShowOutlineModal={setShowOutlineModal}
        setShowShapeModal={setShowShapeModal}
        onFontSelect={handleFontSelect}
        onColorSelect={handleColorSelect}
        onOutlineSelect={handleOutlineSelect}
        onShapeSelect={handleShapeSelect}
        onFlipTextHorizontal={flipTextHorizontal}
        onFlipTextVertical={flipTextVertical}
        onDuplicateText={duplicateText}
        onCenterText={centerText}
        onResetTextToDefault={resetTextToDefault}
        onCloseUploadPanel={handleCloseUploadPanel}
        onCloseTextPanel={handleCloseTextPanel}
        // Alignment and layering functions
        alignTextLeft={alignTextLeft}
        alignTextCenter={alignTextCenter}
        alignTextRight={alignTextRight}
        alignTextTop={alignTextTop}
        alignTextMiddle={alignTextMiddle}
        alignTextBottom={alignTextBottom}
        bringToFront={bringToFront}
        sendToBack={sendToBack}
        bringForward={bringForward}
        sendBackward={sendBackward}
        // NEW: Real-time handlers
        handleTextContentChange={handleTextContentChange}
        handleFontChange={handleFontChange}
        handleColorChange={handleColorChange}
        handleOutlineChange={handleOutlineChange}
        handleShapeChange={handleShapeChange}
        handleTextSizeChange={handleTextSizeChange}
        handleRotationChange={handleRotationChange}
        handleFlipXChange={handleFlipXChange}
        handleFlipYChange={handleFlipYChange}
        handleTextAlignChange={handleTextAlignChange}
        handleVerticalAlignChange={handleVerticalAlignChange}
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
        // Text Props
        uploadedTexts={uploadedTexts}
        selectedTextForEditing={selectedTextForEditing}
        onTextClick={handleTextClick}
        onTextDrag={handleTextDrag}
        onTextResize={handleTextResize}
        onTextRotate={handleTextRotate}
        onRemoveText={handleRemoveText}
        onDeselectText={handleDeselectText}
        onDuplicateText={duplicateText}
        getTextPath={getTextPath} // ADD THIS LINE
      />
    </div>
  );
}
