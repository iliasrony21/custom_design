// import { ImageUp, Type, BookImage, ShoppingBagIcon, ChevronRight } from "lucide-react";
// import UploadPanelOverlay from "./UploadPanelOverlay";
// import TextPanelOverlay from "./TextPanelOverlay";

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
//   flipX,
//   flipY,
//   cropMode,
//   cropHandles,
//   cropArea,
//   canvasRef,
//   cropContainerRef,
//   isDragging,
//   activeHandle,
//   onUploadButtonClick,
//   onAddTextButtonClick,
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
//   setFlipX,
//   setFlipY,
//   // Text Props
//   showTextPanel,
//   AddTextMode,
//   selectedTextForEditing,
//   changeFont,
//   colorText,
//   outline,
//   shape,
//   textSize,
//   rotationText,
//   onShowTextPanelChange,
//   onAddTextModeChange,
//   onAddText,
//   onUpdateTextProperty,
//   onApplyTextEdits,
//   setChangeFont,
//   setColorText,
//   setOutline,
//   setShape,
//   setTextSize,
//   setRotationText
// }) => {
//   return (
//     <aside className="w-.5/3 2xl:w-[400px] bg-white shadow-md z-20 relative">
//       <div className="p-10">
//         <h2 className="text-2xl font-bold mb-8">What's next for you?</h2>

//         <div className="grid grid-cols-2 gap-6">
//           <div
//             onClick={onUploadButtonClick}
//             className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300"
//           >
//             <ImageUp className="text-4xl mb-2" />
//             <span className="font-medium">Uploads</span>
//           </div>

//           <div
//             onClick={onAddTextButtonClick}
//             className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300"
//           >
//             <Type className="w-8 h-8 mb-2" />
//             <span className="font-medium">Add Text</span>
//           </div>

//           <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300">
//             <BookImage className="text-4xl mb-2" />
//             <span className="font-medium">Add Art</span>
//           </div>

//           <div className="flex flex-col items-center justify-center hover:shadow-lg cursor-pointer p-4 rounded-lg border-2 border-dashed border-gray-300">
//             <ShoppingBagIcon className="text-4xl mb-2" />
//             <span className="font-medium text-center">Change Products</span>
//           </div>
//         </div>

//         <p className="text-gray-600 text-center mt-8">
//           💡 Drag & drop a file anywhere to upload.
//         </p>
//       </div>

//       {/* Upload modal overlay */}
//       {showUploadPanel && (
//         <UploadPanelOverlay
//           uploadMode={uploadMode}
//           selectedImageForEditing={selectedImageForEditing}
//           width={width}
//           height={height}
//           contrast={contrast}
//           oneColor={oneColor}
//           invertColor={invertColor}
//           shades={shades}
//           removeBg={removeBg}
//           rotation={rotation}
//           cropMode={cropMode}
//           cropHandles={cropHandles}
//           cropArea={cropArea}
//           canvasRef={canvasRef}
//           cropContainerRef={cropContainerRef}
//           isDragging={isDragging}
//           activeHandle={activeHandle}
//           onClose={() => onShowUploadPanelChange(false)}
//           onUpload={onUpload}
//           onUpdateImageProperty={onUpdateImageProperty}
//           onCropHandleMouseDown={onCropHandleMouseDown}
//           onCrop={onCrop}
//           onCancelCrop={onCancelCrop}
//           onApplyCrop={onApplyCrop}
//           onCropHandlesChange={onCropHandlesChange}
//           onCenterImage={onCenterImage}
//           onMoveLayer={onMoveLayer}
//           onFlipHorizontal={onFlipHorizontal}
//           onFlipVertical={onFlipVertical}
//           onDuplicateImage={onDuplicateImage}
//           onResetToOriginal={onResetToOriginal}
//           onApplyEdits={onApplyEdits}
//           setWidth={setWidth}
//           setHeight={setHeight}
//           setContrast={setContrast}
//           setOneColor={setOneColor}
//           setInvertColor={setInvertColor}
//           setShades={setShades}
//           setRemoveBg={setRemoveBg}
//           setRotation={setRotation}
//         />
//       )}

//       {/* Text modal overlay */}
//       {showTextPanel && (
//         <TextPanelOverlay
//           AddTextMode={AddTextMode}
//           selectedTextForEditing={selectedTextForEditing}
//           changeFont={changeFont}
//           colorText={colorText}
//           outline={outline}
//           shape={shape}
//           textSize={textSize}
//           rotationText={rotationText}
//           onClose={() => onShowTextPanelChange(false)}
//           onAddTextModeChange={onAddTextModeChange}
//           onAddText={onAddText}
//           onUpdateTextProperty={onUpdateTextProperty}
//           onApplyTextEdits={onApplyTextEdits}
//           setChangeFont={setChangeFont}
//           setColorText={setColorText}
//           setOutline={setOutline}
//           setShape={setShape}
//           setTextSize={setTextSize}
//           setRotationText={setRotationText}
//         />
//       )}
//     </aside>
//   );
// };

import { ImageUp, Type, BookImage, ShoppingBagIcon } from "lucide-react";
import UploadPanelOverlay from "./UploadPanelOverlay";
import TextPanelOverlay from "./TextPanelOverlay";
import ArtTextPanel from "./ArtTextPanel";
import ArtCategoryModal from "./ArtCategoryModal";
import ArtSubcategoryModal from "./ArtSubcategoryModal";
import EmojiPickerModal from "./EmojiPickerModal";

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
  setFlipX,
  setFlipY,
  // Text Props - FIXED PROP NAMES
  showTextPanel,
  textMode, // Changed from AddTextMode to textMode
  textAlign,
  textVerticalAlign,
  selectedTextForEditing,
  inputText,
  font, // Changed from changeFont to font
  color, // Changed from colorText to color
  outline,
  shape,
  textSize,
  textRotation, // Changed from rotationText to textRotation
  textFlipX, // Changed from flipX to textFlipX
  textFlipY, // Changed from flipY to textFlipY
  showFontModal,
  showColorModal,
  showOutlineModal,
  showShapeModal,
  availableFonts,
  availableColors,
  availableOutlines,
  availableShapes,
  onShowTextPanelChange,
  onTextModeChange, // Changed from onAddTextModeChange to onTextModeChange
  onAddText,
  onUpdateTextProperty,
  onApplyTextEdits,
  setInputText,
  setFont, // Changed from setChangeFont to setFont
  setColor, // Changed from setColorText to setColor
  setOutline,
  setShape,
  setTextSize,
  setTextRotation, // Changed from setRotationText to setTextRotation
  setTextFlipX, // Changed from setFlipX to setTextFlipX
  setTextFlipY, // Changed from setFlipY to setTextFlipY
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

  // new
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

  // Art text panel
  // artAvailableFonts,
  // artAvailableColors,
  // artAvailableOutlines,
  // artAvailableShapes,
  //  showArtPanel,
  //   setShowArtPanel,

  artText, // <-- add this
  inputArtText,
  setArtInputText,
  handleAddArtText,
  artFont,
  setArtFont,
  artColor,
  setArtColor,
  artOutline,
  setArtOutline,
  artShape,
  setArtShape,
  artTextSize,
  setArtTextSize,

  onCloseArtPanel,

  // new art panel
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
  setActiveIndex,
}) => {
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
      {showArtSubcategories && (
        <ArtSubcategoryModal
          category={selectedCategory}
          onClose={() => setShowArtSubcategories(false)}
          onSelectSubcategory={(sub) => {
            setSelectedSubcategory(sub);
            setShowArtSubcategories(false);
            setShowEmojiPicker(true);
          }}
        />
      )}

      {/* Emoji Picker Modal */}
      {showEmojiPicker && (
        <EmojiPickerModal
          category={selectedCategory}
          subcategory={selectedSubcategory}
          onClose={() => setShowEmojiPicker(false)}
          onSelectEmoji={(emoji) => {
            // Add draggable emoji to canvas
            console.log("Emoji selected: ", emoji);
            setShowEmojiPicker(false);
            setShowArtPanel(true);
          }}
        />
      )}
    </aside>
  );
};

export default MainPanel;
