import Link from "next/link";
import BannerCard from "../components/layout/BannerCard";
import men from "../../public/men.jpg";
import women from "../../public/women.jpg";
import kids from "../../public/kids.jpg";

export default function SectionDesignYourOwn() {
  return (
    <section className=" py-16">
      <div className=" mx-auto container px-4 md:px-4 2xl:px-0">
        {/* Text + Button */}

        {/* Banners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" mb-12">
            <h2 className="shadow-lg text-center  text-lg font-medium mb-2 bg-pink-50 text-pink-700  w-50  py-3 rounded-full">
              Design your own
            </h2>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900  my-10">
              Find a fit for everyone
            </h1>
            <Link
              href={'/design/custom_design'}
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
            >
              Get Started
            </Link>
          </div>
          <BannerCard title="Women’s Collection" imgSrc={women} href="/shopPage" />
          <BannerCard title="Men’s Collection" imgSrc={men} href="/shopPage" />
          <BannerCard title="Kid’s Collection" imgSrc={kids} href="/shopPage" />
        </div>
      </div>
    </section>
  );
}
