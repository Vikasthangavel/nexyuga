import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useCollection } from '../hooks/useCollection';

// Standard grid layout (Removed Heart Pattern)

export default function Gallery() {
  const { data, loading } = useCollection('gallery');
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  // Auto-advance main photo every 5 seconds
  useEffect(() => {
    if (data.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.length]);
  
  // Manual scrolling for the thumbnail strip
  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      thumbnailsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // If nothing uploaded yet, render nothing
  if (!loading && data.length === 0) return null;

  return (
    <section
      id="gallery"
      className="py-24 bg-white relative overflow-hidden font-sans flex flex-col items-center"
    >
      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-primary mb-4 block"
          >
            Moments of Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[54px] font-bold text-dark tracking-tight leading-tight mb-4"
          >
            The Heart of Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            A visual journey of our key milestones, partnerships, and the real people who make our mission possible.
          </motion.p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Main Showcase & Thumbnails */}
        {!loading && data.length > 0 && (
          <div className="w-full max-w-[1000px] mx-auto mt-12 space-y-8">
            {/* Main Active Photo */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                     src={data[activeIndex]?.imageUrl}
                     alt={data[activeIndex]?.caption || 'Main Showcase'}
                     className="w-full h-full object-contain bg-white"
                  />
                  {/* Photo DB Title Overlay */}
                  {data[activeIndex]?.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8 pt-20">
                      <p className="text-white font-bold text-xl md:text-3xl drop-shadow-md">
                        {data[activeIndex].caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center gap-4 px-2">
              <button 
                onClick={() => scrollThumbnails('left')}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors shrink-0"
              >
                <HiChevronLeft size={24} />
              </button>
              
              <div 
                ref={thumbnailsRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scroll-bar pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {data.map((item, i) => (
                  <button
                    key={item.id || i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-24 h-24 md:w-32 md:h-24 rounded-xl overflow-hidden shrink-0 snap-start transition-all duration-300 border-2 ${
                      i === activeIndex 
                        ? 'border-primary shadow-md scale-105 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || `Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => scrollThumbnails('right')}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors shrink-0"
              >
                <HiChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
