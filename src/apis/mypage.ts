import { instance } from './instance';
import type {
  UserInfoResponse,
  CompanyInfoResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UserPostsResponse,
} from '@/types/mypage';
import type { BookmarkedApplicantsResponse, BookmarkToggleResponse } from '@/types/company';

export const mypageApi = {
  getUserInfo: async (pid: string): Promise<UserInfoResponse | CompanyInfoResponse> => {
    const params = new URLSearchParams();
    params.append('pid', pid);
    const response = await instance.get('/mypage/info', { params });
    return response.data;
  },

  updateUserInfo: async (
    data: UpdateUserInfoRequest,
    pid: string,
  ): Promise<UpdateUserInfoResponse> => {
    const params = new URLSearchParams();
    params.append('pid', pid);
    const response = await instance.patch('/mypage/update', data, { params });
    return response.data;
  },

  getUserPosts: async (pid: string): Promise<UserPostsResponse> => {
    const params = new URLSearchParams();
    params.append('pid', pid);
    const response = await instance.get('/mypage/posts', { params });
    return response.data;
  },

  getBookmarkedApplicants: async (
    companyPid: string,
    page = 1,
    limit = 20,
  ): Promise<BookmarkedApplicantsResponse> => {
    const params = new URLSearchParams();
    params.append('companyPid', companyPid);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    const response = await instance.get('/mypage/bookmarked', { params });
    return response.data;
  },

  toggleBookmarkApplicant: async (
    applicantId: string,
    companyPid: string,
  ): Promise<BookmarkToggleResponse> => {
    const params = new URLSearchParams();
    params.append('companyPid', companyPid);
    const response = await instance.post(`/mypage/bookmark/${applicantId}`, null, { params });
    return response.data;
  },

  getCompanyProfile: async (companyPid: string): Promise<CompanyInfoResponse> => {
    const response = await instance.post(`/company/page/`, { companyPid });
    return response.data;
  },
};
