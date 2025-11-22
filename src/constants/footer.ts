import { Play, Search, CirclePlus, MessageCircleMore, UserRound } from 'lucide-react';

export const FOOTER_ITEMS = [
  { title: '숏폼', icon: Play, href: '/shorts' },
  { title: '검색', icon: Search, href: '/search' },
  { title: '업로드', icon: CirclePlus, href: '/upload' },
  { title: '메시지', icon: MessageCircleMore, href: '/messages' },
  { title: '프로필', icon: UserRound, href: '/profile' },
];

export const DONT_SHOW_FOOTER_PATHS = ['/login', '/upload', '/onboarding'];
