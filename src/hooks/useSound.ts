import { useEffect, useRef, useState } from 'react';
import bgMusic from '../assets/Audio/audio.mp3';

export function useSound(canPlayMusic: boolean = true) {
  const [isMuted, setIsMuted] = useState<boolean>(true); // Always start muted
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('sound_volume');
    return saved ? parseFloat(saved) : 0.4;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Initialize background music once on mount
  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Sync playing state and volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume * 0.3; // subtle background level

    if (isMuted || !canPlayMusic) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Playback prevented, waiting for user interaction:", err);
          
          const startPlayback = () => {
            if (!isMutedRef.current && audioRef.current) {
              audioRef.current.play().catch(e => console.log("Failed to play on interaction:", e));
            }
            window.removeEventListener('click', startPlayback);
            window.removeEventListener('keydown', startPlayback);
            window.removeEventListener('scroll', startPlayback);
          };
          
          window.addEventListener('click', startPlayback);
          window.addEventListener('keydown', startPlayback);
          window.addEventListener('scroll', startPlayback);
        });
      }
    }
  }, [isMuted, volume, canPlayMusic]);


  // Initialize AudioContext lazily on first user interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    localStorage.setItem('sound_muted', String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('sound_volume', String(volume));
  }, [volume]);

  // Sound effects removed as per user request
  const playType = (isKeystroke?: boolean) => {};
  const playClick = () => {};

  return {
    isMuted,
    volume,
    setIsMuted,
    setVolume,
    playType,
    playClick,
    toggleMute: () => setIsMuted((m) => !m),
  };
}
