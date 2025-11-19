"use client";

export default function ArtSubcategoryModal({ category, onClose, onSelectSubcategory }) {
  const subcategories = ["Happy", "Sad", "Funny", "Love", "Cool"];

  return (
    <div className="absolute inset-0 bg-white z-[110] p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{category} Subcategories</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => onSelectSubcategory(sub)}
            className="border p-4 rounded hover:bg-gray-100"
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}
