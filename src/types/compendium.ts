export interface CompendiumMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

export interface CompendiumDetail {
  content: string;
  frontmatter: CompendiumMeta;
  title: string;
  slug: string;
}
