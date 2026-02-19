import { useEffect, useRef, useState } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden gradient-pink-peach"
    >
      {/* Animated Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-light/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-light/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-peach/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-hot/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-20">
          {/* Left Column - Text Content */}
          <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pink rounded-full">
              <Sparkles className="w-4 h-4 text-pink-hot" />
              <span className="text-sm font-medium text-pink-deep">Khansa's Birthday</span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-pink-hot leading-tight">
                Happy
              </h1>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gradient-pink leading-tight">
                Birthdayy
              </h1>
              
            </div>

            {/* Subheading */}
            <div className="space-y-4">
              <p className="font-display text-2xl sm:text-3xl text-pink-deep/80">
                To My Special Person
              </p>
              <p className="font-body text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
                Hai, Semoga khansa kedepannya diberikan kesehatan, panjang umur, sukses dan sehat selaluu.
                Kurang kurangin makan mie instan neng 🤦‍♂️
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection('gift')}
                className="group relative px-8 py-6 bg-gradient-to-r from-pink-hot to-pink-deep text-white rounded-full font-body font-semibold text-lg shadow-pink-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Open Your Gift
                <Heart className="absolute -top-2 -right-2 w-6 h-6 text-pink-hot animate-heartbeat" fill="currentColor" />
              </Button>
              <Button
                onClick={() => scrollToSection('gallery')}
                variant="outline"
                className="px-8 py-6 border-2 border-pink-hot/50 text-pink-deep rounded-full font-body font-semibold text-lg hover:bg-pink-light/20 hover:border-pink-hot transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Our Memories
              </Button>
            </div>

            {/* Decorative Hearts */}
            <div className="flex items-center gap-4 pt-4">
              <Heart className="w-8 h-8 text-pink-light animate-heartbeat" fill="currentColor" style={{ animationDelay: '0s' }} />
              <Heart className="w-6 h-6 text-pink animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.3s' }} />
              <Heart className="w-10 h-10 text-pink-hot animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.6s' }} />
              <Heart className="w-5 h-5 text-pink-deep animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.9s' }} />
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Image Frame */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-pink-hot/40 rounded-tl-3xl" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-pink-hot/40 rounded-br-3xl" />
              
              {/* Floating Hearts around image */}
              <Heart 
                className="absolute -top-4 right-10 w-10 h-10 text-pink-light animate-float" 
                fill="currentColor" 
              />
              <Heart 
                className="absolute -bottom-2 left-8 w-8 h-8 text-pink-hot animate-float" 
                fill="currentColor" 
                style={{ animationDelay: '-2s' }}
              />
              <Heart 
                className="absolute top-1/2 -right-4 w-6 h-6 text-pink-deep animate-float" 
                fill="currentColor" 
                style={{ animationDelay: '-4s' }}
              />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-romantic">
                <img
                  src="/images/khansacantik.jpeg"
                  alt="Romantic Couple"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-hot/20 to-transparent pointer-events-none" />
              </div>

              {/* Caption Card */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-2xl shadow-pink">
                <p className="font-display text-lg text-pink-deep whitespace-nowrap">
                  You are my everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
