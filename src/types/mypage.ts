export interface UserInfoResponse {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInfoRequest {
  username?: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
}

export interface UpdateUserInfoResponse {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  updatedAt: string;
}