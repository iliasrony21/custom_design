"use client";

export default function ArtCategoryModal({ onClose, onSelectCategory }) {
  const categories = ["Emojis", "Shapes & Symbols","sports & Games","Letters & Numbers", "Animals","Mascots","America","parties & Events","Military","Occupations","Colleges","Music","Transportation","Greek Life", "School","Charity","People","Religion","Food & Drink","Seasons & Holidays","Quotes & Phrases","Travel","Most Popular", "Sports", "Nature"];

  return (
    <div className="absolute inset-0 bg-white z-[100] p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Artwork Categories</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <input
        placeholder="Search For Artwork"
        className="w-full border p-2 rounded mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className="border p-4 flex flex-col items-center rounded hover:bg-gray-100"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
            <p className="font-medium">{cat}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
