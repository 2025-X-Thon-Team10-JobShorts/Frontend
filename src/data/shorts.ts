export interface Short {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  author: string;
}

export const shorts: Short[] = [
  {
    id: 1,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Big Buck Bunny',
    description: 'A short film about a giant rabbit.',
    author: 'Blender Foundation',
  },
  {
    id: 2,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Elephants Dream',
    description: 'A short film about two strange characters.',
    author: 'Blender Foundation',
  },
  {
    id: 3,
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'For Bigger Blazes',
    description: 'A short film about a man who loves fire.',
    author: 'Blender Foundation',
  },
  {
    id: 4,
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'For Bigger Escapes',
    description: 'A short film about a man who loves to escape.',
    author: 'Blender Foundation',
  },
  {
    id: 5,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'For Bigger Fun',
    description: 'A short film about a man who loves to have fun.',
    author: 'Blender Foundation',
  },
  {
    id: 6,
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'For Bigger Joyrides',
    description: 'A short film about a man who loves joyrides.',
    author: 'Blender Foundation',
  },
  {
    id: 7,
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'For Bigger Meltdowns',
    description: 'A short film about a man who loves meltdowns.',
    author: 'Blender Foundation',
  },
  {
    id: 8,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Sintel',
    description: 'A short film about a girl and her dragon.',
    author: 'Blender Foundation',
  },
  {
    id: 9,
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    title: 'Subaru Outback On Street And Dirt',
    description: 'A short film about a car.',
    author: 'Blender Foundation',
  },
  {
    id: 10,
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Tears of Steel',
    description: 'A short film about a robot.',
    author: 'Blender Foundation',
  },
];
