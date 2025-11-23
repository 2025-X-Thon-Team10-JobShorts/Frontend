import { ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Mail } from 'lucide-react';

export interface ProfileStat {
  label: string;
  value: string | number;
}

interface ProfileInfoProps {
  avatar: {
    src?: string;
    fallback: string;
    alt?: string;
  };
  stats: ProfileStat[];
  name: string;
  handle?: string;
  bio?: {
    description?: string;
    location?: string;
    email?: string;
  };
  actions: ReactNode;
}

export function ProfileInfo({
  avatar,
  stats,
  name,
  handle,
  bio,
  actions,
}: ProfileInfoProps) {
  return (
    <section className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        {/* 아바타 */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-200">
          <Avatar className="h-full w-full rounded-full">
            <AvatarImage src={avatar.src} alt={avatar.alt || name} />
            <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* 통계 */}
        <div className="flex flex-1 justify-around ml-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-bold text-lg text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 이름 및 소개 */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>
        {handle && (
          <p className="text-sm text-gray-500 mb-2">@{handle}</p>
        )}
        {bio && (
          <div className="text-sm text-gray-800 space-y-0.5">
            {bio.description && <p>{bio.description}</p>}
            {bio.location && (
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>{bio.location}</span>
              </div>
            )}
            {bio.email && (
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="w-3 h-3 text-red-400" />
                <span>비즈니스 문의: {bio.email}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 액션 버튼들 */}
      {actions}
    </section>
  );
}