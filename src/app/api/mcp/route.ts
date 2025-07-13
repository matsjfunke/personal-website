import { NextRequest, NextResponse } from "next/server";

import { readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

import { books } from "@/data/books";
import { compendiums } from "@/data/compendiums";
import { getAllSearchableContent } from "@/data/searchableContent";
import { thoughts } from "@/data/thoughts";
import { searchContent } from "@/lib/search";

// Helper functions to read MDX content
async function getCompendiumContent(slug: string): Promise<string | null> {
  try {
    const compendiumsPath = join(process.cwd(), "content/compendiums");
    const filePath = join(compendiumsPath, `${slug}.mdx`);
    const fileContents = await readFile(filePath, "utf-8");
    const { content } = matter(fileContents);
    return content;
  } catch (error) {
    console.error("Error getting compendium content:", error);
    return null;
  }
}

async function getThoughtContent(slug: string): Promise<string | null> {
  try {
    const thoughtsPath = join(process.cwd(), "content/thoughts");
    const filePath = join(thoughtsPath, `${slug}.mdx`);
    const fileContents = await readFile(filePath, "utf-8");
    const { content } = matter(fileContents);
    return content;
  } catch (error) {
    console.error("Error getting thought content:", error);
    return null;
  }
}

// Handle POST requests - simple JSON-RPC handling
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Handle ping request
    if (body.method === "ping") {
      return NextResponse.json({
        jsonrpc: "2.0",
        result: {},
        id: body.id,
      });
    }

    // Handle initialize request
    if (body.method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            resources: {},
            tools: {},
          },
          serverInfo: {
            name: "matsjfunke-website-mcp",
            version: "1.0.0",
          },
        },
        id: body.id,
      });
    }

    // Handle resources/list request
    if (body.method === "resources/list") {
      const resources = [
        // Collection resources
        {
          uri: "compendiums://all",
          name: "All Compendiums",
          description: "List of all available compendiums on the website",
          mimeType: "application/json",
        },
        {
          uri: "thoughts://all",
          name: "All Thoughts",
          description: "List of all available thoughts and blog posts",
          mimeType: "application/json",
        },
        {
          uri: "books://all",
          name: "All Books",
          description:
            "List of all book recommendations with personal thoughts",
          mimeType: "application/json",
        },
      ];

      // Individual resources removed - use search tool instead for full content

      return NextResponse.json({
        jsonrpc: "2.0",
        result: { resources },
        id: body.id,
      });
    }

    // Handle tools/list request
    if (body.method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        result: {
          tools: [
            {
              name: "search_content",
              description:
                "Search through all website content including compendiums, thoughts, books, and pages",
              inputSchema: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "Search query to find relevant content",
                  },
                },
                required: ["query"],
              },
            },
          ],
        },
        id: body.id,
      });
    }

    // Handle tools/call request
    if (body.method === "tools/call") {
      const { name, arguments: args } = body.params;

      if (name === "search_content") {
        const query = args?.query;
        if (!query || typeof query !== "string") {
          return NextResponse.json({
            jsonrpc: "2.0",
            error: {
              code: -32602,
              message: "Invalid params: query is required and must be a string",
            },
            id: body.id,
          });
        }

        const allContent = getAllSearchableContent();
        const results = searchContent(allContent, query);

        // Get full content for each result
        const contentPromises = results.map(async (item) => {
          let fullContent = item.description; // fallback to description

          if (item.type === "compendium") {
            const slug = item.id.replace("compendium-", "");
            const mdxContent = await getCompendiumContent(slug);
            if (mdxContent) {
              fullContent = mdxContent;
            }
          } else if (item.type === "thought") {
            const slug = item.id.replace("thought-", "");
            const mdxContent = await getThoughtContent(slug);
            if (mdxContent) {
              fullContent = mdxContent;
            }
          } else if (item.type === "book") {
            const bookIndex = parseInt(item.id.replace("book-", ""));
            const book = books[bookIndex];
            if (book) {
              fullContent = `**${book.title}**\n\n${book.thoughts}`;
            }
          }

          return {
            title: item.title,
            type: item.type,
            url: item.url,
            content: fullContent,
          };
        });

        const fullResults = await Promise.all(contentPromises);

        return NextResponse.json({
          jsonrpc: "2.0",
          result: {
            content: [
              {
                type: "text",
                text:
                  `Found ${results.length} results for "${query}":\n\n` +
                  fullResults
                    .map(
                      (item) =>
                        `# ${item.title} (${item.type})\n` +
                        `URL: ${item.url}\n\n` +
                        `${item.content}\n\n---\n`
                    )
                    .join("\n"),
              },
            ],
          },
          id: body.id,
        });
      }

      return NextResponse.json({
        jsonrpc: "2.0",
        error: {
          code: -32601,
          message: `Unknown tool: ${name}`,
        },
        id: body.id,
      });
    }

    // Handle resources/read request
    if (body.method === "resources/read") {
      const uri = body.params?.uri;

      if (uri === "compendiums://all") {
        return NextResponse.json({
          jsonrpc: "2.0",
          result: {
            contents: [
              {
                uri: "compendiums://all",
                text: JSON.stringify(compendiums, null, 2),
                mimeType: "application/json",
              },
            ],
          },
          id: body.id,
        });
      }

      if (uri === "thoughts://all") {
        return NextResponse.json({
          jsonrpc: "2.0",
          result: {
            contents: [
              {
                uri: "thoughts://all",
                text: JSON.stringify(thoughts, null, 2),
                mimeType: "application/json",
              },
            ],
          },
          id: body.id,
        });
      }

      if (uri === "books://all") {
        return NextResponse.json({
          jsonrpc: "2.0",
          result: {
            contents: [
              {
                uri: "books://all",
                text: JSON.stringify(books, null, 2),
                mimeType: "application/json",
              },
            ],
          },
          id: body.id,
        });
      }

      return NextResponse.json({
        jsonrpc: "2.0",
        error: {
          code: -32602,
          message: `Resource not found: ${uri}`,
        },
        id: body.id,
      });
    }

    // Handle unknown methods
    return NextResponse.json({
      jsonrpc: "2.0",
      error: {
        code: -32601,
        message: `Method not found: ${body.method}`,
      },
      id: body.id,
    });
  } catch (error) {
    console.error("Error handling MCP request:", error);
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      },
      { status: 500 }
    );
  }
}
