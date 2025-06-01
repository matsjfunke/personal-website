import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { Command } from "lucide-react";
import { join } from "path";

import { ThoughtsTimeline } from "@/components/ThoughtsTimeline";
import { ThoughtMeta } from "@/types/thought";

async function getThoughts(): Promise<ThoughtMeta[]> {
  try {
    const thoughtsPath = join(process.cwd(), "content/thoughts");
    const files = await readdir(thoughtsPath);

    const thoughts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = join(thoughtsPath, file);
          const fileContents = await readFile(filePath, "utf-8");

          const { data: frontmatter } = matter(fileContents);

          return {
            title:
              frontmatter.title ||
              slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            abstract: frontmatter.abstract || "No abstract available.",
            date: frontmatter.date || new Date().toISOString().split("T")[0],
            author: frontmatter.author || "Anonymous",
            slug,
          };
        })
    );

    return thoughts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading thoughts:", error);
    return [];
  }
}

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

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
