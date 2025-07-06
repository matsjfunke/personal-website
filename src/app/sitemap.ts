import { MetadataRoute } from "next";

import { compendiums } from "@/data/compendiums";
import { thoughts } from "@/data/thoughts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://matsjfunke.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compendiums`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thoughts`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Dynamic compendium pages
  const compendiumPages = compendiums.map((compendium) => ({
    url: `${baseUrl}/compendiums/${compendium.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic thought pages
  const thoughtPages = thoughts.map((thought) => ({
    url: `${baseUrl}/thoughts/${thought.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...compendiumPages, ...thoughtPages];
}
