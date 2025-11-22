import React from 'react';

export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}