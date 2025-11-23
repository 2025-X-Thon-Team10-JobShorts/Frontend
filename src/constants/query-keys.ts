export const queryKeys = {
  mypage: {
    all: ['mypage'] as const,
    userInfo: () => [...queryKeys.mypage.all, 'userInfo'] as const,
    companyProfile: (companyId?: string) => 
      [...queryKeys.mypage.all, 'company', companyId] as const,
    bookmarkedApplicants: (companyId?: string) => 
      [...queryKeys.mypage.all, 'bookmarked', companyId] as const,
    userPosts: (userId?: string) => 
      [...queryKeys.mypage.all, 'posts', userId] as const,
  },
};
