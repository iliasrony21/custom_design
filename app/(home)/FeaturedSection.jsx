import Image from "next/image";
import top_quality from "../../public/shirt.png";
import mix_match from "../../public/shirt2.png";
import shipping from "../../public/shipping.png";

export default function FeaturedSection() {
  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container mx-auto px-4 md:px-0">



      {/* top quality section  */}
      <div className="flex gap-4">
        <div className="image-part">
          <Image
            src={top_quality}
            alt="top_quality"
            width={150}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="text-part flex flex-col justify-center">
          <h3 className="text-xl font-bold">Top Quality</h3>
          <p>
            Printed on 100% quality cotton for a vibrant finish and all-day
            comfort.
          </p>
        </div>
      </div>
      {/* Mix and match section  */}
      <div className="flex gap-4">
        <div className="image-part">
          <Image
            src={mix_match}
            alt="top_quality"
            width={150}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="text-part flex flex-col justify-center">
          <h3 className="text-xl font-bold">Mix and match</h3>
          <p>
            Make stunning designs with beginner-friendly design tools and assets
          </p>
        </div>
      </div>
      {/* 
Shipping worldwide section  */}
      <div className="flex gap-4">
        <div className="image-part">
          <Image
            src={shipping}
            alt="top_quality"
            width={150}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="text-part flex flex-col justify-center">
          <h3 className="text-xl font-bold">Shipping worldwide</h3>
          <p>
            Order prints and get them delivered fast, free, and in recycled
            packaging.
          </p>
        </div>
      </div>
    </div>
  );
}
