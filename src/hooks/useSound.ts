import { useCallback } from 'react';

// Audio feature removed — this hook is a no-op stub kept for API compatibility.
export function useSound(_canPlayMusic: boolean = true) {
  const playType  = useCallback((_?: boolean) => {}, []);
  const playClick = useCallback(() => {}, []);
  const toggleMute = useCallback(() => {}, []);

  return {
    isMuted: true,
    volume: 0,
    setIsMuted: () => {},
    setVolume: () => {},
    playType,
    playClick,
    toggleMute,
  };
}
