import { SearchableItem } from "@/data/searchableContent";

export function searchContent(
  items: SearchableItem[],
  query: string
): SearchableItem[] {
  if (!query.trim()) {
    return [];
  }

  const searchQuery = query.toLowerCase().trim();

  return items.filter((item) => {
    // Search in title
    if (item.title.toLowerCase().includes(searchQuery)) {
      return true;
    }

    // Search in description
    if (item.description.toLowerCase().includes(searchQuery)) {
      return true;
    }

    // Search in keywords
    if (
      item.keywords &&
      item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery)
      )
    ) {
      return true;
    }

    return false;
  });
}

export function getTypeLabel(type: SearchableItem["type"]): string {
  switch (type) {
    case "page":
      return "Page";
    case "book":
      return "Book";
    case "compendium":
      return "Compendium";
    case "thought":
      return "Thought";
    default:
      return "Page";
  }
}
