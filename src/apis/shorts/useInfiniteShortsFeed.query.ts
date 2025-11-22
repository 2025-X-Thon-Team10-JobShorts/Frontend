import { instance } from '../instance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ShortsFeedResponse } from './dto.types';
import { ShortsFeedResponseSchema } from './dto.schemas';

const PAGE_SIZE = 10;

async function fetchShortsFeed({ pageParam, pid }: { pageParam?: string | null; pid: string }) {
  const params = new URLSearchParams();
  params.append('size', String(PAGE_SIZE));
  if (pageParam) params.append('pageParam', pageParam);
  if (!pid) {
    throw new Error('PID가 제공되지 않았습니다.');
  }
  params.append('currentUserPid', pid);

  const res = await instance.get<ShortsFeedResponse>('/api/short-forms/feed', {
    params,
  });
  const parsed = ShortsFeedResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    throw new Error('숏츠 무한스크롤 쿼리 응답 파싱 실패, 타입이 일치하지 않습니다.');
  }

  return parsed.data;
}

export function useInfiniteShortsFeed(pid: string | null) {
  return useInfiniteQuery<ShortsFeedResponse>({
    queryKey: ['short-form-feed', pid],
    queryFn: ({ pageParam, queryKey }) =>
      fetchShortsFeed({ pageParam: pageParam as string | null, pid: queryKey[1] as string }),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNextPage ? lastPage.nextPageParam : undefined),
  });
}
