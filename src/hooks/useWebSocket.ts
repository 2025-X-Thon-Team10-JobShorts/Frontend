'use client';
import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '@/types/message';

interface UseWebSocketProps {
  currentUserPid: string;
  onMessageReceived?: (message: WebSocketMessage) => void;
  onMessageRead?: (data: { messageId: number; readByUserPid: string }) => void;
}

export const useWebSocket = ({ currentUserPid, onMessageReceived, onMessageRead }: UseWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscribedThreadId, setSubscribedThreadId] = useState<number | null>(null);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/messages';
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'INIT',
        currentUserPid
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        
        if (data.type === 'MESSAGE_CREATED' && onMessageReceived) {
          onMessageReceived(data);
        } else if (data.type === 'MESSAGE_READ' && onMessageRead && data.readMessageId && data.readByUserPid) {
          onMessageRead({
            messageId: data.readMessageId,
            readByUserPid: data.readByUserPid
          });
        }
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setSubscribedThreadId(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [currentUserPid, onMessageReceived, onMessageRead]);

  const subscribeToThread = (threadId: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && subscribedThreadId !== threadId) {
      wsRef.current.send(JSON.stringify({
        type: 'SUBSCRIBE',
        threadId
      }));
      setSubscribedThreadId(threadId);
    }
  };

  return {
    isConnected,
    subscribeToThread,
    subscribedThreadId
  };
};