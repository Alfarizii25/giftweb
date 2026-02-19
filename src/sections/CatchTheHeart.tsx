import { useEffect, useRef, useState, useCallback } from 'react';
import { Heart, Play, Pause, RotateCcw, Trophy, Timer, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

const GAME_DURATION = 30; // seconds
const SPAWN_INTERVAL = 800; // milliseconds

const heartColors = [
  '#FF69B4', // Hot Pink
  '#FFB6C1', // Light Pink
  '#FF1493', // Deep Pink
  '#DB7093', // Pale Violet Red
  '#FFC0CB', // Pink
];

const CatchTheHeart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [highScore, setHighScore] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('catchTheHeartHighScore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('catchTheHeartHighScore', score.toString());
    }
  }, [score, highScore]);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        size: 4 + Math.random() * 4,
        color,
        life: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  const spawnHeart = useCallback(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    const size = 30 + Math.random() * 25;
    
    const newHeart: FallingHeart = {
      id: heartIdRef.current++,
      x: Math.random() * (rect.width - size - 20) + 10,
      y: -size,
      speed: 2 + Math.random() * 3 + (score * 0.1), // Speed increases with score
      size,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
    };
    
    setHearts((prev) => [...prev, newHeart]);
  }, [score]);

  const catchHeart = useCallback((heartId: number, x: number, y: number, color: string) => {
    setHearts((prev) => prev.filter((h) => h.id !== heartId));
    setScore((prev) => prev + 10);
    createParticles(x, y, color);
  }, [createParticles]);

  const gameLoop = useCallback((timestamp: number) => {
    if (gameState !== 'playing') return;

    // Spawn hearts
    if (timestamp - lastSpawnRef.current > SPAWN_INTERVAL) {
      spawnHeart();
      lastSpawnRef.current = timestamp;
    }

    // Update hearts
    setHearts((prev) => {
      const gameArea = gameAreaRef.current;
      if (!gameArea) return prev;
      const rect = gameArea.getBoundingClientRect();

      return prev
        .map((heart) => ({
          ...heart,
          y: heart.y + heart.speed,
          rotation: heart.rotation + heart.rotationSpeed,
        }))
        .filter((heart) => heart.y < rect.height + heart.size);
    });

    // Update particles
    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2,
          life: p.life - 0.03,
        }))
        .filter((p) => p.life > 0)
    );

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, spawnHeart]);

  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    setParticles([]);
    lastSpawnRef.current = 0;
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = () => {
    setGameState('idle');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    setParticles([]);
  };

  const getResultMessage = () => {
    if (score >= 200) return "Amazing! You're a heart-catching master!";
    if (score >= 150) return "Fantastic! You have lightning reflexes!";
    if (score >= 100) return "Great job! You're really good at this!";
    if (score >= 50) return "Nice try! Keep practicing!";
    return "Don't give up! Try again!";
  };

  return (
    <section
      ref={sectionRef}
      id="game"
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-peach/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-hot/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-light/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-pink rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-pink-hot" />
            <span className="text-sm font-medium text-pink-deep">Mini Game</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-pink-hot mb-4">
            Catch the Heart
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Catch as many falling hearts as you can before time runs out!
          </p>
        </div>

        {/* Game Container */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Stats Bar */}
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="flex items-center gap-4">
              <div className="glass-pink px-4 py-2 rounded-full flex items-center gap-2">
                <Trophy className="w-5 h-5 text-pink-hot" />
                <span className="font-body font-semibold text-pink-deep">
                  Score: <span className="text-pink-hot">{score}</span>
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                <Trophy className="w-4 h-4 text-pink-light" />
                <span className="font-body text-sm text-gray-600">
                  Best: <span className="text-pink-hot">{highScore}</span>
                </span>
              </div>
            </div>
            <div className={`glass px-4 py-2 rounded-full flex items-center gap-2 ${timeLeft <= 5 ? 'bg-red-100 animate-pulse' : ''}`}>
              <Timer className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500' : 'text-pink-hot'}`} />
              <span className={`font-body font-semibold ${timeLeft <= 5 ? 'text-red-500' : 'text-pink-deep'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative h-96 bg-gradient-to-b from-pink-light/10 to-peach/20 rounded-3xl overflow-hidden shadow-romantic border-2 border-pink-light/30"
          >
            {/* Game States */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Heart className="w-24 h-24 text-pink-hot animate-heartbeat mx-auto" fill="currentColor" />
                    <Heart className="absolute -top-4 -right-4 w-10 h-10 text-pink-light animate-float" fill="currentColor" />
                    <Heart className="absolute -bottom-2 -left-4 w-8 h-8 text-pink animate-float" fill="currentColor" style={{ animationDelay: '-2s' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-pink-deep mb-2">Ready to Play?</h3>
                    <p className="font-body text-gray-600">Click the hearts as they fall to catch them!</p>
                  </div>
                  <Button
                    onClick={startGame}
                    className="px-8 py-6 bg-gradient-to-r from-pink-hot to-pink-deep text-white rounded-full font-body font-semibold text-lg shadow-pink-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" fill="currentColor" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}

            {gameState === 'paused' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
                <div className="text-center space-y-4">
                  <Pause className="w-16 h-16 text-pink-hot mx-auto" />
                  <h3 className="font-display text-3xl text-pink-deep">Paused</h3>
                  <Button
                    onClick={pauseGame}
                    className="px-6 py-4 bg-gradient-to-r from-pink-hot to-pink-deep text-white rounded-full font-body font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" fill="currentColor" />
                    Resume
                  </Button>
                </div>
              </div>
            )}

            {gameState === 'ended' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                <div className="text-center space-y-6 animate-bounce-in">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-hot to-pink-deep flex items-center justify-center mx-auto shadow-glow animate-pulse-glow">
                      <Heart className="w-14 h-14 text-white" fill="currentColor" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-4xl text-pink-hot mb-2">Game Over!</h3>
                    <p className="font-display text-2xl text-pink-deep mb-1">Final Score: {score}</p>
                    <p className="font-body text-gray-600">{getResultMessage()}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={startGame}
                      className="px-6 py-4 bg-gradient-to-r from-pink-hot to-pink-deep text-white rounded-full font-body font-semibold shadow-pink-lg hover:shadow-glow transition-all duration-300"
                    >
                      <Play className="w-5 h-5 mr-2" fill="currentColor" />
                      Play Again
                    </Button>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="px-6 py-4 border-2 border-pink-hot/50 text-pink-deep rounded-full font-body font-semibold hover:bg-pink-light/20"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Menu
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Falling Hearts */}
            {gameState === 'playing' && hearts.map((heart) => (
              <button
                key={heart.id}
                onClick={() => catchHeart(heart.id, heart.x + heart.size / 2, heart.y + heart.size / 2, heart.color)}
                className="absolute cursor-pointer transition-transform hover:scale-110 active:scale-95"
                style={{
                  left: heart.x,
                  top: heart.y,
                  width: heart.size,
                  height: heart.size,
                  transform: `rotate(${heart.rotation}deg)`,
                }}
              >
                <Heart
                  className="w-full h-full drop-shadow-lg"
                  style={{ color: heart.color }}
                  fill="currentColor"
                />
              </button>
            ))}

            {/* Particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  opacity: particle.life,
                  transform: `scale(${particle.life})`,
                }}
              />
            ))}

            {/* Game Controls */}
            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                className="absolute top-4 right-4 p-3 glass rounded-full hover:bg-white/50 transition-all duration-300 z-10"
              >
                <Pause className="w-5 h-5 text-pink-deep" />
              </button>
            )}

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-pink-light/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-pink-light/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-light/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-light/50 rounded-br-lg" />
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-6 glass px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-hot" fill="currentColor" />
                <span className="font-body text-sm text-gray-600">Click hearts to catch</span>
              </div>
              <div className="w-px h-4 bg-pink-light" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-hot" />
                <span className="font-body text-sm text-gray-600">+10 points each</span>
              </div>
              <div className="w-px h-4 bg-pink-light" />
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-pink-hot" />
                <span className="font-body text-sm text-gray-600">{GAME_DURATION} seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatchTheHeart;
