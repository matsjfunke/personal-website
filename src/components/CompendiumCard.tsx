import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { CompendiumMeta } from "@/types/compendium";

import { CardSpotlight } from "./ui/card-spotlight";

interface CompendiumCardProps {
  compendium: CompendiumMeta;
}

export function CompendiumCard({ compendium }: CompendiumCardProps) {
  return (
    <CardSpotlight>
      <Link href={`/compendiums/${compendium.slug}`} className="block group">
        <header className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-white/90 transition-colors">
            {compendium.title}
          </h2>
          <div className="flex justify-between items-center text-sm text-white/60">
            {compendium.author && <span>by {compendium.author}</span>}
            <time>
              {new Date(compendium.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>
        <p className="text-white/80 leading-relaxed flex-grow">
          {compendium.description}
        </p>
        <div className="mt-4 text-white/60 group-hover:text-white/80 transition-colors flex items-center gap-2">
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-active:translate-x-2" />
        </div>
      </Link>
    </CardSpotlight>
  );
}
