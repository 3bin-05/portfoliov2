import { useCallback } from 'react';

// Audio feature removed — this hook is a no-op stub kept for API compatibility.
export function useSound(isLoaded: boolean = true) {
  const playType  = useCallback((_type?: boolean) => {
    void isLoaded;
    void _type;
  }, [isLoaded]);
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
