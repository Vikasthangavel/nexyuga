import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import { useCollection } from '../hooks/useCollection';

export default function TestimonialWheel() {
  const { data: rawList, loading } = useCollection('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Pad to 24 for the wheel
  const testimonials = rawList.length > 0
    ? Array.from({ length: 24 }, (_, i) => rawList[i % rawList.length])
    : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollRotation = useTransform(smoothProgress, [0, 1], [40, -40]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (testimonials.length === 0) return;
    const newIndex = Math.min(
      testimonials.length - 1,
      Math.round(latest * (testimonials.length - 1))
    );
    setActiveIndex(newIndex);
  });

  // Reset active index if list changes (e.g. admin adds first entry)
  useEffect(() => { setActiveIndex(0); }, [rawList.length]);

  const [radius, setRadius] = useState(650);
  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 320 : 650);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const combinedRotationRaw = scrollRotation;
  
  // Calculate the target rotation to bring the activeItem to the top.
  // Our math places index 0 at -90deg. If activeIndex is N, it's at angle N * (360/len).
  // To bring it to 0, we rotate the entire wheel by -N * (360/len).
  const targetOffsetDeg = testimonials.length > 0 ? -(activeIndex * (360 / testimonials.length)) : 0;
  
  // Keep the continuous scroll/rotation mapped purely reversed for the base rotate style
  const counterRotationRaw = useTransform(combinedRotationRaw, r => -r);

  const centerX = 800;
  const centerY = 800;
  const current = testimonials[activeIndex];

  // Show nothing if no testimonials yet
  if (!loading && rawList.length === 0) return null;

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-white" aria-label="Testimonials">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-clip font-sans pt-20 pb-10 pointer-events-none">
      {/* Blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#0197B2]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#5ACB2A]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-4 relative z-10"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight leading-tight">
          What People Say
        </h2>
      </motion.div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Wheel */}
      {!loading && testimonials.length > 0 && (
        <div className="w-full max-w-[1200px] min-h-[700px] pb-12 relative mx-auto bg-transparent mt-12">
          {/* Avatar Wheel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] pointer-events-none">
            <motion.div
              className="relative w-[1600px] h-[1600px] mx-auto pointer-events-none"
              style={{ rotate: combinedRotationRaw }}
              animate={{ transform: `rotate(${targetOffsetDeg}deg)` }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            >
              {testimonials.map((t, index) => {
                const angleStep = (2 * Math.PI) / testimonials.length;
                const angle = (index * angleStep) - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle) - 50;
                const y = centerY + radius * Math.sin(angle) - 50;
                // Calculate shortest distance around the circle to the active index
                let dist = Math.abs(activeIndex - index);
                if (dist > testimonials.length / 2) {
                  dist = testimonials.length - dist;
                }

                const isActive = dist === 0;
                
                // Scale and fade items based on how far they are from the center top
                let scaleVal = 1;
                let opacityVal = 1;
                let zIndex = 10;
                
                if (dist === 0) {
                  scaleVal = 1.25; zIndex = 30; opacityVal = 1;
                } else if (dist === 1) {
                  scaleVal = 0.95; zIndex = 20; opacityVal = 0.85;
                } else if (dist === 2) {
                  scaleVal = 0.75; zIndex = 15; opacityVal = 0.6;
                } else if (dist === 3) {
                  scaleVal = 0.55; zIndex = 10; opacityVal = 0.3;
                } else {
                  scaleVal = 0; zIndex = 0; opacityVal = 0; // Hide bottom items
                }

                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="absolute w-[90px] h-[90px] rounded-full border-[4px] overflow-hidden cursor-pointer transition-all duration-500 bg-white shadow-md border-white"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `scale(${scaleVal})`,
                      opacity: opacityVal,
                      zIndex: zIndex,
                      pointerEvents: opacityVal === 0 ? 'none' : 'auto',
                      boxShadow: isActive ? `0 12px 32px rgba(1,151,178,0.2)` : `0 4px 12px rgba(0,0,0,0.08)`,
                    }}
                  >
                    <motion.div 
                      style={{ rotate: counterRotationRaw }} 
                      animate={{ transform: `rotate(${-targetOffsetDeg}deg)` }}
                      transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
                      className="w-full h-full"
                    >
                      {t.imageUrl ? (
                        <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover bg-gray-50" />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-2xl font-bold bg-[#0197B2]"
                        >
                          {t.name?.[0] ?? '?'}
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          {/* Center quote */}
          {current && (
            <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center z-50 pointer-events-auto flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-6 border border-gray-100 mt-6 lg:-mt-6">
                <FaQuoteRight className="text-xl text-primary" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xl md:text-2xl lg:text-[26px] font-medium text-dark leading-snug mb-4">
                    &ldquo;{current.desc || "I see how this can bridge gaps in access and empower every child to learn"}&rdquo;
                  </p>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#5ACB2A] text-sm" />
                      ))}
                    </div>
                    <p className="font-semibold text-dark text-lg md:text-xl relative inline-flex items-center gap-2">
                      <span className="w-6 h-[1px] bg-gray-300 hidden sm:block"></span>
                      {current.name || "Akshay saxena"}
                      <span className="w-6 h-[1px] bg-gray-300 hidden sm:block"></span>
                    </p>
                    <p className="text-sm md:text-base text-gray-400">
                      {current.designation || "Co-Founder - Avanti Fellows"}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
      </div>
    </section>
  );
}
