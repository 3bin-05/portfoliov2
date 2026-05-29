import { useEffect, useRef, useState } from 'react';
import bgMusic from '../assets/Audio/audio.mp3';

export function useSound(canPlayMusic: boolean = true) {
  const [isMuted, setIsMuted] = useState<boolean>(false); // Always start unmuted
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

  // Synthesize mechanical keyboard typing sound (thock + clack)
  const playType = (isKeystroke?: boolean) => {
    if (isMuted) return;
    if (isKeystroke !== true) return;
    const ctx = initAudio();
    if (!ctx) return;

    const time = ctx.currentTime;
    
    // Main "thock" - low pitch sine wave
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    // Randomize pitch slightly for organic variation
    const baseFreq = 120 + Math.random() * 40;
    osc.frequency.setValueAtTime(baseFreq, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.08);
    
    oscGain.gain.setValueAtTime(volume * 0.5, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    // Main "clack" - high pass filtered noise
    const bufferSize = ctx.sampleRate * 0.02; // 20ms of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000 + Math.random() * 1000, time);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.15, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.08);
    
    noise.start(time);
    noise.stop(time + 0.02);
  };

  // Synthesize clean mouse click (soft metal/plastic tick)
  const playClick = () => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;

    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, time);
    osc.frequency.exponentialRampToValueAtTime(300, time + 0.03);
    
    gainNode.gain.setValueAtTime(volume * 0.25, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.03);
  };

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
