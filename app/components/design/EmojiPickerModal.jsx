"use client";
import Image from "next/image";
import emoji1 from '@/public/emojiglass.png';
import emoji2 from '@/public/emojilike.jpeg';
import emoji3 from '@/public/emojilove.png';
import emoji4 from '@/public/emojiglass.png';

export default function EmojiPickerModal({
  subcategory,
  onClose,
  onSelectEmoji,
  setArtModalStep,
  setShowEmojiPicker,      
  setShowArtSubcategories  
}){

  const emojiImages = [emoji1, emoji2, emoji3, emoji4];

  return (
    <div className="absolute inset-0 bg-white z-[120] p-6 overflow-y-auto">
      
      <div className="flex justify-between items-center mb-6">
        <button
          className="text-lg font-bold"
          onClick={() => {
  setArtModalStep("subcategories"); // change step
  setShowEmojiPicker(false);        // hide emoji
  setShowArtSubcategories(true);    // show subcategory
}}
        >
          <span className="w-20 h-20">←</span>
        </button>

        <h2 className="text-xl font-semibold">
          Choose Art – {subcategory}
        </h2>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {emojiImages.map((img, index) => (
          <button
            key={index}
            onClick={() => onSelectEmoji(img.src)}   // ⭐ FIXED
            className="border rounded p-2 hover:bg-gray-100 flex items-center justify-center"
          >
            <Image
              src={img}
              alt="art"
              width={80}
              height={80}
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
