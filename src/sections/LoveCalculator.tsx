import { useEffect, useRef, useState } from 'react';
import { Heart, Calculator, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
}

const LoveCalculator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showResult, setShowResult] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

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

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            speedY: p.speedY + 0.3, // gravity
            rotation: p.rotation + 5,
          }))
          .filter((p) => p.y < window.innerHeight)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setShowResult(false);

    // Simulate calculation delay
    setTimeout(() => {
      // Simple algorithm based on names
      const combined = (name1 + name2).toLowerCase();
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = ((hash << 5) - hash) + combined.charCodeAt(i);
        hash = hash & hash;
      }
      
      // Ensure result is between 50-100 for positive vibes
      const lovePercentage = Math.abs(hash % 51) + 50;
      
      setResult(lovePercentage);
      setIsCalculating(false);
      setShowResult(true);

      // Create particle explosion
      if (lovePercentage > 70) {
        createParticleExplosion();
      }
    }, 2000);
  };

  const createParticleExplosion = () => {
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFDAB9', '#FF1493', '#DB7093'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 15,
        speedY: -10 - Math.random() * 10,
        rotation: Math.random() * 360,
      });
    }

    setParticles(newParticles);
  };

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setShowResult(false);
    setParticles([]);
  };

  const getLoveMessage = (percentage: number) => {
    if (percentage >= 90) return "Soulmates! A match made in heaven!";
    if (percentage >= 80) return "True love! You two are perfect together!";
    if (percentage >= 70) return "Great match! Your love is strong!";
    if (percentage >= 60) return "Good compatibility! Keep nurturing your love!";
    return "Every love story is unique. Keep writing yours!";
  };

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Particle Canvas */}
      {particles.map((particle) => (
        <Heart
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            color: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
          fill="currentColor"
        />
      ))}

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-peach/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-hot/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-light/15 animate-float"
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
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-pink rounded-full mb-4">
            <Calculator className="w-4 h-4 text-pink-hot" />
            <span className="text-sm font-medium text-pink-deep">Fun Game</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-pink-hot mb-4">
            Love Calculator
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Curious about your love compatibility? Enter your names and let's find out!
          </p>
        </div>

        {/* Calculator Card */}
        <div className={`max-w-xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-pink rounded-3xl p-8 sm:p-12 shadow-romantic relative overflow-hidden">
            {/* Decorative Elements */}
            <Heart className="absolute top-4 right-4 w-8 h-8 text-pink-light/50 animate-heartbeat" fill="currentColor" />
            <Heart className="absolute bottom-4 left-4 w-6 h-6 text-pink-light/50 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.5s' }} />

            {!showResult ? (
              <div className="space-y-8">
                {/* Input Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-body text-sm text-gray-600 ml-1">Your Name</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-pink-light/50 bg-white/80 focus:border-pink-hot focus:ring-pink-hot/20 text-lg font-body"
                        onKeyPress={(e) => e.key === 'Enter' && calculateLove()}
                      />
                      <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-light" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-hot to-pink-deep flex items-center justify-center animate-pulse-glow">
                      <Heart className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-sm text-gray-600 ml-1">Partner's Name</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Enter partner's name"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-pink-light/50 bg-white/80 focus:border-pink-hot focus:ring-pink-hot/20 text-lg font-body"
                        onKeyPress={(e) => e.key === 'Enter' && calculateLove()}
                      />
                      <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-light" />
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateLove}
                  disabled={!name1.trim() || !name2.trim() || isCalculating}
                  className="w-full py-6 bg-gradient-to-r from-pink-hot to-pink-deep text-white rounded-2xl font-body font-semibold text-lg shadow-pink-lg hover:shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Calculating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Calculate Love %
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6 animate-bounce-in">
                {/* Result Display */}
                <div className="relative">
                  {/* Percentage Circle */}
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-pink-light to-pink-hot flex items-center justify-center shadow-glow animate-pulse-glow">
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                      <span className="font-display text-5xl text-pink-hot">
                        {result}%
                      </span>
                    </div>
                  </div>

                  {/* Floating Hearts */}
                  <Heart className="absolute top-0 left-1/4 w-8 h-8 text-pink-light animate-float" fill="currentColor" />
                  <Heart className="absolute top-4 right-1/4 w-6 h-6 text-pink-hot animate-float" fill="currentColor" style={{ animationDelay: '-2s' }} />
                  <Heart className="absolute bottom-0 left-1/3 w-5 h-5 text-pink-deep animate-float" fill="currentColor" style={{ animationDelay: '-4s' }} />
                </div>

                {/* Result Message */}
                <div className="space-y-2">
                  <p className="font-display text-2xl text-pink-deep">
                    {result !== null && getLoveMessage(result)}
                  </p>
                  <p className="font-body text-gray-600">
                    {name1} <span className="text-pink-hot">♥</span> {name2}
                  </p>
                </div>

                {/* Reset Button */}
                <Button
                  onClick={reset}
                  variant="outline"
                  className="px-8 py-4 border-2 border-pink-hot/50 text-pink-deep rounded-2xl font-body font-semibold hover:bg-pink-light/20 hover:border-pink-hot transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Fun Note */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-sm text-gray-500 italic">
            *This is just for fun! True love can't be measured by numbers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveCalculator;
