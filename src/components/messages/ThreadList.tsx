'use client';
import { useState, useEffect } from 'react';
import { Search, Edit } from 'lucide-react';
import { messageApi } from '@/apis/message';
import type { ThreadResponse } from '@/types/message';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface ThreadListProps {
  currentUserPid: string;
  onThreadSelect: (thread: ThreadResponse) => void;
}

export const ThreadList = ({ currentUserPid, onThreadSelect }: ThreadListProps) => {
  const [threads, setThreads] = useState<ThreadResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await messageApi.getThreads();
        setThreads(data);
      } catch (err) {
        setError('스레드 목록을 불러오는데 실패했습니다.');
        console.error('Thread list error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadThreads();
  }, []);

  const getOtherParticipant = (thread: ThreadResponse) => {
    return thread.participant1Pid === currentUserPid 
      ? thread.participant2Pid 
      : thread.participant1Pid;
  };

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col h-screen bg-background">
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl">your_username</h1>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-input-background border-0 h-9"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col h-screen bg-background">
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl">your_username</h1>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-input-background border-0 h-9"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-destructive">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-screen bg-background">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl">your_username</h1>
          <Button variant="ghost" size="icon">
            <Edit className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-input-background border-0 h-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2>Messages</h2>
          <Button variant="ghost" size="sm" className="text-primary h-auto p-0">
            Requests
          </Button>
        </div>
        
        {threads.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground">
            <p>메시지가 없습니다.</p>
          </div>
        ) : (
          threads.map((thread) => {
            const otherParticipant = getOtherParticipant(thread);
            const hasUnread = thread.unreadCount > 0;
            
            return (
              <button
                key={thread.id}
                onClick={() => onThreadSelect(thread)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent transition-colors active:bg-accent/80"
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="" alt={otherParticipant} />
                    <AvatarFallback>{otherParticipant.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={hasUnread ? 'font-semibold' : 'font-normal'}>
                      {otherParticipant}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(thread.updatedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${
                      hasUnread ? 'text-foreground font-medium' : 'text-muted-foreground font-normal'
                    }`}>
                      {thread.lastMessage?.content || 'No messages yet'}
                    </p>
                    {hasUnread && (
                      <Badge className="ml-auto flex-shrink-0 h-5 min-w-[20px] px-1.5 text-xs bg-primary">
                        {thread.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </ScrollArea>
    </div>
  );
};