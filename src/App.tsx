import Navigation from '@/components/custom/Navigation';
import HeroSection from '@/sections/HeroSection';
import QuotesSection from '@/sections/QuotesSection';
import GallerySection from '@/sections/GallerySection';
import CatchTheHeart from '@/sections/CatchTheHeart';
import GiftSection from '@/sections/GiftSection';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main>
        <HeroSection />
        <QuotesSection />
        <GallerySection />
        <CatchTheHeart />
        <GiftSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
