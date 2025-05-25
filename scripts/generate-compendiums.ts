import { readFileSync, readdirSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

interface CompendiumMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

function generateCompendiums(): void {
  const compendiumsPath = join(process.cwd(), "content/compendiums");
  const outputPath = join(process.cwd(), "src/data/compendiums.ts");

  try {
    const files = readdirSync(compendiumsPath);

    const compendiums: CompendiumMeta[] = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = join(compendiumsPath, file);
        const fileContents = readFileSync(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContents);

        return {
          title:
            frontmatter.title ||
            slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description:
            frontmatter.description ||
            `A compendium about ${slug.replace(/-/g, " ")}.`,
          date: frontmatter.date || new Date().toISOString().split("T")[0],
          author: frontmatter.author || "matsjfunke",
          slug,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Generate the TypeScript file content
    const fileContent = `import { CompendiumMeta } from "@/types/compendium";

export const compendiums: CompendiumMeta[] = ${JSON.stringify(compendiums, null, 2)};
`;

    // Write the file
    writeFileSync(outputPath, fileContent, "utf-8");
    console.log(
      `✅ Generated compendiums data with ${compendiums.length} entries`
    );
    console.log(`📝 Updated: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating compendiums:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  generateCompendiums();
}

export { generateCompendiums };
