// Footer 여부에 따라 pb 조정 필요
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { DONT_SHOW_FOOTER_PATHS } from '@/constants/footer';

export default function FooterPad({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  // Footer가 없는 경로라면 패딩을 주지 않음
  if (DONT_SHOW_FOOTER_PATHS.includes(pathname)) {
    return <main className={className}>{children}</main>;
  }

  return <main className={`pb-14 ${className}`}>{children}</main>;
}
