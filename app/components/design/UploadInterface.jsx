import { Upload } from "lucide-react";

const UploadInterface = ({ onUpload }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <label
        htmlFor="file-upload"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 inline-flex items-center gap-2"
      >
        <Upload className="w-4 h-4" /> Browse Your Computer
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onUpload}
        className="hidden"
      />
      <p className="mt-4 text-gray-500">or Drag & Drop Anywhere</p>
    </div>
  );
};

export default UploadInterface;