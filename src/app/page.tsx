import AboutMeCarousel from "@/components/AboutMeCarousel";
import Funken from "@/components/Funken";

export default function Home() {
  return (
    <div className="bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <Funken />
      </div>
      <div className="pb-20">
        <h2 className="text-2xl font-bold text-left text-white pb-8 pl-4">
          Things I&apos;m enjoying:
        </h2>
        <AboutMeCarousel />
      </div>
    </div>
  );
}
