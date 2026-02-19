import { useEffect, useRef, useState } from 'react';
import { Heart, Gift, Lock, Unlock, Sparkles, Music, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GiftSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenGift = () => {
    setIsOpened(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 800);
  };

  return (
    <section
      ref={sectionRef}
      id="gift"
      className="relative py-20 lg:py-32 gradient-pink-peach overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-light/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-peach/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-hot/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-6 h-6 text-pink-light/30" fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Star className="w-5 h-5 text-peach/40" fill="currentColor" />
            ) : (
              <Sparkles className="w-4 h-4 text-pink-hot/30" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <Gift className="w-4 h-4 text-pink-hot" />
            <span className="text-sm font-medium text-pink-deep">Special Surprise</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-pink-hot mb-4">
            Your Valentine's Gift
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            I have something special waiting for you. Open it with love!
          </p>
        </div>

        {/* Gift Box */}
        <div className={`flex flex-col items-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {!isOpened ? (
            <div className="relative">
              {/* Gift Box Closed */}
              <div 
                className="relative cursor-pointer group"
                onClick={handleOpenGift}
              >
                {/* Box */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-pink-hot to-pink-deep rounded-3xl shadow-romantic flex items-center justify-center transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow">
                  {/* Ribbon Vertical */}
                  <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-12 bg-gradient-to-b from-pink-light to-pink" />
                  {/* Ribbon Horizontal */}
                  <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-12 bg-gradient-to-r from-pink-light to-pink" />
                  
                  {/* Lock Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Lock className="w-10 h-10 text-white group-hover:hidden" />
                    <Unlock className="w-10 h-10 text-white hidden group-hover:block" />
                  </div>
                </div>

                {/* Bow */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center">
                    <div className="w-16 h-10 bg-pink-light rounded-full transform -rotate-12 shadow-lg" />
                    <div className="w-16 h-10 bg-pink-light rounded-full transform rotate-12 shadow-lg -ml-4" />
                  </div>
                  <div className="w-6 h-6 bg-pink rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md" />
                </div>

                {/* Floating Hearts */}
                <Heart className="absolute -top-4 -right-4 w-8 h-8 text-pink-hot animate-heartbeat" fill="currentColor" />
                <Heart className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-light animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Click Hint */}
              <p className="text-center mt-8 font-body text-pink-deep animate-pulse">
                Click to open your gift!
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Opened Gift Animation */}
              <div className="animate-bounce-in">
                {/* Open Box */}
                <div className="relative">
                  {/* Box Bottom */}
                  <div className="w-48 h-24 sm:w-64 sm:h-32 bg-gradient-to-br from-pink-hot to-pink-deep rounded-b-3xl shadow-romantic" />
                  
                  {/* Box Lid (Opened) */}
                  <div 
                    className="absolute -top-16 left-0 w-48 h-16 sm:w-64 sm:h-20 bg-gradient-to-br from-pink-light to-pink origin-bottom-left transform -rotate-45 rounded-t-3xl shadow-lg transition-transform duration-700"
                  />

                  {/* Hearts Bursting Out */}
                  <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
                    {[...Array(8)].map((_, i) => (
                      <Heart
                        key={i}
                        className="absolute animate-float"
                        style={{
                          left: `${(i - 4) * 20}px`,
                          top: `${-Math.abs(i - 4) * 10}px`,
                          width: `${20 + Math.random() * 20}px`,
                          height: `${20 + Math.random() * 20}px`,
                          color: ['#FF69B4', '#FFB6C1', '#FF1493', '#DB7093'][i % 4],
                          animationDelay: `${i * 0.1}s`,
                        }}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                {/* Revealed Message */}
                {showMessage && (
                  <div className="mt-12 text-center animate-slide-up">
                    <div className="glass rounded-3xl p-8 sm:p-12 shadow-romantic max-w-lg mx-auto">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-hot to-pink-deep flex items-center justify-center animate-pulse-glow">
                          <Heart className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                      </div>
                      
                      <h3 className="font-display text-3xl sm:text-4xl text-pink-hot mb-4">
                        My Dearest Love
                      </h3>
                      
                      <div className="space-y-4 font-body text-gray-700 leading-relaxed">
                        <p>
                          On this special day, I want you to know how much you mean to me. 
                          You are the reason I smile, the reason I believe in love, 
                          and the reason every day feels like Valentine's Day.
                        </p>
                        <p>
                          Thank you for being my partner, my best friend, and my greatest adventure. 
                          I promise to cherish you, support you, and love you more with each passing day.
                        </p>
                        <p className="font-display text-xl text-pink-deep">
                          Forever Yours ❤️a                        </p>
                      </div>

                      {/* Music Note Decoration */}
                      <div className="flex justify-center gap-4 mt-6">
                        <Music className="w-6 h-6 text-pink-light animate-bounce" style={{ animationDelay: '0s' }} />
                        <Music className="w-5 h-5 text-pink animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <Music className="w-6 h-6 text-pink-hot animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>

                    {/* Reset Button */}
                    <Button
                      onClick={() => {
                        setIsOpened(false);
                        setShowMessage(false);
                      }}
                      variant="outline"
                      className="mt-8 px-8 py-4 border-2 border-pink-hot/50 text-pink-deep rounded-full font-body font-semibold hover:bg-pink-light/20 hover:border-pink-hot transition-all duration-300"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Open Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Decoration */}
        <div className={`flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-hot" />
          <Heart className="w-6 h-6 text-pink-hot animate-heartbeat" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-hot" />
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
