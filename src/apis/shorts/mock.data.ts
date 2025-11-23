import { type ShortsFeedResponse } from './dto.types';

export const mockFeed: ShortsFeedResponse = {
  data: [
    {
      id: 1,
      owner: {
        id: 10,
        displayName: 'Blender Foundation',
        profileImageUrl: 'https://example.com/profile1.png',
        isFollowed: true,
      },
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Big Buck Bunny',
      description: 'A short film about a giant rabbit.',
      durationSec: 32,
      summary: 'AI generated summary',
      tags: ['animation', 'demo'],
      createdAt: new Date().toISOString(),
      aiStatus: 'DONE',
    },
    {
      id: 2,
      owner: {
        id: 11,
        displayName: 'Blender Foundation',
        profileImageUrl: 'https://example.com/profile2.png',
        isFollowed: false,
      },
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Elephants Dream',
      description: 'A short film about two strange characters.',
      durationSec: 28,
      summary: 'AI generated summary',
      tags: ['short', 'cgi'],
      createdAt: new Date().toISOString(),
      aiStatus: 'DONE',
    },
    {
      id: 3,
      owner: {
        id: 12,
        displayName: 'Blender Foundation',
        profileImageUrl: 'https://example.com/profile3.png',
        isFollowed: false,
      },
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'For Bigger Blazes',
      description: 'A short film about a man who loves fire.',
      durationSec: 22,
      summary: 'AI generated summary',
      tags: ['ad', 'fire'],
      createdAt: new Date().toISOString(),
      aiStatus: 'DONE',
    },
    {
      id: 4,
      owner: {
        id: 13,
        displayName: 'Blender Foundation',
        profileImageUrl: 'https://example.com/profile4.png',
        isFollowed: true,
      },
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'For Bigger Escapes',
      description: 'A short film about a man who loves to escape.',
      durationSec: 30,
      summary: 'AI generated summary',
      tags: ['escape'],
      createdAt: new Date().toISOString(),
      aiStatus: 'DONE',
    },
  ],
  nextPageParam: 'cursor_123',
  hasNextPage: true,
};
