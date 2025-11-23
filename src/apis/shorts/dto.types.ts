export interface FeedOwner {
  id: number;
  displayName: string;
  profileImageUrl: string;
  isFollowed: boolean;
}

export interface Shorts {
  id: number;
  owner: FeedOwner;
  videoUrl: string;
  title: string;
  description: string;
  durationSec: number;
  summary: string;
  tags: string[];
  createdAt: string;
  aiStatus: 'DONE' | 'PENDING' | 'FAILED';
}

export interface ShortsResponse {
  data: Shorts;
}

export interface ShortsFeedResponse {
  data: Shorts[];
  nextPageParam: string | null;
  hasNextPage: boolean;
}
