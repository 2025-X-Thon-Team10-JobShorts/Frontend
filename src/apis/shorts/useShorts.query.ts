import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';
import { Shorts } from './dto.types';
import { ShortsSchema } from './dto.schemas';

async function fetchShorts({ shortsId }: { shortsId: number }) {
  const res = await instance.get<Shorts>(`/api/short-forms/${shortsId}`);
  const parsed = ShortsSchema.safeParse(res.data);
  if (!parsed.success) {
    throw new Error(`숏츠 단일조회(${shortsId}) 쿼리 응답 파싱 실패, 타입이 일치하지 않습니다.`);
  }

  return parsed.data;
}

export function useShorts(shortsId?: number) {
  return useQuery<Shorts>({
    queryKey: ['short-form', shortsId],
    queryFn: () => fetchShorts({ shortsId: shortsId as number }),
    enabled: typeof shortsId === 'number',
  });
}
