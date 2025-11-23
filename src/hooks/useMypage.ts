'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mypageApi } from '@/apis/mypage';
import { queryKeys } from '@/constants/query-keys';
import type { UserInfoResponse, CompanyInfoResponse, UpdateUserInfoRequest } from '@/types/mypage';
import type { Applicant } from '@/types/company';

export const useUserInfo = (pid: string) => {
  return useQuery({
    queryKey: queryKeys.mypage.userInfo(),
    queryFn: () => mypageApi.getUserInfo(pid),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useUserPosts = (userId = 'mypage', pid: string) => {
  return useQuery({
    queryKey: queryKeys.mypage.userPosts(userId),
    queryFn: () => mypageApi.getUserPosts(pid),
    staleTime: 1000 * 60 * 2, // 2분
  });
};

export const useCompanyProfile = (companyId: string) => {
  return useQuery({
    queryKey: queryKeys.mypage.companyProfile(companyId),
    queryFn: () => mypageApi.getCompanyProfile(companyId),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useBookmarkedApplicants = (companyId: string) => {
  return useQuery({
    queryKey: queryKeys.mypage.bookmarkedApplicants(companyId),
    queryFn: () => mypageApi.getBookmarkedApplicants(companyId),
    staleTime: 1000 * 60 * 3, // 3분
  });
};

export const useUpdateUserInfo = (pid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInfoRequest) => mypageApi.updateUserInfo(data, pid),
    onSuccess: data => {
      queryClient.setQueryData(queryKeys.mypage.userInfo(), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.all });
    },
  });
};

export const useToggleBookmark = (pid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicantId: string) => mypageApi.toggleBookmarkApplicant(applicantId, pid),
    onSuccess: (_, applicantId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mypage.bookmarkedApplicants(),
      });

      const bookmarkedData = queryClient.getQueryData<Applicant[]>(
        queryKeys.mypage.bookmarkedApplicants(),
      );

      if (bookmarkedData) {
        const updatedData = bookmarkedData.map(applicant =>
          applicant.id === applicantId
            ? { ...applicant, isBookmarked: !applicant.isBookmarked }
            : applicant,
        );

        queryClient.setQueryData(queryKeys.mypage.bookmarkedApplicants(), updatedData);
      }
    },
  });
};

export const useMypage = (pid: string) => {
  const userInfoQuery = useUserInfo(pid);
  const updateUserMutation = useUpdateUserInfo(pid);

  const isCompany = (
    user: UserInfoResponse | CompanyInfoResponse | undefined,
  ): user is CompanyInfoResponse => {
    return user?.role === 'COMPANY';
  };

  const isApplicant = (
    user: UserInfoResponse | CompanyInfoResponse | undefined,
  ): user is UserInfoResponse => {
    return user?.role === 'APPLICANT';
  };

  return {
    user: userInfoQuery.data,
    isLoading: userInfoQuery.isLoading,
    error: userInfoQuery.error,
    isCompany: isCompany(userInfoQuery.data),
    isApplicant: isApplicant(userInfoQuery.data),
    refetch: userInfoQuery.refetch,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    updateError: updateUserMutation.error,
  };
};
