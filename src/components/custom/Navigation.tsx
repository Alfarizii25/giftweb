import { useEffect, useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'game', label: 'Game' },
    { id: 'gift', label: 'Gift' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-pink py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-pink-hot to-pink-deep' 
                  : 'bg-white/30 backdrop-blur-sm'
              }`}>
                <Heart 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isScrolled ? 'text-white' : 'text-pink-hot'
                  } group-hover:animate-heartbeat`} 
                  fill="currentColor" 
                />
              </div>
              <span className={`font-display text-xl transition-colors duration-300 ${
                isScrolled ? 'text-pink-hot' : 'text-pink-deep'
              }`}>
                LovePage
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-pink-hot hover:bg-pink-light/20'
                      : 'text-pink-deep hover:text-pink-hot hover:bg-white/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'text-pink-hot hover:bg-pink-light/20'
                  : 'text-pink-deep hover:bg-white/30'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-3xl shadow-romantic p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:text-pink-hot hover:bg-pink-light/20 transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <Heart className="w-4 h-4 text-pink-light" fill="currentColor" />
                <span className="font-body font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Decorative */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-pink-light/30">
            <Heart className="w-4 h-4 text-pink-light animate-heartbeat" fill="currentColor" />
            <Heart className="w-5 h-5 text-pink-hot animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-4 h-4 text-pink-light animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
