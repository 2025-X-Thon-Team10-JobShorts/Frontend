import { instance } from './instance';
import type {
  CreateThreadRequest,
  SendMessageRequest,
  ThreadListRequest,
  ThreadResponse,
  ThreadMessagesResponse,
  MessageResponse,
} from '@/types/message';

export const messageApi = {
  getThreads: async (params?: ThreadListRequest): Promise<ThreadResponse[]> => {
    const response = await instance.get('/api/messages/threads', { params });
    return response.data;
  },

  createThread: async (data: CreateThreadRequest): Promise<ThreadResponse> => {
    const response = await instance.post('/api/messages/threads', data);
    return response.data;
  },

  getThreadMessages: async (threadId: number): Promise<ThreadMessagesResponse> => {
    const response = await instance.get(`/api/messages/threads/${threadId}`);
    return response.data;
  },

  sendMessage: async (threadId: number, data: SendMessageRequest): Promise<MessageResponse> => {
    const response = await instance.post(`/api/messages/threads/${threadId}/messages`, data);
    return response.data;
  },
};