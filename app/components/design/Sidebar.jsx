import { ImageUp, Type, BookImage, Palette } from "lucide-react";

const Sidebar = ({ onUploadClick }) => {
  const menuItems = [
    { icon: ImageUp, label: "Upload" },
    { icon: Type, label: "Add Text" },
    { icon: BookImage, label: "Add Art" },
    { icon: Palette, label: "Colors" },
  ];

  return (
    <aside className="w-28 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.label === "Upload" ? onUploadClick : undefined}
          className="flex flex-col items-center hover:text-red-400"
        >
          <item.icon className="w-8 h-8" />
          <span className="text-sm mt-1">{item.label}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;