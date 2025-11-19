"use client";

export default function EmojiPickerModal({ subcategory, onClose, onSelectEmoji }) {
  const emojis = ["😂", "🔥", "😎", "😍", "🐶", "👍", "🌟", "⚽"];

  return (
    <div className="absolute inset-0 bg-white z-[120] p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Choose Emoji – {subcategory}</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-4xl">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelectEmoji(emoji)}
            className="p-4 border rounded hover:bg-gray-100"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
