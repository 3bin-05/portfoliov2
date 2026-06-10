import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

// Retro Pixel Art Sprites
const SPRITES = {
  dino: {
    stand: [
      "            ########",
      "           ##########",
      "           #### ### #",
      "           ##########",
      "           ###       ",
      "           ########  ",
      "##        #########  ",
      "###      ##########  ",
      "####    ###########  ",
      " ##################  ",
      "  ################   ",
      "   ##############    ",
      "    ############     ",
      "     ##########      ",
      "      #### ####      ",
      "      ###   ###      ",
      "      ##     ##      "
    ],
    walk1: [
      "            ########",
      "           ##########",
      "           #### ### #",
      "           ##########",
      "           ###       ",
      "           ########  ",
      "##        #########  ",
      "###      ##########  ",
      "####    ###########  ",
      " ##################  ",
      "  ################   ",
      "   ##############    ",
      "    ############     ",
      "     ##########      ",
      "      ####  ###      ",
      "      ##     ##      ",
      "      ###            "
    ],
    walk2: [
      "            ########",
      "           ##########",
      "           #### ### #",
      "           ##########",
      "           ###       ",
      "           ########  ",
      "##        #########  ",
      "###      ##########  ",
      "####    ###########  ",
      " ##################  ",
      "  ################   ",
      "   ##############    ",
      "    ############     ",
      "     ##########      ",
      "      ###  ####      ",
      "      ##     ##      ",
      "             ###     "
    ],
    duck1: [
      "                #############",
      "               ###############",
      "               ##### ### ####",
      "               ##############",
      "               ###   ###     ",
      "####################         ",
      "###################          ",
      " #################           ",
      "  ###############            ",
      "   #############             ",
      "    ####  ####               ",
      "    ##     ###               "
    ],
    duck2: [
      "                #############",
      "               ###############",
      "               ##### ### ####",
      "               ##############",
      "               ###   ###     ",
      "####################         ",
      "###################          ",
      " #################           ",
      "  ###############            ",
      "   #############             ",
      "    ###   ####               ",
      "    ###    ##                "
    ],
    crashed: [
      "            ########",
      "           ##########",
      "           #### # # #",
      "           ##########",
      "           ###       ",
      "           ########  ",
      "##        #########  ",
      "###      ##########  ",
      "####    ###########  ",
      " ##################  ",
      "  ################   ",
      "   ##############    ",
      "    ############     ",
      "     ##########      ",
      "      #### ####      ",
      "      ###   ###      ",
      "      ##     ##      "
    ]
  },
  cactus: {
    small: [
      "   ###   ",
      "   ###   ",
      " # ### # ",
      " # ### # ",
      " ####### ",
      "  #####  ",
      "   ###   ",
      "   ###   ",
      "   ###   ",
      "   ###   ",
      "   ###   ",
      "   ###   ",
      "   ###   "
    ],
    large: [
      "    ####    ",
      "    ####    ",
      "  # #### #  ",
      " ## #### ## ",
      " ########## ",
      "  ########  ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    ",
      "    ####    "
    ]
  },
  bird: {
    up: [
      "      ###       ",
      "     #####      ",
      "   #########    ",
      " #############  ",
      " ###########    ",
      "  window.       ", // placeholder replacement for width
      "  #########     ",
      "    #####       ",
      "     ###        ",
      "     ##         "
    ],
    down: [
      "     ##         ",
      "     ###        ",
      "    #####       ",
      "  #########     ",
      " ###########    ",
      " #############  ",
      "   #########    ",
      "     #####      ",
      "      ###       "
    ]
  }
};

// Fix the placeholder inside bird.up
SPRITES.bird.up[5] = "  #########     ";

interface Obstacle {
  id: number;
  type: 'cactus_small' | 'cactus_large' | 'cactus_double_small' | 'cactus_double_large' | 'bird';
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  speed: number;
  scale: number;
}

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Game States: 'idle' | 'playing' | 'crashed'
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'crashed'>('idle');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('dino_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Game Loop References (to avoid closure stale state in requestAnimationFrame)
  const stateRef = useRef({
    gameState: 'idle' as 'idle' | 'playing' | 'crashed',
    score: 0,
    dinoY: 136, // groundY (170) - dinoHeight standing (34)
    dinoVy: 0,
    isDucking: false,
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    gameSpeed: 6.5,
    frameCount: 0,
    lastObstacleSpawnFrame: 0,
    milestoneCount: 1,
    groundOffset: 0,
  });

  // Keep stateRef synced with gameState react state
  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  // Audio synthesis helper
  const triggerSound = (type: 'jump' | 'milestone' | 'crash') => {
    if (isAudioMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const time = ctx.currentTime;

      if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, time);
        osc.frequency.exponentialRampToValueAtTime(900, time + 0.1);
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.1);
      } else if (type === 'milestone') {
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(950, time);
        gain1.gain.setValueAtTime(0.12, time);
        gain1.gain.setValueAtTime(0.12, time + 0.07);
        gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(time);
        osc1.stop(time + 0.14);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1180, time + 0.1);
        gain2.gain.setValueAtTime(0.12, time + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(time + 0.1);
        osc2.stop(time + 0.24);
      } else if (type === 'crash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, time);
        osc.frequency.linearRampToValueAtTime(60, time + 0.45);
        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, time);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.45);
      }
    } catch (e) {
      // Audio blocked or unsupported
    }
  };

  // Start / Restart Game Core
  const startGame = () => {
    const state = stateRef.current;
    state.gameState = 'playing';
    state.score = 0;
    state.dinoY = 136;
    state.dinoVy = 0;
    state.isDucking = false;
    state.obstacles = [];
    state.gameSpeed = 6.5;
    state.frameCount = 0;
    state.lastObstacleSpawnFrame = 0;
    state.milestoneCount = 1;
    setScore(0);
    setGameState('playing');
    triggerSound('jump');
  };

  // Ducking state controllers
  const setDucking = (duck: boolean) => {
    const state = stateRef.current;
    if (state.gameState !== 'playing') return;
    
    if (duck) {
      state.isDucking = true;
      // If jumping, fast-fall
      if (state.dinoY < 136) {
        state.dinoVy += 2.5; 
      }
    } else {
      state.isDucking = false;
    }
  };

  const jump = () => {
    const state = stateRef.current;
    if (state.gameState === 'idle' || state.gameState === 'crashed') {
      startGame();
      return;
    }
    // Only jump if on ground
    if (state.dinoY >= 136 && !state.isDucking) {
      state.dinoVy = -11.5;
      triggerSound('jump');
    }
  };

  // Keyboard input handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only block keys and handle commands if browser focus is near or on the game
      const isTargetingGame = isFocused || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown';
      if (!isTargetingGame) return;

      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setDucking(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setDucking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isFocused]);

  // Click / touch to focus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Main Canvas Render and Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    // Helper to draw pixel art sprites
    const drawPixelArt = (
      sprite: string[],
      x: number,
      y: number,
      pixelSize: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      for (let r = 0; r < sprite.length; r++) {
        const rowString = sprite[r];
        for (let c = 0; c < rowString.length; c++) {
          if (rowString[c] === '#') {
            ctx.fillRect(
              Math.round(x + c * pixelSize),
              Math.round(y + r * pixelSize),
              pixelSize,
              pixelSize
            );
          }
        }
      }
    };

    // Main update/render frame
    const tick = () => {
      const state = stateRef.current;
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#FFFFFF';
      const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#8C8C8C';
      const borderThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || 'rgba(255,255,255,0.08)';

      // Clear canvas
      ctx.clearRect(0, 0, 600, 200);

      // Render Clouds
      state.clouds.forEach((cloud) => {
        if (state.gameState === 'playing') {
          cloud.x -= cloud.speed;
        }
        
        // Draw cloud
        ctx.fillStyle = secondaryColor + '20'; // semi-transparent
        ctx.beginPath();
        const cx = cloud.x;
        const cy = cloud.y;
        const s = cloud.scale;
        ctx.arc(cx, cy, 10 * s, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(cx + 10 * s, cy - 8 * s, 10 * s, Math.PI * 1.0, Math.PI * 1.85);
        ctx.arc(cx + 22 * s, cy - 6 * s, 10 * s, Math.PI * 1.3, Math.PI * 2.0);
        ctx.arc(cx + 30 * s, cy, 10 * s, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
      });

      // Remove offscreen clouds
      state.clouds = state.clouds.filter((c) => c.x > -100);
      
      // Spawn Clouds
      if (state.frameCount % 240 === 0 && Math.random() < 0.6) {
        state.clouds.push({
          id: Math.random(),
          x: 650,
          y: 30 + Math.random() * 60,
          speed: 0.3 + Math.random() * 0.4,
          scale: 0.7 + Math.random() * 0.6,
        });
      }

      // Physics and state updates when playing
      if (state.gameState === 'playing') {
        state.frameCount++;

        // Increase score
        state.score += 0.15;
        const integerScore = Math.floor(state.score);
        setScore(integerScore);

        // Milestone score flash & sound
        if (integerScore > 0 && integerScore % 100 === 0) {
          const milestoneIdx = integerScore / 100;
          if (state.milestoneCount === milestoneIdx) {
            triggerSound('milestone');
            state.milestoneCount++;
          }
        }

        // Increase game speed slightly
        state.gameSpeed = Math.min(15, 6.5 + (state.score / 150));

        // Ground offset scroll animation
        state.groundOffset = (state.groundOffset + state.gameSpeed) % 600;

        // Dino Physics (gravity)
        state.dinoVy += 0.6; // Gravity constant
        state.dinoY += state.dinoVy;

        const maxDinoY = state.isDucking ? 146 : 136; // standing height (34) vs ducking height (24)
        if (state.dinoY >= maxDinoY) {
          state.dinoY = maxDinoY;
          state.dinoVy = 0;
        }

        // Move Obstacles
        state.obstacles.forEach((obs) => {
          obs.x -= state.gameSpeed;
        });

        // Clean off-screen obstacles
        state.obstacles = state.obstacles.filter((obs) => obs.x > -obs.width);

        // Spawn Obstacles
        const framesSinceLastSpawn = state.frameCount - state.lastObstacleSpawnFrame;
        const minDistanceBetweenObstacles = 150 + (state.gameSpeed * 12);
        
        if (framesSinceLastSpawn > 55 && Math.random() < 0.02 && (state.obstacles.length === 0 || 600 - state.obstacles[state.obstacles.length - 1].x > minDistanceBetweenObstacles)) {
          // Select obstacle type
          const obstacleTypes: Obstacle['type'][] = ['cactus_small', 'cactus_large', 'cactus_double_small', 'cactus_double_large'];
          // Only spawn birds if score > 150
          if (state.score > 150) {
            obstacleTypes.push('bird');
          }

          const chosenType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          let newObs: Obstacle;

          if (chosenType === 'bird') {
            // Birds fly at different altitudes
            const altitudes = [80, 115, 140]; // high, medium, low
            const chosenAlt = altitudes[Math.floor(Math.random() * altitudes.length)];
            newObs = {
              id: Math.random(),
              type: 'bird',
              x: 620,
              y: chosenAlt,
              width: 34,
              height: 18,
              speed: state.gameSpeed,
            };
          } else if (chosenType === 'cactus_small') {
            newObs = {
              id: Math.random(),
              type: 'cactus_small',
              x: 620,
              y: 144, // 170 - 26 (cactus small height)
              width: 18,
              height: 26,
              speed: state.gameSpeed,
            };
          } else if (chosenType === 'cactus_double_small') {
            newObs = {
              id: Math.random(),
              type: 'cactus_double_small',
              x: 620,
              y: 144,
              width: 32,
              height: 26,
              speed: state.gameSpeed,
            };
          } else if (chosenType === 'cactus_large') {
            newObs = {
              id: Math.random(),
              type: 'cactus_large',
              x: 620,
              y: 140, // 170 - 30 (cactus large height)
              width: 24,
              height: 30,
              speed: state.gameSpeed,
            };
          } else { // cactus_double_large
            newObs = {
              id: Math.random(),
              type: 'cactus_double_large',
              x: 620,
              y: 140,
              width: 44,
              height: 30,
              speed: state.gameSpeed,
            };
          }

          state.obstacles.push(newObs);
          state.lastObstacleSpawnFrame = state.frameCount;
        }

        // Collision Check
        const dinoW = state.isDucking ? 58 : 40;
        const dinoH = state.isDucking ? 24 : 34;
        const dinoBox = {
          x: 40 + 4, // insets for fair gameplay feel
          y: state.dinoY + 2,
          w: dinoW - 8,
          h: dinoH - 4,
        };

        state.obstacles.forEach((obs) => {
          // Adjust obstacle hitbox for fairness
          const obsBox = {
            x: obs.x + 2,
            y: obs.y + 2,
            w: obs.width - 4,
            h: obs.height - 4,
          };

          // Box overlap check
          if (
            dinoBox.x < obsBox.x + obsBox.w &&
            dinoBox.x + dinoBox.w > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.h &&
            dinoBox.y + dinoBox.h > obsBox.y
          ) {
            // Collision detected! Game Over.
            state.gameState = 'crashed';
            setGameState('crashed');
            triggerSound('crash');

            // High Score update
            const finalScore = Math.floor(state.score);
            const savedHighScore = localStorage.getItem('dino_highscore');
            const parsedHighScore = savedHighScore ? parseInt(savedHighScore, 10) : 0;
            if (finalScore > parsedHighScore) {
              setHighScore(finalScore);
              localStorage.setItem('dino_highscore', String(finalScore));
            }
          }
        });
      }

      // DRAW GROUND
      ctx.strokeStyle = borderThemeColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 170);
      ctx.lineTo(600, 170);
      ctx.stroke();

      // Render Ground Texture Details
      ctx.fillStyle = secondaryColor + '40';
      const numLines = 15;
      for (let i = 0; i < numLines; i++) {
        // Draw little ground pixel dots moving along
        const lineX = (i * 80 - state.groundOffset + 600) % 650 - 50;
        ctx.fillRect(lineX, 173, 5, 1);
        ctx.fillRect(lineX + 30, 176, 2, 1);
        ctx.fillRect(lineX + 55, 172, 8, 1);
      }

      // DRAW OBSTACLES
      state.obstacles.forEach((obs) => {
        if (obs.type === 'cactus_small') {
          drawPixelArt(SPRITES.cactus.small, obs.x, obs.y, 2, themeColor);
        } else if (obs.type === 'cactus_double_small') {
          drawPixelArt(SPRITES.cactus.small, obs.x, obs.y, 2, themeColor);
          drawPixelArt(SPRITES.cactus.small, obs.x + 14, obs.y + 2, 2, themeColor);
        } else if (obs.type === 'cactus_large') {
          drawPixelArt(SPRITES.cactus.large, obs.x, obs.y, 2, themeColor);
        } else if (obs.type === 'cactus_double_large') {
          drawPixelArt(SPRITES.cactus.large, obs.x, obs.y, 2, themeColor);
          drawPixelArt(SPRITES.cactus.large, obs.x + 20, obs.y + 1, 2, themeColor);
        } else if (obs.type === 'bird') {
          // flap wings
          const isWingUp = Math.floor(state.frameCount / 12) % 2 === 0;
          const birdSprite = isWingUp ? SPRITES.bird.up : SPRITES.bird.down;
          drawPixelArt(birdSprite, obs.x, obs.y, 2, themeColor);
        }
      });

      // DRAW DINO
      if (state.gameState === 'crashed') {
        drawPixelArt(SPRITES.dino.crashed, 40, state.dinoY, 2, themeColor);
      } else if (state.gameState === 'idle') {
        drawPixelArt(SPRITES.dino.stand, 40, state.dinoY, 2, themeColor);
      } else {
        // Walking/ducking animations
        if (state.isDucking) {
          const isDuckFrame1 = Math.floor(state.frameCount / 6) % 2 === 0;
          const duckSprite = isDuckFrame1 ? SPRITES.dino.duck1 : SPRITES.dino.duck2;
          drawPixelArt(duckSprite, 40, state.dinoY, 2, themeColor);
        } else {
          // If in air, show standing sprite (no walk anim)
          if (state.dinoY < 136) {
            drawPixelArt(SPRITES.dino.stand, 40, state.dinoY, 2, themeColor);
          } else {
            const isWalkFrame1 = Math.floor(state.frameCount / 6) % 2 === 0;
            const walkSprite = isWalkFrame1 ? SPRITES.dino.walk1 : SPRITES.dino.walk2;
            drawPixelArt(walkSprite, 40, state.dinoY, 2, themeColor);
          }
        }
      }

      // Loop frame
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAudioMuted]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-stretch"
    >
      {/* Top Arcade Bar */}
      <div className="flex items-center justify-between mb-3 pb-1 border-b border-transparent">
        <div className="flex items-center gap-2.5">
          {/* Status Indicator Light */}
          <div className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              gameState === 'playing' ? 'bg-emerald-400' : gameState === 'crashed' ? 'bg-rose-400' : 'bg-amber-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              gameState === 'playing' ? 'bg-emerald-500' : gameState === 'crashed' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase">
            {gameState === 'playing' 
              ? 'offline_game: playing' 
              : gameState === 'crashed' 
                ? 'offline_game: crashed' 
                : 'offline_game: ready'}
          </span>
        </div>

        {/* Audio Mute & Instructions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1 rounded-full hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title={isAudioMuted ? "Unmute sound" : "Mute sound"}
          >
            {isAudioMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* Screen CRT Container - Completely borderless/transparent */}
      <div className="relative overflow-hidden aspect-[3/1] max-w-full group rounded-lg">
        
        {/* Subtle Scanlines Effect over canvas */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)+50%,rgba(0,0,0,0.06)+50%)] bg-[size:100%_4px] opacity-40 z-10" />

        {/* Canvas renderer */}
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          onClick={jump}
          className="w-full h-full object-contain block cursor-pointer z-0"
        />

        {/* HUD: Scores */}
        <div className="absolute top-2.5 right-3.5 font-mono text-[10px] md:text-xs tracking-wider text-[var(--text-secondary)] space-x-3.5 z-20 pointer-events-none select-none">
          <span>HI {String(highScore).padStart(5, '0')}</span>
          <span className="text-[var(--text-primary)] font-bold">{String(score).padStart(5, '0')}</span>
        </div>

        {/* Overlay Screens */}
        {gameState === 'idle' && (
          <div 
            onClick={startGame}
            className="absolute inset-0 bg-[var(--bg-primary)]/85 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center cursor-pointer z-20"
          >
            <Play className="text-indigo-400 mb-1.5 animate-pulse" size={20} />
            <p className="font-mono text-[11px] md:text-xs text-[var(--text-primary)] tracking-wide uppercase">
              Press Space / Click to Play
            </p>
            <p className="font-mono text-[9px] text-[var(--text-secondary)] mt-1">
              Jump: Space/↑ | Duck: ↓
            </p>
          </div>
        )}

        {gameState === 'crashed' && (
          <div 
            onClick={startGame}
            className="absolute inset-0 bg-[var(--bg-primary)]/45 backdrop-blur-[0.5px] flex flex-col items-center justify-center p-4 text-center cursor-pointer z-20"
          >
            <h3 className="font-mono text-xs md:text-sm font-bold text-rose-400 tracking-widest uppercase mb-1">
              G A M E  O V E R
            </h3>
            <p className="font-mono text-[9px] md:text-[10px] text-[var(--text-primary)] tracking-wide uppercase flex items-center gap-1 mb-1">
              <RotateCcw size={10} className="inline" /> Restart
            </p>
            <p className="font-mono text-[9px] text-[var(--text-secondary)]">
              Score: <span className="text-[var(--text-primary)] font-semibold">{score}</span>
            </p>
          </div>
        )}
      </div>

      {/* Footer / Instructions */}
      <div className="mt-2.5 flex items-center justify-between text-[9px] font-mono text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <span className="px-1 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-elevated)]">Space</span>
          <span>/</span>
          <span className="px-1 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-elevated)]">↑</span>
          <span>to Jump</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="px-1 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-elevated)]">↓</span>
          <span>to Duck</span>
        </span>
        <span className="text-[var(--text-primary)] opacity-40">
          {isFocused ? '● game active' : '○ click to focus'}
        </span>
      </div>
    </div>
  );
}
