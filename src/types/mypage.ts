export type UserRole = 'APPLICANT' | 'COMPANY';

export interface BaseUserInfo {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoResponse extends BaseUserInfo {
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface CompanyInfoResponse extends BaseUserInfo {
  role: 'COMPANY';
  companyName: string;
  location?: string;
  website?: string;
  contactEmail?: string;
  stats: {
    jobPostings: number;
    followers: number;
    bookmarked: number;
  };
}

export interface UpdateUserInfoRequest {
  username?: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  companyName?: string;
  location?: string;
  website?: string;
  contactEmail?: string;
}

export interface UpdateUserInfoResponse extends BaseUserInfo {
  success: boolean;
}

export interface UserPost {
  id: string;
  imageUrl: string;
  likeCount: number;
  caption?: string;
  createdAt: string;
}

export interface UserPostsResponse {
  posts: UserPost[];
  total: number;
}