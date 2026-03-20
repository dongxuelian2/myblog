import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "posts/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        tags: z.array(z.string()).min(1),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    }),
  },
});
