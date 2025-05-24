"use client";

import { useMemo, useState } from "react";

import { CompendiumCard } from "@/components/CompendiumCard";
import { CompendiumSearchBar } from "@/components/CompendiumSearchBar";
import { CompendiumMeta } from "@/types/compendium";

export function CompendiumsList({
  compendiums,
}: {
  compendiums: CompendiumMeta[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompendiums = useMemo(() => {
    if (!searchQuery.trim()) {
      return compendiums;
    }

    const query = searchQuery.toLowerCase();
    return compendiums.filter((compendium) => {
      return (
        compendium.title.toLowerCase().includes(query) ||
        compendium.description.toLowerCase().includes(query) ||
        (compendium.author && compendium.author.toLowerCase().includes(query))
      );
    });
  }, [compendiums, searchQuery]);

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <CompendiumSearchBar
          placeholder="Search compendiums..."
          value={searchQuery}
          onChange={setSearchQuery}
          commandKey="F"
          autoFocus={true}
        />
      </div>

      {/* Results */}
      {filteredCompendiums.length === 0 ? (
        <div className="text-center py-12">
          {searchQuery.trim() ? (
            <>
              <p className="text-xl text-white/60 mb-4">
                No compendiums found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="text-white/40">Try a different search term.</p>
            </>
          ) : (
            <>
              <p className="text-xl text-white/60 mb-4">
                No compendiums available yet.
              </p>
              <p className="text-white/40">Check back soon for new content!</p>
            </>
          )}
        </div>
      ) : (
        <>
          {searchQuery.trim() && (
            <div className="mb-6 text-center">
              <p className="text-white/60">
                Found {filteredCompendiums.length} compendium
                {filteredCompendiums.length !== 1 ? "s" : ""} matching &ldquo;
                {searchQuery}&rdquo;
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCompendiums.map((compendium) => (
              <CompendiumCard key={compendium.slug} compendium={compendium} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
