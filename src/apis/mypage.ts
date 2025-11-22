import { instance } from './instance';
import type {
  UserInfoResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from '@/types/mypage';

export const mypageApi = {
  getUserInfo: async (): Promise<UserInfoResponse> => {
    const response = await instance.post('/mypage/info');
    return response.data;
  },

  updateUserInfo: async (data: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse> => {
    const response = await instance.patch('/mypage/update', data);
    return response.data;
  },
};
