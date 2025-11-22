'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

import type { Short } from '@/data/shorts';
import { usePlaybackStore } from '@/stores/playback.store';

interface ShortsPlayerProps {
  short: Short;
  isActive: boolean;
}

export interface ShortsPlayerRef {
  play: () => void;
  pause: () => void;
}

function ShortsPlayerInner(
  { short, isActive }: ShortsPlayerProps,
  ref: React.Ref<ShortsPlayerRef>,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { hasInteracted, setHasInteracted } = usePlaybackStore();

  const play = useCallback(() => {
    videoRef.current?.play();
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    setIsPaused(true);
  }, []);

  useImperativeHandle(ref, () => ({ play, pause }));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && hasInteracted) {
      video.play(); // DOM API 직접 호출
    } else {
      video.pause(); // DOM API 직접 호출
      video.currentTime = 0;
    }
  }, [isActive, hasInteracted]);

  const handleVideoClick = () => {
    if (!hasInteracted) setHasInteracted(true);
    if (isPaused) play();
    else pause();
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={short.videoUrl}
        className="w-full h-full object-contain"
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onEnded={() => {
          setIsPaused(true);
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
          }
        }}
      />

      {/* 플레이 버튼 오버레이 */}
      <div
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
        onClick={handleVideoClick}
      >
        {isPaused && (
          <div className="text-6xl text-white bg-black bg-opacity-50 rounded-full p-4">
            <FaPlay />
          </div>
        )}
      </div>

      {/* 텍스트 오버레이 */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-black bg-opacity-50">
        <h3 className="text-lg font-bold">{short.title}</h3>
        <p className="text-sm">{short.description}</p>
        <p className="text-xs">By {short.author}</p>
      </div>
    </div>
  );
}

export const ShortsPlayer = forwardRef(ShortsPlayerInner);
ShortsPlayer.displayName = 'ShortsPlayer';
