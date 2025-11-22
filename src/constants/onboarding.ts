export const ONBOARDING_BG_LINEAR_GRADIENT = {
  step1: {
    from: 'rgba(56, 189, 248, 1)',
    to: 'rgba(147, 197, 253, 1)',
  },
  step2: {
    from: 'rgba(125, 211, 252, 1)',
    to: 'rgba(186, 230, 253, 1)',
  },
  step3: {
    from: 'rgba(14, 165, 233, 1)',
    to: 'rgba(96, 165, 250, 1)',
  },
};

export type OnboardingContents = {
  title: string;
  description: string;
  imageUrl: string;
  gradient: string;
};

export const ONBOARDING_CONTENTS: Record<string, OnboardingContents> = {
  step1: {
    title: '나를 보여주는 30초',
    description: '15~30초면 충분해요.\n가장 ‘당신다운’ 순간을 담아주세요!',
    imageUrl: '/onboarding/step1.png',
    gradient: 'bg-[linear-gradient(135deg,_#38BDF8_0%,_#93C5FD_100%)]',
  },
  step2: {
    title: '채용도 숏폼처럼 가볍게',
    description: '길고 지친 지원서 대신,\n더 빠르고 솔직하게 연결됩니다.',
    imageUrl: '/onboarding/step2.png',
    gradient: 'bg-[linear-gradient(135deg,_#7DD3FC_0%,_#BAE6FD_100%)]',
  },
  step3: {
    title: '지금 바로 기회를 잡아보세요',
    description: '당신의 영상이\n새로운 일을 불러옵니다!',
    imageUrl: '/onboarding/step3.png',
    gradient: 'bg-[linear-gradient(135deg,_#0EA5E9_0%,_#60A5FA_100%)]',
  },
};
