import { Share2, Settings, MoreHorizontal } from 'lucide-react';

interface ProfileActionsProps {
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  showShare?: boolean;
  showSettings?: boolean;
  showMore?: boolean;
  onShareClick?: () => void;
  onSettingsClick?: () => void;
  onMoreClick?: () => void;
}

export function ProfileActions({
  primaryAction = {
    label: '프로필 편집',
    onClick: () => {},
  },
  showShare = true,
  showSettings = true,
  showMore = false,
  onShareClick,
  onSettingsClick,
  onMoreClick,
}: ProfileActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </button>
      
      {showShare && (
        <button
          className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onShareClick}
        >
          <Share2 className="w-5 h-5 text-gray-800" />
        </button>
      )}
      
      {showSettings && (
        <button
          className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onSettingsClick}
        >
          <Settings className="w-5 h-5 text-gray-800" />
        </button>
      )}
      
      {showMore && (
        <button
          className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onMoreClick}
        >
          <MoreHorizontal className="w-5 h-5 text-gray-800" />
        </button>
      )}
    </div>
  );
}