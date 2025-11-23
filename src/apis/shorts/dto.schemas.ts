import { z } from 'zod';

export const FeedOwnerSchema = z.object({
  id: z.number(),
  displayName: z.string(),
  profileImageUrl: z.url(),
  isFollowed: z.boolean(),
});

export const ShortsSchema = z.object({
  id: z.number(),
  owner: FeedOwnerSchema,
  videoUrl: z.url(),
  title: z.string(),
  description: z.string(),
  durationSec: z.number(),
  summary: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  aiStatus: z.enum(['DONE', 'PENDING', 'FAILED']),
});

export const ShortsResponseSchema = z.object({
  data: ShortsSchema,
});

export const ShortsFeedResponseSchema = z.object({
  data: z.array(ShortsSchema),
  nextPageParam: z.string().nullable(),
  hasNextPage: z.boolean(),
});
