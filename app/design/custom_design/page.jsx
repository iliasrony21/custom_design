"use client";

import Sidebar from "@/app/components/design/Sidebar";
import MainPanel from "@/app/components/design/MainPanel";
import DesignCanvas from "@/app/components/design/DesignCanvas";

import { useImageEditor } from "@/app/hooks/useImageEditor";
import { useAddTextEditor } from "@/app/hooks/useAddTextEditor";
import { useArtTextEditor } from "@/app/hooks/useArtTextEditor";
import { useState } from "react";

export default function CustomDesign() {
  // Keep your fully-complete editors as namespace objects to avoid collisions
  const image = useImageEditor();
  const addText = useAddTextEditor();
  const artText = useArtTextEditor();
 const [selectedArtTextForEditing, setSelectedArtTextForEditing] = useState(null);
  // active panel 
    const [activeIndex, setActiveIndex] = useState(null);
    const [artModalStep, setArtModalStep] = useState("categories");

   const handleSidebarButtonClick = (index) => {
    setActiveIndex(index);
  };


  // Art Library Modal States
  const [showArtCategories, setShowArtCategories] = useState(false);
  const [showArtSubcategories, setShowArtSubcategories] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // For handling art modal visibility
  const [showArtPanel, setShowArtPanel] = useState(false);

  // ---------- Enhanced button click handlers ----------
  const handleUploadButtonClickEnhanced = () => {
    console.log("Upload button clicked");
     setActiveIndex(0);
    image.setShowUploadPanel(true);
    addText.setShowTextPanel(false);
    setShowArtCategories(false);
    setShowArtSubcategories(false);
    setShowEmojiPicker(false);
    // artText.setShowArtPanel(false);
    // Close any add-text modals
    if (addText.closeAllModals) addText.closeAllModals();
    // Hide art panel if you want:
    if (artText.setShowArtTextPanel) artText.setShowArtTextPanel(false);
    // prepare upload mode
    image.setUploadMode(true);
    image.setSelectedImageForEditing(null);
  };

  const handleUpdateSize = (key, value) => {
  console.log(`Updating size for ${key}: ${value}`);
  if (key === "width") selectedArtTextForEditing.width = value;
  if (key === "height") selectedArtTextForEditing.height = value;
  
  // If the function is passed as a prop (or defined in parent), call it
  if (onUpdateSize) {
    onUpdateSize(key, value); // Call onUpdateSize passed down as a prop
  }
};

    const handleLayerUp = (selectedArtText) => {
    // Logic for moving the art/text to the top layer or front in the canvas stack
    console.log("Move to top layer: ", selectedArtText);
    // Assuming you have an array of art elements, you can modify the position of selectedArtText in that array
  };
    const handleLayerDown = (selectedArtText) => {
    // Logic for moving the art/text to the top layer or front in the canvas stack
    console.log("Move to top layer: ", selectedArtText);
    // Assuming you have an array of art elements, you can modify the position of selectedArtText in that array
  };

  const handleTextButtonClickEnhanced = () => {
    console.log("Text button clicked");
     setActiveIndex(1);
    addText.setShowTextPanel(true);
    image.setShowUploadPanel(false);
    addText.setTextMode(true);
    addText.setSelectedTextForEditing(null);
    addText.setInputText("");
    setShowArtCategories(false);
    setShowArtSubcategories(false);
    setShowEmojiPicker(false);
    if (addText.closeAllModals) addText.closeAllModals();
    // hide art panel
    if (artText.setShowArtTextPanel) artText.setShowArtTextPanel(false);
  };

  // const handleArtButtonClickEnhanced = () => {
  //   console.log("Art button clicked");
  //   // Show art panel and hide others
  //   if (artText.setShowArtTextPanel) artText.setShowArtTextPanel(true);
  //   addText.setShowTextPanel(false);
  //   image.setShowUploadPanel(false);
  //   // Reset selection in other editors
  //   addText.setSelectedTextForEditing(null);
  //   image.setSelectedImageForEditing(null);
  //   if (addText.closeAllModals) addText.closeAllModals();
  // };

  // const handleArtButtonClickEnhanced = () => {
  //   console.log("Art button clicked");
  //   setShowArtPanel(true);

  //   // Close other panels
  //   addText.setShowTextPanel(false);
  //   image.setShowUploadPanel(false);

  //   // reset states
  //   setShowArtCategories(false);
  //   setShowArtSubcategories(false);
  //   setShowEmojiPicker(false);
  // };

  const handleArtButtonClickEnhanced = () => {
     setActiveIndex(2);
    setShowArtCategories(true); // Open the category modal
    setShowArtPanel(true); // Show the main Art Panel
    addText.setShowTextPanel(false); // Hide text panel if visible
    image.setShowUploadPanel(false); // Hide image panel if visible
  };

  // ---------- Close handlers ----------
  const handleCloseUploadPanel = () => {
    image.setShowUploadPanel(false);
    image.setSelectedImageForEditing(null);
  };

  const handleCloseTextPanel = () => {
    addText.setShowTextPanel(false);
    addText.setSelectedTextForEditing(null);
    if (addText.closeAllModals) addText.closeAllModals();
  };

  // ---------- Close handlers ----------
  const handleCloseArtPanel = () => {
    setShowArtPanel(false);
    artText.setSelectedArtTextForEditing(null);
  };

  const handleCenter = () => {
  // Logic for centering the art text or image
  console.log('Centering the art');
};

const handleFlipX = () => {
  // Logic for flipping art horizontally
  console.log('Flipping art horizontally');
};

const handleFlipY = () => {
  // Logic for flipping art vertically
  console.log('Flipping art vertically');
};


  // ---------- Pass props to MainPanel ----------
  // For backwards compatibility with your current MainPanel prop API, we pass
  // image and addText props individually. We also pass a new `artText` object
  // and some art-specific props so MainPanel can show art UI.
  return (
    <div className="flex h-screen bg-gray-100 pb-10 relative">
      {/* <Sidebar
        onUploadClick={handleUploadButtonClickEnhanced}
        onTextButtonClick={handleTextButtonClickEnhanced}
        onArtButtonClick={handleArtButtonClickEnhanced}
      /> */}

      {/* <Sidebar
        onUploadClick={handleUploadButtonClickEnhanced}
        onTextButtonClick={handleTextButtonClickEnhanced}
        onArtButtonClick={() => {
          setShowArtCategories(true);
          setShowArtPanel(true); // Open Art Panel
        }}
        activeIndex={activeIndex} onSidebarButtonClick={handleSidebarButtonClick}
      /> */}

     <Sidebar
        onUploadClick={handleUploadButtonClickEnhanced}
        onTextButtonClick={handleTextButtonClickEnhanced}
        onArtButtonClick={handleArtButtonClickEnhanced} // Ensure this is passed correctly
        activeIndex={activeIndex}
        onSidebarButtonClick={handleSidebarButtonClick}
      />

      <MainPanel
        /* ----------------- Image props (from image namespace) ----------------- */
        showUploadPanel={image.showUploadPanel}
        uploadMode={image.uploadMode}
        selectedImageForEditing={image.selectedImageForEditing}
        width={image.width}
        height={image.height}
        contrast={image.contrast}
        oneColor={image.oneColor}
        invertColor={image.invertColor}
        shades={image.shades}
        removeBg={image.removeBg}
        rotation={image.rotation}
        flipX={image.flipX}
        flipY={image.flipY}
        cropMode={image.cropMode}
        cropHandles={image.cropHandles}
        cropArea={image.cropArea}
        canvasRef={image.canvasRef}
        cropContainerRef={image.cropContainerRef}
        isDragging={image.isDragging}
        activeHandle={image.activeHandle}
        onUploadButtonClick={handleUploadButtonClickEnhanced}
        onAddTextButtonClick={handleTextButtonClickEnhanced}
         onArtButtonClick={handleArtButtonClickEnhanced}
        onShowUploadPanelChange={image.setShowUploadPanel}
        onUpload={image.handleUpload}
        onUpdateImageProperty={image.updateImageProperty}
        onCropHandleMouseDown={image.handleCropHandleMouseDown}
        onCrop={image.handleCrop}
        onCancelCrop={image.cancelCrop}
        onApplyCrop={image.applyCrop}
        onCropHandlesChange={image.setCropHandles}
        onCenterImage={image.centerImage}
        onMoveLayer={image.moveLayer}
        onFlipHorizontal={image.flipHorizontal}
        onFlipVertical={image.flipVertical}
        onDuplicateImage={image.duplicateImage}
        onResetToOriginal={image.resetToOriginal}
        onApplyEdits={image.applyEdits}
        setWidth={image.setWidth}
        setHeight={image.setHeight}
        setContrast={image.setContrast}
        setOneColor={image.setOneColor}
        setInvertColor={image.setInvertColor}
        setShades={image.setShades}
        setRemoveBg={image.setRemoveBg}
        setRotation={image.setRotation}
        setFlipX={image.setFlipX}
        setFlipY={image.setFlipY}
        onCloseUploadPanel={handleCloseUploadPanel}
        /* ----------------- Add-Text props (from addText namespace) ----------------- */
        showTextPanel={addText.showTextPanel}
        textMode={addText.textMode}
        selectedTextForEditing={addText.selectedTextForEditing}
        inputText={addText.inputText}
        font={addText.font}
        color={addText.color}
        outline={addText.outline}
        shape={addText.shape}
        textSize={addText.textSize}
        textRotation={addText.rotation}
        textFlipX={addText.flipX}
        textFlipY={addText.flipY}
        textAlign={addText.textAlign}
        textVerticalAlign={addText.textVerticalAlign}
        showFontModal={addText.showFontModal}
        showColorModal={addText.showColorModal}
        showOutlineModal={addText.showOutlineModal}
        showShapeModal={addText.showShapeModal}
        availableFonts={addText.availableFonts}
        availableColors={addText.availableColors}
        availableOutlines={addText.availableOutlines}
        availableShapes={addText.availableShapes}
        onShowTextPanelChange={addText.setShowTextPanel}
        onTextModeChange={addText.setTextMode}
        onAddText={addText.handleAddText}
        onUpdateTextProperty={addText.updateTextInRealTime}
        setInputText={addText.setInputText}
        setFont={addText.setFont}
        setColor={addText.setColor}
        setOutline={addText.setOutline}
        setShape={addText.setShape}
        setTextSize={addText.setTextSize}
        setTextRotation={addText.setRotation}
        setTextFlipX={addText.setFlipX}
        setTextFlipY={addText.setFlipY}
        setShowFontModal={addText.setShowFontModal}
        setShowColorModal={addText.setShowColorModal}
        setShowOutlineModal={addText.setShowOutlineModal}
        setShowShapeModal={addText.setShowShapeModal}
        onFontSelect={addText.handleFontSelect}
        onColorSelect={addText.handleColorSelect}
        onOutlineSelect={addText.handleOutlineSelect}
        onShapeSelect={addText.handleShapeSelect}
        onFlipTextHorizontal={addText.flipHorizontal}
        onFlipTextVertical={addText.flipVertical}
        onDuplicateText={addText.duplicateText}
        onCenterText={addText.centerText}
        onResetTextToDefault={addText.resetTextToDefault}
        onCloseTextPanel={handleCloseTextPanel}
        // Alignment & layering (add text)
        alignTextLeft={addText.alignTextLeft}
        alignTextCenter={addText.alignTextCenter}
        alignTextRight={addText.alignTextRight}
        alignTextTop={addText.alignTextTop}
        alignTextMiddle={addText.alignTextMiddle}
        alignTextBottom={addText.alignTextBottom}
        bringToFront={addText.bringToFront}
        sendToBack={addText.sendToBack}
        bringForward={addText.bringForward}
        sendBackward={addText.sendBackward}
        // Real-time handlers (add text)
        handleTextContentChange={addText.handleTextContentChange}
        handleFontChange={addText.handleFontChange}
        handleColorChange={addText.handleColorChange}
        handleOutlineChange={addText.handleOutlineChange}
        handleShapeChange={addText.handleShapeChange}
        handleTextSizeChange={addText.handleTextSizeChange}
        handleRotationChange={addText.handleRotationChange}
        handleFlipXChange={addText.handleFlipXChange}
        handleFlipYChange={addText.handleFlipYChange}
        handleTextAlignChange={addText.handleTextAlignChange}
        handleVerticalAlignChange={addText.handleVerticalAlignChange}
        /* ----------------- Art-Text props (new, from artText namespace) ----------------- */
       

        showArtPanel={showArtPanel}
        showArtCategories={showArtCategories}
        setShowArtCategories={setShowArtCategories}
        showArtSubcategories={showArtSubcategories}
        setShowArtSubcategories={setShowArtSubcategories}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
        //  showArtPanel={showArtPanel}
        setShowArtPanel={setShowArtPanel} // Pass this as a prop
        setActiveIndex={setActiveIndex}
        handleAddEmoji={artText.handleAddEmoji}
        uploadedArtTexts={artText.uploadedArtTexts}
    selectedArtTextForEditing={artText.selectedArtTextForEditing}
     onArtTextClick={artText.handleTextClick}
  onArtTextDrag={artText.handleArtTextDrag}
  onArtTextResize={artText.handleArtTextResize}
  onArtTextRotate={artText.handleArtTextRotate}
  onRemoveArtText={artText.handleRemoveArtText}
  onDuplicateArtText={artText.handleDuplicateArtText}
  getArtTextPath={artText.getTextPath}
  artModalStep={artModalStep}   // ⬅⬅ ADD THIS LINE
  setArtModalStep={setArtModalStep}
 onLayerUp={handleLayerUp}
 onLayerDown={handleLayerDown}


      setSelectedArtTextForEditing={setSelectedArtTextForEditing} // Ensure this is passed down
    onUpdateSize={handleUpdateSize}

      />

      {/* ---------- Canvas: pass namespaced objects and compatibility props ---------- */}
      {/* <DesignCanvas
        ref={image.canvasRef}
        view={image.view}
        uploadedImages={image.uploadedImages}
        selectedImageForEditing={image.selectedImageForEditing}
        onViewChange={image.handleViewChange}
        onImageClick={image.handleImageClick}
        onDrag={image.handleDrag}
        onResize={image.handleResize}
        onRotate={image.handleRotate}
        onRemoveUpload={image.removeUpload}
        onDeselectImage={image.handleDeselectImage}
        // AddText existing compatibility props
        uploadedTexts={addText.uploadedTexts}
        selectedTextForEditing={addText.selectedTextForEditing}
        onTextClick={addText.handleTextClick}
        onTextDrag={addText.handleTextDrag}
        onTextResize={addText.handleTextResize}
        onTextRotate={addText.handleTextRotate}
        onRemoveText={addText.handleRemoveText}
        onDeselectText={addText.handleDeselectText}
        onDuplicateText={addText.duplicateText}
        getTextPath={addText.getTextPath}
        //  ArtText new art props 
        uploadedArtTexts={artText.uploadedArtTexts}
        selectedArtTextForEditing={artText.selectedArtTextForEditing}
        onArtTextClick={artText.handleTextClick}
        onArtTextDrag={artText.handleArtTextDrag}
        onArtDuplicateText={artText.handleDuplicateArtText}
        getArtTextPath={artText.getTextPath}
      /> */}

      <DesignCanvas
  ref={image.canvasRef}
  view={image.view}
  uploadedImages={image.uploadedImages}
  selectedImageForEditing={image.selectedImageForEditing}
  onViewChange={image.handleViewChange}
  onImageClick={image.handleImageClick}
  onDrag={image.handleDrag}
  onResize={image.handleResize}
  onRotate={image.handleRotate}
  onRemoveUpload={image.removeUpload}
  onDeselectImage={image.handleDeselectImage}
  /* Text */
  uploadedTexts={addText.uploadedTexts}
  selectedTextForEditing={addText.selectedTextForEditing}
  onTextClick={addText.handleTextClick}
  onTextDrag={addText.handleTextDrag}
  onTextResize={addText.handleTextResize}
  onTextRotate={addText.handleTextRotate}
  onRemoveText={addText.handleRemoveText}
  onDeselectText={addText.handleDeselectText}
  onDuplicateText={addText.duplicateText}
  getTextPath={addText.getTextPath}
  /* Art Text */
  uploadedArtTexts={artText.uploadedArtTexts}
  selectedArtTextForEditing={artText.selectedArtTextForEditing}
  onArtTextClick={artText.handleTextClick}
  onArtTextDrag={artText.handleArtTextDrag}
  onArtTextResize={artText.handleArtTextResize}      // ✅ NEW
  onArtTextRotate={artText.handleArtTextRotate}      // ✅ NEW
  onRemoveArtText={artText.handleRemoveArtText}      // ✅ NEW
  onDuplicateArtText={artText.handleDuplicateArtText} // ✅ FIX NAME
  getArtTextPath={artText.getTextPath}
/>

    </div>
  );
}
