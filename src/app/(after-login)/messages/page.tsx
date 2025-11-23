'use client';
import { useState } from 'react';
import { ThreadList } from '@/components/messages/ThreadList';
import { MessageThread } from '@/components/messages/MessageThread';
import type { ThreadResponse, MessageResponse } from '@/types/message';

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<ThreadResponse | null>(null);
  const [currentUserPid] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userPid') || 'user_123';
    }
    return 'user_123';
  });

  const handleThreadSelect = (thread: ThreadResponse) => {
    setSelectedThread(thread);
  };

  const handleNewMessage = (message: MessageResponse) => {
    console.log('New message sent:', message);
  };

  const handleBack = () => {
    setSelectedThread(null);
  };

  if (!currentUserPid) {
    return (
      <div className="h-screen max-w-md mx-auto flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen max-w-md mx-auto bg-background">
      {!selectedThread ? (
        <ThreadList
          currentUserPid={currentUserPid}
          onThreadSelect={handleThreadSelect}
        />
      ) : (
        <MessageThread
          thread={selectedThread}
          currentUserPid={currentUserPid}
          onNewMessage={handleNewMessage}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
