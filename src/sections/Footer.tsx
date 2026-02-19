import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-gradient-to-r from-pink-hot to-pink-deep overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              width: '40px',
              height: '40px',
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-white/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 20}px`,
              height: `${15 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Main Message */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white/80" />
            <p className="font-display text-2xl sm:text-3xl text-white">
              Made with
            </p>
            <Heart 
              className="w-8 h-8 text-white animate-heartbeat" 
              fill="currentColor" 
            />
            <p className="font-display text-2xl sm:text-3xl text-white">
              Love
            </p>
            <Sparkles className="w-6 h-6 text-white/80" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/30" />
            <Heart className="w-4 h-4 text-white/50" fill="currentColor" />
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <p className="font-body text-white/80 text-sm">
              © {currentYear} Page Ulang Tahun Khansa.
            </p>
            <p className="font-body text-white/60 text-xs">
              Celebrating Birthday, Happy Moment.
            </p>
          </div>

          {/* Bottom Hearts */}
          <div className="flex items-center gap-2 pt-4">
            <Heart className="w-4 h-4 text-white/40 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0s' }} />
            <Heart className="w-5 h-5 text-white/60 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-6 h-6 text-white/80 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
            <Heart className="w-5 h-5 text-white/60 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.6s' }} />
            <Heart className="w-4 h-4 text-white/40 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.8s' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
