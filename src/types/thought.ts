export interface ThoughtMeta {
  title: string;
  abstract: string;
  date: string;
  author: string;
  slug: string;
}

export interface ThoughtDetail {
  content: string;
  frontmatter: ThoughtMeta;
  title: string;
  slug: string;
}
