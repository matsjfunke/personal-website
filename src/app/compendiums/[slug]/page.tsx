import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import { join } from "path";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CompendiumDetail, CompendiumMeta } from "@/types/compendium";

interface Props {
  params: {
    slug: string;
  };
}

async function getCompendium(slug: string): Promise<CompendiumDetail | null> {
  try {
    const compendiumsPath = join(process.cwd(), "content/compendiums");
    const filePath = join(compendiumsPath, `${slug}.mdx`);
    const fileContents = await readFile(filePath, "utf-8");

    const { content, data: frontmatter } = matter(fileContents);

    return {
      content,
      frontmatter: frontmatter as unknown as CompendiumMeta,
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
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 duration-200 group-active:-translate-x-2" />
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
                  remarkPlugins: [remarkMath, remarkGfm],
                  rehypePlugins: [rehypeKatex],
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
                pre: ({ children, ...props }) => {
                  // Extract the code element and its props
                  const codeElement = children?.props?.children;
                  const className = children?.props?.className || "";
                  let language = className.replace("language-", "") || "text";

                  // Language mappings
                  if (language === "sh") language = "bash";
                  if (language === "ascii") language = "text";

                  if (typeof codeElement === "string") {
                    return (
                      <div className="my-6">
                        <SyntaxHighlighter
                          language={language}
                          style={oneDark}
                          customStyle={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.5",
                            margin: 0,
                            padding: "1rem",
                          }}
                          codeTagProps={{
                            style: {
                              background: "transparent",
                            },
                          }}
                          showLineNumbers={language !== "text"}
                          lineNumberStyle={{
                            color: "rgba(255, 255, 255, 0.3)",
                            fontSize: "0.75rem",
                            paddingRight: "1rem",
                            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                            marginRight: "1rem",
                          }}
                          {...props}
                        >
                          {codeElement}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  // Fallback for non-string content
                  return (
                    <pre
                      className="bg-white/5 border border-white/20 rounded-lg p-4 my-6 overflow-x-auto"
                      {...props}
                    >
                      {children}
                    </pre>
                  );
                },
                code: ({ children, className, ...props }) => {
                  // Check if this is an inline code element (not within a pre block)
                  const isInline = !className?.includes("language-");

                  if (isInline) {
                    return (
                      <code
                        className="bg-white/10 text-blue-300 px-1 py-0.5 rounded text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  // For code blocks, let the pre component handle the highlighting
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
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
                table: (props) => (
                  <div className="overflow-x-auto my-6">
                    <table
                      className="min-w-full border border-white/20 rounded-lg"
                      {...props}
                    />
                  </div>
                ),
                thead: (props) => <thead className="bg-white/5" {...props} />,
                tbody: (props) => <tbody {...props} />,
                tr: (props) => (
                  <tr className="border-b border-white/10" {...props} />
                ),
                th: (props) => (
                  <th
                    className="px-4 py-3 text-left text-white font-semibold border-r border-white/10 last:border-r-0"
                    {...props}
                  />
                ),
                td: (props) => (
                  <td
                    className="px-4 py-3 text-white/90 border-r border-white/10 last:border-r-0 text-sm"
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    className="text-blue-400 underline hover:text-blue-300 transition-colors"
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
