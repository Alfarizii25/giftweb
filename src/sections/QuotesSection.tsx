import { useEffect, useRef, useState } from 'react';
import { Heart, Quote } from 'lucide-react';

interface QuoteData {
  text: string;
  author: string;
}

const quotes: QuoteData[] = [
  {
    text: "You are the moonlight of my life, everynight.",
    author: "Green Day"
  }
  
  
  
];

const QuotesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="quotes"
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              width: '60px',
              height: '60px',
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-light/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-peach/30 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-pink rounded-full mb-4">
            <Heart className="w-4 h-4 text-pink-hot" fill="currentColor" />
            <span className="text-sm font-medium text-pink-deep">Words of Love</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-pink-hot mb-4">
            Love Quotes
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Beautiful words that capture the essence of our love
          </p>
        </div>

        {/* Quote Carousel */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            {/* Quote Card */}
            <div className="glass-pink rounded-3xl p-8 sm:p-12 lg:p-16 shadow-romantic relative overflow-hidden">
              {/* Background Quote Icon */}
              <Quote className="absolute top-6 left-6 w-20 h-20 text-pink-light/30" />
              <Quote className="absolute bottom-6 right-6 w-20 h-20 text-pink-light/30 rotate-180" />

              {/* Quote Content */}
              <div className={`relative z-10 text-center transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-pink-deep leading-relaxed mb-8">
                  "{quotes[currentIndex].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-hot" />
                  <p className="font-body text-lg text-gray-600">
                    {quotes[currentIndex].author}
                  </p>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-hot" />
                </div>
              </div>

              {/* Floating Hearts */}
              <Heart 
                className="absolute top-4 right-8 w-6 h-6 text-pink-light animate-float" 
                fill="currentColor" 
              />
              <Heart 
                className="absolute bottom-8 left-8 w-5 h-5 text-pink-hot animate-float" 
                fill="currentColor" 
                style={{ animationDelay: '-2s' }}
              />
            </div>

          </div>
        </div>

        {/* Decorative Bottom Hearts */}
        <div className={`flex items-center justify-center gap-3 mt-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Heart className="w-5 h-5 text-pink-light animate-heartbeat" fill="currentColor" style={{ animationDelay: '0s' }} />
          <Heart className="w-4 h-4 text-pink animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-6 h-6 text-pink-hot animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
          <Heart className="w-4 h-4 text-pink animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.6s' }} />
          <Heart className="w-5 h-5 text-pink-light animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.8s' }} />
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
