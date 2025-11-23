"use client";
import { ImageUp, Type, BookImage, ShoppingBagIcon } from "lucide-react";
import UploadPanelOverlay from "./UploadPanelOverlay";
import TextPanelOverlay from "./TextPanelOverlay";
import ArtTextPanel from "./ArtTextPanel";
import ArtCategoryModal from "./ArtCategoryModal";
import ArtSubcategoryModal from "./ArtSubcategoryModal";
import EmojiPickerModal from "./EmojiPickerModal";
import EditArtModal from "./EditArtModal";
import { useState } from "react";

// const MainPanel = ({
//   showUploadPanel,
//   uploadMode,
//   selectedImageForEditing,
//   width,
//   height,
//   contrast,
//   oneColor,
//   invertColor,
//   shades,
//   removeBg,
//   rotation,
//   // flipX,
//   // flipY,
//   cropMode,
//   cropHandles,
//   cropArea,
//   canvasRef,
//   cropContainerRef,
//   isDragging,
//   activeHandle,
//   onUploadButtonClick,
//   onAddTextButtonClick,
//   onArtTextButtonClick,
//   onShowUploadPanelChange,
//   onUpload,
//   onUpdateImageProperty,
//   onCropHandleMouseDown,
//   onCrop,
//   onCancelCrop,
//   onApplyCrop,
//   onCropHandlesChange,
//   onCenterImage,
//   onMoveLayer,
//   onFlipHorizontal,
//   onFlipVertical,
//   onDuplicateImage,
//   onResetToOriginal,
//   onApplyEdits,
//   setWidth,
//   setHeight,
//   setContrast,
//   setOneColor,
//   setInvertColor,
//   setShades,
//   setRemoveBg,
//   setRotation,
//   // setFlipX,
//   // setFlipY,
//   // Text Props - FIXED PROP NAMES
//   showTextPanel,
//   textMode, // Changed from AddTextMode to textMode
//   textAlign,
//   textVerticalAlign,
//   selectedTextForEditing,
//   inputText,
//   font, // Changed from changeFont to font
//   color, // Changed from colorText to color
//   outline,
//   shape,
//   textSize,
//   textRotation, // Changed from rotationText to textRotation
//   textFlipX, // Changed from flipX to textFlipX
//   textFlipY, // Changed from flipY to textFlipY
//   showFontModal,
//   showColorModal,
//   showOutlineModal,
//   showShapeModal,
//   availableFonts,
//   availableColors,
//   availableOutlines,
//   availableShapes,
//   onShowTextPanelChange,
//   onTextModeChange, // Changed from onAddTextModeChange to onTextModeChange
//   onAddText,
//   onUpdateTextProperty,
//   onApplyTextEdits,
//   setInputText,
//   setFont, // Changed from setChangeFont to setFont
//   setColor, // Changed from setColorText to setColor
//   setOutline,
//   setShape,
//   setTextSize,
//   setTextRotation, // Changed from setRotationText to setTextRotation
//   setTextFlipX, // Changed from setFlipX to setTextFlipX
//   setTextFlipY, // Changed from setFlipY to setTextFlipY
//   setShowFontModal,
//   setShowColorModal,
//   setShowOutlineModal,
//   setShowShapeModal,
//   onFontSelect,
//   onColorSelect,
//   onOutlineSelect,
//   onShapeSelect,
//   onFlipTextHorizontal,
//   onFlipTextVertical,
//   onDuplicateText,
//   onCenterText,
//   onResetTextToDefault,
//   onCloseUploadPanel,
//   onCloseTextPanel,
//   alignTextLeft,
//   alignTextCenter,
//   alignTextRight,
//   alignTextTop,
//   alignTextMiddle,
//   alignTextBottom,
//   bringToFront,
//   sendToBack,
//   sendBackward,
//   bringForward,

//   // new
//   handleTextContentChange,
//   handleFontChange,
//   handleColorChange,
//   handleOutlineChange,
//   handleShapeChange,
//   handleTextSizeChange,
//   handleRotationChange,
//   handleFlipXChange,
//   handleFlipYChange,
//   handleVerticalAlignChange,
//   handleTextAlignChange,

//   // Art text panel

//   // new art panel
//   showArtPanel,
//   setShowArtPanel,
//   showArtCategories,
//   setShowArtCategories,
//   showArtSubcategories,
//   setShowArtSubcategories,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   selectedCategory,
//   selectedSubcategory,
//   setSelectedCategory,
//   setSelectedSubcategory,


//   onArtTextResize,



//   onArtTextClick,
//   onArtTextDrag,
//   getArtTextPath,
//   handleAddEmoji,
//   artModalStep, // ⬅ ADD THIS
//   setArtModalStep,

  





//  selectedArtTextForEditing,
//   onArtTextRotate,
//   onDuplicateArtText,
//   onFlipX,
//   onFlipY,
//   onLayerUp,
//   onLayerDown,
//   onRemoveArtText,
//   onChangeArt,
//   onUpdateSize,
//   setActiveIndex,


// }) 
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
  cropMode,
  cropHandles,
  cropArea,
  canvasRef,
  cropContainerRef,
  isDragging,
  activeHandle,
  onUploadButtonClick,
  onAddTextButtonClick,
  onArtTextButtonClick,
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
  showTextPanel,
  textMode,
  textAlign,
  textVerticalAlign,
  selectedTextForEditing,
  inputText,
  font,
  color,
  outline,
  shape,
  textSize,
  textRotation,
  textFlipX,
  textFlipY,
  showFontModal,
  showColorModal,
  showOutlineModal,
  showShapeModal,
  availableFonts,
  availableColors,
  availableOutlines,
  availableShapes,
  onShowTextPanelChange,
  onTextModeChange,
  onAddText,
  onUpdateTextProperty,
  onApplyTextEdits,
  setInputText,
  setFont,
  setColor,
  setOutline,
  setShape,
  setTextSize,
  setTextRotation,
  setTextFlipX,
  setTextFlipY,
  setShowFontModal,
  setShowColorModal,
  setShowOutlineModal,
  setShowShapeModal,
  onFontSelect,
  onColorSelect,
  onOutlineSelect,
  onShapeSelect,
  onFlipTextHorizontal,
  onFlipTextVertical,
  onDuplicateText,
  onCenterText,
  onResetTextToDefault,
  onCloseUploadPanel,
  onCloseTextPanel,
  alignTextLeft,
  alignTextCenter,
  alignTextRight,
  alignTextTop,
  alignTextMiddle,
  alignTextBottom,
  bringToFront,
  sendToBack,
  sendBackward,
  bringForward,
  handleTextContentChange,
  handleFontChange,
  handleColorChange,
  handleOutlineChange,
  handleShapeChange,
  handleTextSizeChange,
  handleRotationChange,
  handleFlipXChange,
  handleFlipYChange,
  handleVerticalAlignChange,
  handleTextAlignChange,
  showArtPanel,
  setShowArtPanel,
  showArtCategories,
  setShowArtCategories,
  showArtSubcategories,
  setShowArtSubcategories,
  showEmojiPicker,
  setShowEmojiPicker,
  selectedCategory,
  selectedSubcategory,
  setSelectedCategory,
  setSelectedSubcategory,
  onArtTextResize,
  onArtTextClick,
  onArtTextDrag,
  getArtTextPath,
  handleAddEmoji,
  artModalStep,
  setArtModalStep,
  onArtTextRotate,
  onDuplicateArtText,
  onFlipX,
  onFlipY,
  onLayerUp,
  onLayerDown,
  onRemoveArtText,
  onChangeArt,
  onUpdateSize,
  setActiveIndex,
  setSelectedArtTextForEditing,
  selectedArtTextForEditing,
}) => {
  // const [artRotation, setArtRotation] = useState(
  //   selectedArtTextForEditing?.rotation || 0
  // );
 const [artRotation, setArtRotation] = useState(selectedArtTextForEditing?.rotation || 0);
  const [flipX, setFlipX] = useState(selectedArtTextForEditing?.flipX || false);
  const [flipY, setFlipY] = useState(selectedArtTextForEditing?.flipY || false);
    const handleDrag = (id, startX, startY, canvasRef) => {
    onArtTextDrag(id, startX, startY, canvasRef); // Call the passed down function
  };
  
  // Center the art/text
const handleCenter = () => {
  console.log('Centering the art');

  // Ensure that canvasRef is not null and that the selectedArtTextForEditing exists
  if (canvasRef.current && selectedArtTextForEditing) {
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    // Center the selected art
    const updatedArt = {
      ...selectedArtTextForEditing,
      x: canvasWidth / 2 - selectedArtTextForEditing.width / 2,
      y: canvasHeight / 2 - selectedArtTextForEditing.height / 2
    };

    // Update state immediately with new values
    setSelectedArtTextForEditing(updatedArt);
  }
};


// const deselectArt = () => {
//     selectedArtTextForEditing = null;
//     setSelectedArtTextForEditing(null);
//     console.log("Art deselected");
// };
    // Handle size update
  // const handleUpdateSize = (key, value) => {
  //   console.log(`Updating size for ${key}: ${value}`);
  //   if (key === "width") selectedArtTextForEditing.width = value;
  //   if (key === "height") selectedArtTextForEditing.height = value;
  //   onUpdateSize(key, value);
  // };

const handleUpdateSize = (key, value) => {
  console.log(`Updating size for ${key}: ${value}`);
  if (key === "width") selectedArtTextForEditing.width = value;
  if (key === "height") selectedArtTextForEditing.height = value;
  
  // If the function is passed as a prop (or defined in parent), call it
  if (onUpdateSize) {
    onUpdateSize(key, value); // Call onUpdateSize passed down as a prop
  }
};

  const handleRemoveWhite = () => {
    // Your logic for centering
    console.log("remove white the art or text");
  };
  const handleChangeArt = () => {
    // Your logic for centering
    console.log("change art the art or text");
  };
 // Flip the art vertically

  const handleFlipX = () => {
    console.log("Flipping the art horizontally");
    const updatedFlipX = !flipX;
    setFlipX(updatedFlipX);
    selectedArtTextForEditing.flipX = updatedFlipX;
  };

  const handleFlipY = () => {
    console.log("Flipping the art vertically");
    const updatedFlipY = !flipY;
    setFlipY(updatedFlipY);
    selectedArtTextForEditing.flipY = updatedFlipY;
  };
const handleLayerUp = () => {
    console.log("Moving art up one layer");
    if (onLayerUp && selectedArtTextForEditing) {
        // Increase zIndex or reorder in array
        selectedArtTextForEditing.zIndex += 1;  // Adjust this based on your logic
        onLayerUp(selectedArtTextForEditing);
    } else {
        console.warn("onLayerUp is not defined or selected art is missing");
    }
};

const handleLayerDown = () => {
    console.log("Moving art down one layer");
    if (onLayerDown && selectedArtTextForEditing) {
        // Decrease zIndex or reorder in array
        selectedArtTextForEditing.zIndex -= 1;  // Adjust this based on your logic
        onLayerDown(selectedArtTextForEditing);
    } else {
        console.warn("onLayerDown is not defined or selected art is missing");
    }
};

 // Handle the rotation of art
const handleArtRotate = (newRotation) => {
    console.log(`Rotating the art to ${newRotation} degrees`);
    setArtRotation(newRotation);
    selectedArtTextForEditing.rotation = newRotation;  // Apply rotation change
};
 const handleArtTextClick = (art) => {
    console.log("Image clicked", art);
    setSelectedArtTextForEditing(art);
    if (art.flipX !== flipX) {
        setFlipX(art.flipX);
    }
    if (art.flipY !== flipY) {
        setFlipY(art.flipY);
    }
    if (art.rotation !== artRotation) {
        setArtRotation(art.rotation);
    }
  };

  return (
    <aside className="w-.5/3 2xl:w-[400px] bg-white shadow-md z-20 relative">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-8">What's next for you?</h2>

        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={() => {
              setActiveIndex(0); // Set active to Upload button
              onUploadButtonClick();
            }}
            className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300"
          >
            <ImageUp className="text-4xl mb-2" />
            <span className="font-medium">Uploads</span>
          </div>

          <div
            onClick={() => {
              setActiveIndex(1); // Set active to Add Text button
              onAddTextButtonClick();
            }}
            className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300"
          >
            <Type className="w-8 h-8 mb-2" />
            <span className="font-medium">Add Text</span>
          </div>

          <div
            onClick={() => {
              setActiveIndex(2);
              setShowArtCategories(true);
              setShowArtPanel(true); // This should work now
            }}
            className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300"
          >
            <BookImage className="text-4xl mb-2" />
            <span className="font-medium">Add Art</span>
          </div>

          <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300">
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
          onClose={onCloseUploadPanel || (() => onShowUploadPanelChange(false))}
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
      {/* Text modal overlay */}

      {showTextPanel && (
        <TextPanelOverlay
          textMode={textMode}
          textAlign={textAlign}
          textVerticalAlign={textVerticalAlign}
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
          showFontModal={showFontModal}
          showColorModal={showColorModal}
          showOutlineModal={showOutlineModal}
          showShapeModal={showShapeModal}
          availableFonts={availableFonts}
          availableColors={availableColors}
          availableOutlines={availableOutlines}
          availableShapes={availableShapes}
          onClose={onCloseTextPanel || (() => onShowTextPanelChange(false))}
          onTextModeChange={onTextModeChange}
          onAddText={onAddText}
          onUpdateTextProperty={onUpdateTextProperty}
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
          onFontSelect={onFontSelect}
          onColorSelect={onColorSelect}
          onOutlineSelect={onOutlineSelect}
          onShapeSelect={onShapeSelect}
          onFlipTextHorizontal={onFlipTextHorizontal}
          onFlipTextVertical={onFlipTextVertical}
          onDuplicateText={onDuplicateText}
          onCenterText={onCenterText}
          onResetTextToDefault={onResetTextToDefault}
          // ADD THESE MISSING PROPS:
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
          // Real-time handlers
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
      )}

      {/* Art text panel  */}
      {/* Art Category Modal */}
      {showArtCategories && (
        <ArtCategoryModal
          onClose={() => setShowArtCategories(false)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setShowArtCategories(false);
            setShowArtSubcategories(true);
          }}
        />
      )}

      {/* Art Subcategory Modal */}
      {/* {showArtSubcategories && (
        <ArtSubcategoryModal
          category={selectedCategory}
          onClose={() => setShowArtSubcategories(false)}
          onSelectSubcategory={(sub) => {
            setSelectedSubcategory(sub);
            setShowArtSubcategories(false);
            setShowEmojiPicker(true);
            setArtModalStep("edit");
          }}
        />
      )} */}

      {showArtSubcategories && (
        <ArtSubcategoryModal
          category={selectedCategory}
          onClose={() => setShowArtSubcategories(false)}
          onSelectSubcategory={(sub) => {
            setSelectedSubcategory(sub);
            setShowArtSubcategories(false);
            setShowEmojiPicker(true);
            setArtModalStep("emoji");
          }}
          setArtModalStep={setArtModalStep}
          setShowArtSubcategories={setShowArtSubcategories}
          setShowArtCategories={setShowArtCategories}
        />
      )}

      {/* Emoji Picker Modal */}
      {/* {showEmojiPicker && (
        <EmojiPickerModal
          category={selectedCategory}
          subcategory={selectedSubcategory}
          onClose={() => setShowEmojiPicker(false)}
          onSelectEmoji={(emoji) => {
            handleAddEmoji(emoji); // ⭐ ADD THE EMOJI TO CANVAS
            setShowEmojiPicker(false); // Close emoji modal
            setShowArtSubcategories(false);
            setShowArtCategories(false);
            setShowArtPanel(true);
            setArtModalStep("edit"); // Open Art Panel (optional)
          }}
        />
      )} */}

      {showEmojiPicker && (
        <EmojiPickerModal
          category={selectedCategory}
          subcategory={selectedSubcategory}
          onClose={() => setShowEmojiPicker(false)}
          onSelectEmoji={(emoji) => {
            handleAddEmoji(emoji);
            setShowEmojiPicker(false);
            setShowArtSubcategories(false);
            setShowArtCategories(false);
            setShowArtPanel(true);
            setArtModalStep("edit");
          }}
          setArtModalStep={setArtModalStep}
          setShowEmojiPicker={setShowEmojiPicker}
          setShowArtSubcategories={setShowArtSubcategories}
        />
      )}

      {artModalStep === "edit" && selectedArtTextForEditing && (
      // <EditArtModal
      //     art={selectedArtTextForEditing}
      //     onClose={() => setArtModalStep("emoji")}
      //     onCenter={handleCenter}
      //     onRotate={handleArtRotate}
      //     onDuplicate={onDuplicateArtText}
      //     onFlipX={handleFlipX}
      //     onFlipY={handleFlipY}
      //     onLayerUp={handleLayerUp}
      //     onLayerDown={handleLayerDown}
      //     onRemoveWhite={onRemoveArtText}
      //     onChangeArt={handleChangeArt}
      //     onUpdateSize={handleUpdateSize}
      //   />
      <EditArtModal
          art={selectedArtTextForEditing}
          onClose={() => setArtModalStep("emoji")}
          onCenter={handleCenter}
          onRotate={handleArtRotate}
          onDuplicate={onDuplicateArtText}
          onFlipX={handleFlipX}
          onFlipY={handleFlipY}
          onLayerUp={handleLayerUp}
          onLayerDown={handleLayerDown}
          onRemoveWhite={onRemoveArtText}
          onChangeArt={handleChangeArt}
          onUpdateSize={handleUpdateSize}
        />
      )}

        {/* Art click handling */}
      <div
        onClick={() => handleArtTextClick(someArtObject)}
        className="art-item"
      >
        {/* Render the art (e.g., image or emoji) */}
      </div>
    </aside>
  );
};

export default MainPanel;
