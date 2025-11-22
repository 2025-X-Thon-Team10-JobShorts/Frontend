'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  Settings,
  Share2,
  MoreHorizontal,
  Grid,
  Heart,
  MapPin,
  Mail,
} from 'lucide-react';
import { MOCK_USER } from '@/mocks/profile';
import { CompanyProfilePage } from '@/components/mypage/CompanyProfilePage';
import { LOCAL_STORAGE_KEYS, type UserRole } from '@/constants/local-storage';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'likes'>('posts');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const user = MOCK_USER;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE) as UserRole | null;
      setUserRole(role);
    }
  }, []);

  // 기업 역할일 때 CompanyProfilePage 표시
  if (userRole === 'COMPANY') {
    return (
      <main className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-md bg-white border-x border-gray-100 shadow-sm min-h-screen flex flex-col">
          <CompanyProfilePage />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* 모바일 컨테이너 (최대 너비 제한) */}
      <div className="w-full max-w-md bg-white border-x border-gray-100 shadow-sm min-h-screen flex flex-col">
        {/* 1. 헤더 */}
        <header className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">프로필</h1>
          <button className="p-1 -mr-2">
            <Settings className="w-6 h-6 text-gray-800" />
          </button>
        </header>

        {/* 2. 프로필 정보 영역 */}
        <section className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* 아바타 */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-200">
              <Image src={user.avatarUrl} alt="User Avatar" fill className="object-cover" />
            </div>

            {/* 스탯 (게시물, 팔로워, 팔로잉) */}
            <div className="flex flex-1 justify-around ml-4 text-center">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">{user.stats.posts}</span>
                <span className="text-xs text-gray-500">게시물</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">{user.stats.followers}</span>
                <span className="text-xs text-gray-500">팔로워</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">{user.stats.following}</span>
                <span className="text-xs text-gray-500">팔로잉</span>
              </div>
            </div>
          </div>

          {/* 이름 및 소개 */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-2">@{user.handle}</p>
            <div className="text-sm text-gray-800 space-y-0.5">
              <p>{user.bio.title}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>{user.bio.location}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="w-3 h-3 text-red-400" />
                <span>비즈니스 문의: {user.bio.email}</span>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              프로필 편집
            </button>
            <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5 text-gray-800" />
            </button>
            <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </section>

        {/* 3. 탭 (게시물 / 좋아요) */}
        <div className="flex border-t border-gray-200 mt-2 sticky top-[57px] bg-white z-10">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center py-3 border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400'
            }`}
          >
            <Grid className="w-6 h-6" />
            <span className="ml-1.5 text-sm font-medium">게시물</span>
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`flex-1 flex items-center justify-center py-3 border-b-2 transition-colors ${
              activeTab === 'likes'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="ml-1.5 text-sm font-medium">좋아요</span>
          </button>
        </div>

        {/* 4. 이미지 그리드 */}
        <section className="flex-1 bg-gray-50">
          {activeTab === 'posts' ? (
            <div className="grid grid-cols-3 gap-0.5">
              {user.posts.map(post => (
                <div
                  key={post.id}
                  className="relative aspect-9/16 bg-gray-200 group cursor-pointer"
                >
                  <Image
                    src={post.imageUrl}
                    alt={`Post ${post.id}`}
                    fill
                    className="object-cover"
                  />

                  {/* Like overlay */}
                  <div className="absolute bottom-0 left-0 p-2 w-full bg-linear-to-t from-black/50 to-transparent">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span className="text-xs font-semibold">{post.likeCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 좋아요 탭 비어있을 때 예시
            <div className="flex flex-col items-center justify-center h-60 text-gray-400">
              <Heart className="w-12 h-12 mb-2 stroke-1" />
              <p className="text-sm">좋아요 표시한 게시물이 없습니다.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
