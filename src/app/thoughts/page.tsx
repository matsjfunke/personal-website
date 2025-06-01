import { Command } from "lucide-react";

import { ThoughtsTimeline } from "@/components/ThoughtsTimeline";
import { thoughts } from "@/data/thoughts";

export default async function ThoughtsPage() {
  const timelineData = thoughts.map((thought) => ({
    date: thought.date,
    title: thought.title,
    abstract: thought.abstract,
    slug: thought.slug,
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-8xl font-bold mb-12">Thoughts</h1>

          <div className="mx-auto bg-gray-900/50 border border-white/20 rounded-lg p-8 space-y-4">
            <p className="text-2xl text-white/80">
              The following texts contain my thoughts, reflections & convictions
              on software, technology and life.
            </p>
            <p className="text-lg text-white/80">
              Use <Command className="w-5 h-5 inline mb-1 mx-1" />K to search if
              you are looking for something specific.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black text-white">
        <ThoughtsTimeline data={timelineData} />
      </div>
    </div>
  );
}
