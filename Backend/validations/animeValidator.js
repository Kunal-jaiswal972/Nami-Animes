import { z } from "zod";

const TitleSchema = z.object({
  romaji: z.optional(z.string().nullable()),
  english: z.optional(z.string().nullable()),
  native: z.optional(z.string().nullable()),
  userPreferred: z.optional(z.string().nullable()),
});

const TrailerSchema = z.object({
  id: z.optional(z.string().nullable()),
  site: z.optional(z.string().nullable()),
  thumbnail: z.optional(z.string().nullable()),
});

const AnimeObjectSchema = z.object({
  id: z.string().refine((id) => !!id, {
    message: "Anilistid should be present",
  }),
  malId: z
    .number()
    .refine((id) => !!id, { message: "malId should be present" }),
  title: z.optional(TitleSchema.nullable()),
  image: z.optional(z.string().nullable()),
  trailer: z.optional(TrailerSchema.nullable()),
  description: z.optional(z.string().nullable()),
  status: z.optional(z.string().nullable()),
  cover: z.optional(z.string().nullable()),
  rating: z.optional(z.number().nullable()),
  releaseDate: z.optional(z.number().nullable()),
  color: z.optional(z.string().nullable()),
  genres: z.optional(z.array(z.string().nullable())),
  totalEpisodes: z.optional(z.number().nullable()),
  duration: z.optional(z.number().nullable()),
  type: z.optional(z.string().nullable()),
});

export const TrendingAnimeResponseSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.optional(z.array(AnimeObjectSchema.nullable())),
});

export const TopAnimeResponseSchema = TrendingAnimeResponseSchema;
