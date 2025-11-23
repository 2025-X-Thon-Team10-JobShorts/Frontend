export interface Thread {
  id: number;
  participant1Pid: string;
  participant2Pid: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  threadId: number;
  senderPid: string;
  content: string;
  createdAt: string;
  readAt?: string;
}

export interface CreateThreadRequest {
  otherUserPid: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface ThreadListRequest {
  page?: number;
  size?: number;
}

export interface MessageResponse {
  id: number;
  threadId: number;
  senderPid: string;
  content: string;
  createdAt: string;
  readAt?: string;
}

export interface ThreadResponse {
  id: number;
  participant1Pid: string;
  participant2Pid: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: MessageResponse;
  unreadCount: number;
}

export interface ThreadMessagesResponse {
  thread: ThreadResponse;
  messages: MessageResponse[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

