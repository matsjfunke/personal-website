import AboutMeCarusel from "@/components/AboutMeCarusel";
import Funken from "@/components/Funken";

export default function Home() {
  return (
    <div className="min-h-[90vh] bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <Funken />
      </div>
      <AboutMeCarusel />
    </div>
  );
}
