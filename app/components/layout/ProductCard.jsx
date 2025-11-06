import Image from "next/image";
import Price from "../Price";
import ColorDot from "./ColorDots";

export default function ProductCard({ product}) {
  
  return (
     <article className=" rounded-2xl shadow-xl hover:shadow-lg transition group bg-white relative">
       {/* Badge */}
       {product.badge && (
         <span
           className={`absolute top-3 z-30 left-3 text-xs px-2 py-1 rounded-md ${
             product.badge === "Sale"
               ? "bg-green-500 text-white"
               : product.badge === "New"
               ? "bg-indigo-500 text-white"
               : product.badge === "Hot"
               ? "bg-orange-400 text-white"
               : product.badge === "Sold out"
               ? "bg-gray-700 text-white"
               : "bg-gray-200"
           }`}
         >
           {product.badge}
         </span>
       )}
 
       {/* Image */}
       <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 flex items-center justify-center">
         {/* HTML <img> used here for simplicity — you may swap to next/image if desired */}
 
         <Image
           src={product.image.src}
           alt={product.name}
           width={500}
           height={500}
           className="object-cover w-full h-full"
         />
 
         {/* Hover icons */}
         <div className="absolute inset-0 p-4 bg-black/0 group-hover:bg-black/20 transition flex items-end justify-center opacity-0 group-hover:opacity-100">
           <div className="mb-4 flex gap-2">
             <button
               aria-label="Add to wishlist"
               className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow hover:scale-105 transition"
             >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                 <path
                   d="M12 21s-7-4.35-9.5-7.5C-1 8 6 3 12 8c6-5 13 0 9.5 5.5C19 16.65 12 21 12 21z"
                   fill="#111827"
                 />
               </svg>
             </button>
             <button
               aria-label="Quick view"
               className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow hover:scale-105 transition"
             >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                 <path
                   d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7zm0 11a4 4 0 110-8 4 4 0 010 8z"
                   fill="#111827"
                 />
               </svg>
             </button>
             <button
               aria-label="Compare"
               className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow hover:scale-105 transition"
             >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                 <path
                   d="M10 3H5a2 2 0 00-2 2v5"
                   stroke="#111827"
                   strokeWidth="1.2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 />
                 <path
                   d="M14 21h5a2 2 0 002-2v-5"
                   stroke="#111827"
                   strokeWidth="1.2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 />
                 <path
                   d="M21 7L9 19"
                   stroke="#111827"
                   strokeWidth="1.2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 />
               </svg>
             </button>
           </div>
         </div>
 
         {/* Sold out overlay */}
         {product.soldOut && (
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <span className="text-white font-semibold bg-black/60 px-4 py-2 rounded-full">
               Sold out
             </span>
           </div>
         )}
       </div>
 
       {/* Info */}
       <div className="text-part p-4">
         <h3 className="font-medium text-sm mb-1">{product.name}</h3>
         <div className="flex items-center justify-between">
           <div className="text-sm text-gray-700">
             <Price min={product.priceMin} max={product.priceMax} />
           </div>
           <div className="text-xs text-gray-500">
             {" "}
             • {product.colors.length}+
           </div>
         </div>
 
         {/* Color dots */}
         <div className="mt-3">
           {product.colors.map((c, idx) => (
             <ColorDot key={idx} color={c} />
           ))}
         </div>
       </div>
     </article>
   );
}
