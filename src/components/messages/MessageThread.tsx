'use client';
import { useState, useEffect, useRef } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon, Heart, Send, ChevronLeft } from 'lucide-react';
import { messageApi } from '@/apis/message';
import type { ThreadResponse, MessageResponse, ThreadMessagesResponse } from '@/types/message';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageThreadProps {
  thread: ThreadResponse;
  currentUserPid: string;
  onNewMessage?: (message: MessageResponse) => void;
  onBack?: () => void;
}

export const MessageThread = ({ thread, currentUserPid, onNewMessage, onBack }: MessageThreadProps) => {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const data: ThreadMessagesResponse = await messageApi.getThreadMessages(thread.id);
        setMessages(data.messages);
      } catch (err) {
        console.error('Messages load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [thread.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const sentMessage = await messageApi.sendMessage(thread.id, {
        content: newMessage.trim()
      });
      
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
      
      if (onNewMessage) {
        onNewMessage(sentMessage);
      }
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = () => {
    return thread.participant1Pid === currentUserPid 
      ? thread.participant2Pid 
      : thread.participant1Pid;
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col h-screen">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-background">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Button 
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="relative flex-shrink-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={getOtherParticipant()} />
                <AvatarFallback>{getOtherParticipant().slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate">{getOtherParticipant()}</h2>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-background">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button 
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="relative flex-shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt={getOtherParticipant()} />
              <AvatarFallback>{getOtherParticipant().slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate">{getOtherParticipant()}</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-4 bg-background">
        <div className="space-y-3">
          {messages.map((message, index) => {
            const isMyMessage = message.senderPid === currentUserPid;
            const showTime = index === 0 || 
              new Date(messages[index - 1].createdAt).getTime() - new Date(message.createdAt).getTime() > 600000;

            return (
              <div key={message.id}>
                {showTime && (
                  <div className="text-center text-xs text-muted-foreground my-4">
                    {formatTime(message.createdAt)}
                  </div>
                )}
                <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-3xl ${
                      isMyMessage
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-background text-foreground'
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="px-4 py-3 border-t border-border bg-background">
        <form onSubmit={handleSendMessage}>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all">
              <Button type="button" variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent flex-shrink-0">
                <Smile className="w-5 h-5 text-muted-foreground" />
              </Button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none min-w-0"
                disabled={sending}
              />
              <Button type="button" variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent flex-shrink-0">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            
            {newMessage.trim() ? (
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-transparent flex-shrink-0"
                disabled={sending}
              >
                <Send className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="text-destructive hover:bg-transparent flex-shrink-0"
              >
                <Heart className="w-6 h-6" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};