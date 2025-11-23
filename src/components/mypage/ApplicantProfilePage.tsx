'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Grid, Heart } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo, type ProfileStat } from './ProfileInfo';
import { ProfileActions } from './ProfileActions';
import type { UserInfoResponse } from '@/types/mypage';

interface Post {
  id: string;
  imageUrl: string;
  likeCount: number;
}

interface ApplicantProfilePageProps {
  profile: UserInfoResponse;
  posts?: Post[];
}

export function ApplicantProfilePage({ profile, posts = [] }: ApplicantProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'likes'>('posts');

  const stats: ProfileStat[] = [
    { label: '게시물', value: posts.length },
    { label: '팔로워', value: '1.2K' },
    { label: '팔로잉', value: 456 },
  ];

  const handleEditProfile = () => {
    console.log('프로필 편집');
  };

  const handleShare = () => {
    console.log('프로필 공유');
  };

  const handleSettings = () => {
    console.log('설정');
  };

  return (
    <>
      <ProfileHeader onBackClick={() => console.log('뒤로가기')} onSettingsClick={handleSettings} />

      <div className="flex-1 overflow-y-auto">
        <ProfileInfo
          avatar={{
            src: profile.profileImageUrl,
            fallback: profile.displayName?.slice(0, 2) || profile.username?.slice(0, 2) || '',

            alt: profile.displayName || profile.username,
          }}
          stats={stats}
          name={profile.displayName || profile.username}
          handle={profile.username}
          bio={{
            description: profile.bio,
            location: '서울',
            email: profile.email,
          }}
          actions={
            <ProfileActions
              primaryAction={{
                label: '프로필 편집',
                onClick: handleEditProfile,
              }}
              showMore={true}
              onShareClick={handleShare}
              onSettingsClick={handleSettings}
              onMoreClick={() => console.log('더 보기')}
            />
          }
        />

        {/* 탭 (게시물 / 좋아요) */}
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

        {/* 콘텐츠 영역 */}
        <section className="flex-1 bg-gray-50">
          {activeTab === 'posts' ? (
            posts.length > 0 ? (
              <div className="grid grid-cols-3 gap-0.5">
                {posts.map(post => (
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
              <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                <Grid className="w-12 h-12 mb-2 stroke-1" />
                <p className="text-sm">게시물이 없습니다.</p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-gray-400">
              <Heart className="w-12 h-12 mb-2 stroke-1" />
              <p className="text-sm">좋아요 표시한 게시물이 없습니다.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
