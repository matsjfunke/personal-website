import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import matter from "gray-matter";

interface Props {
  params: {
    slug: string;
  };
}

async function getCompendium(slug: string) {
  try {
    const compendiumsPath = join(process.cwd(), "content/compendiums");
    const filePath = join(compendiumsPath, `${slug}.mdx`);
    const fileContents = await readFile(filePath, "utf-8");

    const { content, data: frontmatter } = matter(fileContents);

    return {
      content,
      frontmatter,
      title:
        frontmatter.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      slug,
    };
  } catch (error) {
    console.error("Error reading compendium:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const compendiumsPath = join(process.cwd(), "content/compendiums");
    const files = await readdir(compendiumsPath);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function CompendiumPage({ params }: Props) {
  const compendium = await getCompendium(params.slug);

  if (!compendium) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/compendiums"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Compendiums
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-8 border-b border-white/20 pb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {compendium.title}
            </h1>
            {(compendium.frontmatter.author || compendium.frontmatter.date) && (
              <div className="flex justify-between items-center text-lg text-white/60 mt-4">
                {compendium.frontmatter.author && (
                  <span>by {compendium.frontmatter.author}</span>
                )}
                {compendium.frontmatter.date && (
                  <time>
                    {new Date(compendium.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                )}
              </div>
            )}
          </header>

          <div className="mdx-content">
            <MDXRemote
              source={compendium.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  rehypePlugins: [],
                },
              }}
              components={{
                h1: (props) => (
                  <h1
                    className="text-4xl font-bold text-white mt-12 mb-6"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    className="text-3xl font-bold text-white mt-10 mb-4 border-b border-white/20 pb-2"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="text-2xl font-bold text-white mt-8 mb-3"
                    {...props}
                  />
                ),
                h4: (props) => (
                  <h4
                    className="text-xl font-bold text-white mt-6 mb-2"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="text-white/90 leading-relaxed my-4"
                    {...props}
                  />
                ),
                pre: (props) => (
                  <pre
                    className="bg-white/5 border border-white/20 rounded-lg p-4 my-6 overflow-x-auto"
                    {...props}
                  />
                ),
                code: (props) => (
                  <code
                    className="bg-white/10 text-blue-300 px-1 py-0.5 rounded text-sm"
                    {...props}
                  />
                ),
                strong: (props) => (
                  <strong className="text-white font-bold" {...props} />
                ),
                em: (props) => (
                  <em className="text-white/90 italic" {...props} />
                ),
                ul: (props) => (
                  <ul className="space-y-2 my-4 pl-6" {...props} />
                ),
                ol: (props) => (
                  <ol className="space-y-2 my-4 pl-6" {...props} />
                ),
                li: (props) => <li className="text-white/90" {...props} />,
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-white/30 pl-4 italic text-white/80 my-6"
                    {...props}
                  />
                ),
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
