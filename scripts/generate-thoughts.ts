import { readFileSync, readdirSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

interface ThoughtMeta {
  title: string;
  abstract: string;
  date: string;
  author: string;
  slug: string;
}

export function generateThoughts(): void {
  const thoughtsPath = join(process.cwd(), "content/thoughts");
  const outputPath = join(process.cwd(), "src/data/thoughts.ts");

  try {
    const files = readdirSync(thoughtsPath);

    const thoughts: ThoughtMeta[] = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = join(thoughtsPath, file);
        const fileContents = readFileSync(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContents);

        return {
          title:
            frontmatter.title ||
            slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase()),
          abstract: frontmatter.abstract || "No abstract available.",
          date: frontmatter.date || new Date().toISOString().split("T")[0],
          author: frontmatter.author || "matsjfunke",
          slug,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Generate the TypeScript file content
    const fileContent = `import { ThoughtMeta } from "@/types/thought";

export const thoughts: ThoughtMeta[] = ${JSON.stringify(thoughts, null, 2)};
`;

    // Write the file
    writeFileSync(outputPath, fileContent, "utf-8");
    console.log(`✅ Generated thoughts data with ${thoughts.length} entries`);
    console.log(`📝 Updated: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating thoughts:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  generateThoughts();
}
