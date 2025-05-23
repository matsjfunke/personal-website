import { readdir, readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import matter from "gray-matter";

interface CompendiumMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

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

export default async function CompendiumsPage() {
  const compendiums = await getCompendiums();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Compendiums</h1>
          <p className="text-xl text-white/80">
            A collection of comprehensive guides and reference materials
          </p>
        </div>

        {compendiums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-white/60 mb-4">
              No compendiums available yet.
            </p>
            <p className="text-white/40">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {compendiums.map((compendium) => (
              <Link
                key={compendium.slug}
                href={`/compendiums/${compendium.slug}`}
                className="block group"
              >
                <article className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors bg-black/40 backdrop-blur-sm h-full flex flex-col">
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
                  <div className="mt-4 text-white/60 group-hover:text-white/80 transition-colors">
                    Read more →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
