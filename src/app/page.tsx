'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // 렌더링이 끝난 직후에 실행되도록 useEffect로 감쌉니다.
    const pid = localStorage.getItem(LOCAL_STORAGE_KEYS.PID);

    if (!pid) {
      router.replace('/login');
    } else {
      router.replace('/shorts');
    }
  }, [router]); // router가 의존성 배열에 들어갑니다.

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
