import { create } from 'zustand';

interface PlaybackState {
  hasInteracted: boolean;
  setHasInteracted: (interacted: boolean) => void;
}

export const usePlaybackStore = create<PlaybackState>(set => ({
  hasInteracted: false,
  setHasInteracted: interacted => set({ hasInteracted: interacted }),
}));
