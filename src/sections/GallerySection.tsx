import { useEffect, useRef, useState } from 'react';
import { Heart, X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/khansa.jpeg',
    alt: 'Khansa marahmarah',
    caption: 'khansa marah di vid call 😡😜🤬'
  },
  {
    src: '/images/image.png',
    alt: 'photobox robalox',
    caption: 'Ini photobox di roblox frame Lany'
  },
  {
    src: '/images/kerenbgt.png',
    alt: 'ProkProk',
    caption: 'Cuddle di rerumputan jir'
  },
  {
    src: '/images/gunung.png',
    alt: 'Gunungg',
    caption: 'Trend robalox 😜😜❤️'
  },
  {
    src: '/images/ngedate.png',
    alt: 'mejameja',
    caption: 'Ngedate ni yee'
  },
  {
    src: '/images/waterboom.png',
    alt: 'Waterboom',
    caption: 'Main waterboom boom'
  }
];

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-20 lg:py-32 gradient-pink-soft overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-peach/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-hot/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-light/15 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <Heart className="w-4 h-4 text-pink-hot" fill="currentColor" />
            <span className="text-sm font-medium text-pink-deep">Liat Fotonya</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-pink-hot mb-4">
            Foto foto bagyus
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Foto foto mabar bareng bersama
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                marginTop: index % 3 === 1 ? '2rem' : '0',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative rounded-2xl overflow-hidden shadow-pink transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-105 shadow-romantic z-10' : ''
                }`}
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-hot/80 via-pink-hot/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="font-display text-xl text-white mb-2">
                    {image.caption}
                  </p>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <ZoomIn className="w-5 h-5" />
                    <span className="font-body text-sm">View Larger</span>
                  </button>
                </div>

                {/* Corner Hearts */}
                <Heart 
                  className="absolute top-3 right-3 w-6 h-6 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-heartbeat" 
                  fill="currentColor" 
                />

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full">
            <Heart className="w-6 h-6 text-pink-hot animate-heartbeat" fill="currentColor" />
            <p className="font-display text-xl text-pink-deep">
              Creating memories, one day at a time
            </p>
            <Heart className="w-6 h-6 text-pink-hot animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <p className="font-display text-2xl text-white">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
