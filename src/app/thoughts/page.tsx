"use client";

import { Brain } from "lucide-react";

export default function ThoughtsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <Brain className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thoughts</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              A collection of my thoughts on technology, life, and everything in
              between.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-white/70 mb-6">
              something is cooking... stay tuned for updates!
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
