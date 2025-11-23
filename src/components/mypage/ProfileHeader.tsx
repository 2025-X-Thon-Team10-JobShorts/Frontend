import { ChevronLeft, Settings } from 'lucide-react';

interface ProfileHeaderProps {
  title?: string;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
}

export function ProfileHeader({
  title = '프로필',
  onBackClick,
  onSettingsClick,
}: ProfileHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <button className="p-1 -ml-2" onClick={onBackClick}>
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <h1 className="text-lg font-extrabold text-gray-900">{title}</h1>
      <button className="p-1 -mr-2" onClick={onSettingsClick}>
        <Settings className="w-6 h-6 text-gray-800" />
      </button>
    </header>
  );
}