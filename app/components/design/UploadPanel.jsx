import { X } from "lucide-react";
import UploadInterface from "./UploadInterface";
import EditInterface from "./EditInterface";

const UploadPanel = ({
  showUploadPanel,
  uploadMode,
  selectedImageForEditing,
  onClose,
  onUpload,
  onUpdateImageProperty,
  onCrop,
  onDuplicate,
  onFlipHorizontal,
  onFlipVertical,
  onCenter,
  onMoveLayer,
  onReset,
  onApplyEdits,
}) => {
  if (!showUploadPanel) return null;

  return (
    <div className="absolute inset-0 bg-white border-l border-gray-200 shadow-2xl flex flex-col z-30">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">
          {uploadMode ? "Upload Image" : "Edit Uploads"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {uploadMode ? (
        <UploadInterface onUpload={onUpload} />
      ) : (
        <EditInterface
          selectedImage={selectedImageForEditing}
          onUpdateImageProperty={onUpdateImageProperty}
          onCrop={onCrop}
          onDuplicate={onDuplicate}
          onFlipHorizontal={onFlipHorizontal}
          onFlipVertical={onFlipVertical}
          onCenter={onCenter}
          onMoveLayer={onMoveLayer}
          onReset={onReset}
          onApplyEdits={onApplyEdits}
        />
      )}
    </div>
  );
};

export default UploadPanel;