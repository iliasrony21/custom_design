import Image from "next/image";
import working_procedure from "../../public/working_procedure.png";
import { RiText } from "react-icons/ri";
import { SiMaterialdesignicons } from "react-icons/si";
import { TbIconsFilled } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import Link from "next/link";

export default function WorkingSteps() {
  return (
   <section className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 container mx-auto px-4 md:px-0 py-12 md:py-16 lg:py-20">
  {/* Image Section - 60% width */}
  <div className="flex justify-center lg:justify-start w-full lg:w-3/5">
    <div className="relative w-full aspect-[4/3] md:aspect-[4/2] lg:aspect-[4/3]">
      <Image
        src={working_procedure}
        alt="idea banner"
        fill
        className="rounded-2xl object-contain w-full h-full"
        sizes="(max-width: 1024px) 90vw, 60vw"
        priority
      />
    </div>
  </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center space-y-4 md:space-y-6 w-full lg:w-2/5">
        <Link
          href="/"
          className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-3xl text-sm font-medium w-fit hover:bg-red-200 transition-colors duration-200"
        >
          Design Your Own
        </Link>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight md:leading-snug">
          T-shirt printing made easy.
        </h2>

        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed">
          You’ve got the idea, we’ve got the tools—design your custom clothing
          with our free design assets:
        </p>

        {/* Feature List */}
        <div className="text-content grid grid-cols-2 gap-6">
          <div className="card-design">
            <div className="icon flex gap-4 items-center">
              <div className="single-icon bg-red-100 p-2 md:p-3 2xl:p-4 rounded-full text-red-600">
                <RiText />
              </div>
              <div className="text-2xl text-bold">Font Library</div>
            </div>
            <p className="py-3 text-md">
              Lorem ipsum det, consec tetur duis nec fringi det, consec
            </p>
          </div>
          <div className="card-design">
            <div className="icon flex gap-4 items-center">
              <div className="single-icon bg-purple-100 p-2 md:p-3 2xl:p-4 rounded-full text-purple-600">
                <SiMaterialdesignicons />
              </div>
              <div className="text-2xl text-bold">Quick Designs</div>
            </div>
            <p className="py-3 text-md">
              Lorem ipsum det, consec tetur duis nec fringi det, consec
            </p>
          </div>
          <div className="card-design">
            <div className="icon flex gap-4 items-center">
              <div className="single-icon bg-orange-100 p-2 md:p-3 2xl:p-4 rounded-full text-orange-600">
                <TbIconsFilled />
              </div>
              <div className="text-2xl text-bold">Free Icons</div>
            </div>
            <p className="py-3 text-md">
              Lorem ipsum det, consec tetur duis nec fringi det, consec
            </p>
          </div>
          <div className="card-design">
            <div className="icon flex gap-4 items-center">
              <div className="single-icon bg-red-100 p-2 md:p-3 2xl:p-4 rounded-full text-red-600">
                <FaRegImage />
              </div>
              <div className="text-2xl text-bold">Free Images</div>
            </div>
            <p className="py-3 text-md">
              Lorem ipsum det, consec tetur duis nec fringi det, consec
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
