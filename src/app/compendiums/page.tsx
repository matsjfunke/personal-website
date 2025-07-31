import type { Metadata } from "next";

import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

import { CompendiumsList } from "@/components/CompendiumsList";
import { CompendiumMeta } from "@/types/compendium";

async function getCompendiums(): Promise<CompendiumMeta[]> {
  try {
    const compendiumsPath = join(process.cwd(), "content/compendiums");
    const files = await readdir(compendiumsPath);

    const compendiums = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = join(compendiumsPath, file);
          const fileContents = await readFile(filePath, "utf-8");

          const { data: frontmatter } = matter(fileContents);

          return {
            title:
              frontmatter.title ||
              slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            description:
              frontmatter.description ||
              `A compendium about ${slug.replace(/-/g, " ")}.`,
            date: frontmatter.date || new Date().toISOString().split("T")[0],
            author: frontmatter.author,
            slug,
          };
        })
    );

    return compendiums.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading compendiums:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Compendiums - Technical Guides & References",
  description:
    "Technical guides, notes, references and tutorials covering topics from protocols & specifications to machine learning architectures.",
  keywords: [
    "technical guides",
    "software development",
    "programming tutorials",
    "AI tutorials",
    "machine learning guides",
    "technical references",
    "coding guides",
    "development resources",
  ],
  openGraph: {
    title: "Compendiums - Technical Guides & References",
    description:
      "Technical guides, notes, references and tutorials covering topics from protocols & specifications to machine learning architectures.",
    url: "https://matsjfunke.com/compendiums",
  },
};

export default async function CompendiumsPage() {
  const compendiums = await getCompendiums();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Compendiums</h1>
          <p className="text-xl text-white/80">
            A collection of my intuitions, concise guides, notes & references on
            various engineering topics.
          </p>
        </div>

        <CompendiumsList compendiums={compendiums} />
      </div>
    </div>
  );
}
