import Link from "next/link";

import { BookOpenText, Brain, Option, StickyNote } from "lucide-react";

import AboutMeCarousel from "@/components/AboutMeCarousel";
import Funken from "@/components/Funken";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <div className="bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <Funken />

        <section className="py-12 max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 mb-8 text-center leading-relaxed">
            Happy you found my personal website! I&apos;m a software engineer,
            passionate about learning and AI. I write about technology, life and
            on this website I share my learnings through compendiums and
            thoughts.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/compendiums"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
                      <StickyNote className="w-5 h-5" />
                      Compendiums
                    </h3>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-1">
                    <Option className="w-3 h-3" />
                    <span>C</span>
                  </div>
                </TooltipContent>
              </Tooltip>
              <p className="text-gray-400">
                Technical guides, references and tutorials covering topics from
                protocols & specifications to machine learning architectures.
              </p>
            </div>
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/thoughts"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
                      <Brain className="w-5 h-5" />
                      Thoughts
                    </h3>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-1">
                    <Option className="w-3 h-3" />
                    <span>T</span>
                  </div>
                </TooltipContent>
              </Tooltip>
              <p className="text-gray-400">
                Personal reflections on life and technological development, AI
                trends, and the intersection of technology and human experience.
              </p>
            </div>
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/books"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
                      <BookOpenText className="w-5 h-5" />
                      Books
                    </h3>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-1">
                    <Option className="w-3 h-3" />
                    <span>B</span>
                  </div>
                </TooltipContent>
              </Tooltip>
              <p className="text-gray-400">
                A curated collection of books that I have deeply enjoyed and
                that have significantly shaped my perspectives and thinking over
                time.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="pb-20">
        <AboutMeCarousel />
      </div>
    </div>
  );
}
