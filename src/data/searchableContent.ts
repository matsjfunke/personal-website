import { books } from "./books";
import { compendiums } from "./compendiums";
import { thoughts } from "./thoughts";

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  type: "page" | "book" | "compendium" | "thought";
  url: string;
  keywords?: string[];
}

// Static pages
export const pages: SearchableItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to my personal website",
    type: "page",
    url: "/",
    keywords: ["home", "main", "welcome", "about"],
  },
  {
    id: "compendiums",
    title: "Compendiums",
    description: "A collection of concise comprehensive guides and references",
    type: "page",
    url: "/compendiums",
    keywords: ["guides", "references", "documentation", "learning"],
  },
  {
    id: "books",
    title: "Books",
    description: "Some of my dearest reads and what they taught me",
    type: "page",
    url: "/books",
    keywords: ["reading", "literature", "recommendations", "learning"],
  },
  {
    id: "thoughts",
    title: "Thoughts",
    description:
      "A collection of my thoughts on technology, life, and everything in between",
    type: "page",
    url: "/thoughts",
    keywords: ["blog", "ideas", "opinions", "technology", "life"],
  },
];

// Convert books to searchable items
export const searchableBooks: SearchableItem[] = books.map((book, index) => ({
  id: `book-${index}`,
  title: book.title,
  description: book.thoughts,
  type: "book",
  url: "/books",
  keywords: ["book", "reading", "recommendation"],
}));

// Convert compendiums to searchable items
export const searchableCompendiums: SearchableItem[] = compendiums.map(
  (compendium) => ({
    id: `compendium-${compendium.slug}`,
    title: compendium.title,
    description: compendium.description,
    type: "compendium",
    url: `/compendiums/${compendium.slug}`,
    keywords: [
      "compendium",
      "guide",
      "reference",
      compendium.slug.replace(/-/g, " "),
    ],
  })
);

export const searchableThoughts: SearchableItem[] = thoughts.map((thought) => ({
  id: `thought-${thought.slug}`,
  title: thought.title,
  description: thought.abstract,
  type: "thought",
  url: `/thoughts/${thought.slug}`,
  keywords: ["blog", "thought", "opinion", thought.slug.replace(/-/g, " ")],
}));

// Get all searchable content
export const getAllSearchableContent = (): SearchableItem[] => {
  return [
    ...pages,
    ...searchableBooks,
    ...searchableCompendiums,
    ...searchableThoughts,
  ];
};
