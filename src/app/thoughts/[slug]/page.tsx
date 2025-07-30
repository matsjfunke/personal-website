import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import { join } from "path";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Article, WithContext } from "schema-dts";

import CodeBlock from "@/components/CodeBlock";
import { ThoughtDetail, ThoughtMeta } from "@/types/thought";

interface Props {
  params: {
    slug: string;
  };
}

async function getThought(slug: string): Promise<ThoughtDetail | null> {
  try {
    const thoughtsPath = join(process.cwd(), "content/thoughts");
    const filePath = join(thoughtsPath, `${slug}.mdx`);
    const fileContents = await readFile(filePath, "utf-8");

    const { content, data: frontmatter } = matter(fileContents);

    return {
      content,
      frontmatter: frontmatter as unknown as ThoughtMeta,
      title:
        frontmatter.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      slug,
    };
  } catch (error) {
    console.error("Error reading thought:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const thought = await getThought(params.slug);

  if (!thought) {
    return;
  }

  const { frontmatter, title } = thought;
  const { abstract, date, author } = frontmatter;

  const metadata: Metadata = {
    title,
    description: abstract,
    alternates: {
      canonical: `/thoughts/${thought.slug}`,
    },
    openGraph: {
      title: title,
      description: abstract,
      type: "article",
      publishedTime: date,
      authors: author,
      url: `https://matsjfunke.com/thoughts/${thought.slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description: abstract,
    },
  };

  return metadata;
}

export async function generateStaticParams() {
  try {
    const thoughtsPath = join(process.cwd(), "content/thoughts");
    const files = await readdir(thoughtsPath);

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

export default async function ThoughtPage({ params }: Props) {
  const { slug } = params;
  const thought = await getThought(slug);

  if (!thought) {
    notFound();
  }

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: thought.title,
    description: thought.frontmatter.abstract,
    datePublished: thought.frontmatter.date
      ? new Date(thought.frontmatter.date).toISOString()
      : undefined,
    author: thought.frontmatter.author
      ? [{ "@type": "Person", name: thought.frontmatter.author }]
      : [],
    publisher: {
      "@type": "Person",
      name: "Mats J Funke",
    },
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 duration-200 group-active:-translate-x-2" />
          Back to Thoughts
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-8 border-b border-white/20 pb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {thought.title}
            </h1>
            {thought.frontmatter.abstract && (
              <p className="text-lg text-white/60 mb-4">
                {thought.frontmatter.abstract}
              </p>
            )}
            {(thought.frontmatter.author || thought.frontmatter.date) && (
              <div className="flex justify-between items-center text-lg text-white/60 mt-4">
                {thought.frontmatter.author && (
                  <span>by {thought.frontmatter.author}</span>
                )}
                {thought.frontmatter.date && (
                  <time>
                    {new Date(thought.frontmatter.date).toLocaleDateString(
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
              source={thought.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath, remarkGfm],
                  rehypePlugins: [rehypeKatex],
                },
              }}
              components={{
                h1: (props) => (
                  <h1
                    className="text-5xl font-bold text-white mt-12 mb-6"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    className="text-4xl font-bold text-white mt-10 mb-4 border-b border-white/20 pb-2"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="text-3xl font-bold text-white mt-8 mb-3"
                    {...props}
                  />
                ),
                h4: (props) => (
                  <h4
                    className="text-2xl font-bold text-white mt-6 mb-2"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="text-white/90 leading-relaxed my-4 text-lg mb-6"
                    {...props}
                  />
                ),
                pre: (props) => <CodeBlock {...props} />,
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
                  <ul className="space-y-2 my-4 pl-6 list-disc" {...props} />
                ),
                ol: (props) => (
                  <ol className="space-y-2 my-4 pl-6 list-decimal" {...props} />
                ),
                li: (props) => (
                  <li className="text-white/90 text-lg" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-white/30 pl-4 italic text-white/80 my-6 text-lg"
                    {...props}
                  />
                ),
                table: (props) => (
                  <div className="overflow-x-auto my-6 bg-white/5 border border-white/20 rounded-lg">
                    <table className="min-w-full" {...props} />
                  </div>
                ),
                thead: (props) => <thead className="bg-white/10" {...props} />,
                tbody: (props) => <tbody {...props} />,
                tr: (props) => (
                  <tr
                    className="border-b border-white/10 last:border-b-0"
                    {...props}
                  />
                ),
                th: (props) => (
                  <th
                    className="px-4 py-3 text-left text-white font-semibold border-r border-white/10 last:border-r-0 first:pl-4 last:pr-4 first:rounded-tl-lg last:rounded-tr-lg"
                    {...props}
                  />
                ),
                td: (props) => (
                  <td
                    className="px-4 py-3 text-white/90 border-r border-white/10 last:border-r-0 text-base first:pl-4 last:pr-4"
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    className="text-blue-400 underline hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
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
