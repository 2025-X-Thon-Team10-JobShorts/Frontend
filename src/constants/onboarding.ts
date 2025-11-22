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
    title: '당신의 잠재력을 표현',
    description: '15초와 30초 사이\n당신을 보여주세요!',
    imageUrl: '/onboarding/step1.png',
    gradient: 'bg-[linear-gradient(135deg,_#38BDF8_0%,_#93C5FD_100%)]',
  },
  step2: {
    title: '숏폼 컨텐츠로 채용',
    description: '수많은 지원서에서 탈출하세요.',
    imageUrl: '/onboarding/step2.png',
    gradient: 'bg-[linear-gradient(135deg,_#7DD3FC_0%,_#BAE6FD_100%)]',
  },
  step3: {
    title: '빠르게 일해봅시다',
    description: '지금 당장\n잡으숏에 참여하세요!',
    imageUrl: '/onboarding/step3.png',
    gradient: 'bg-[linear-gradient(135deg,_#0EA5E9_0%,_#60A5FA_100%)]',
  },
};
