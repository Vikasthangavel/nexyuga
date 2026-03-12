import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import { useCollection } from '../hooks/useCollection';

export default function TestimonialWheel() {
  const { data: rawList, loading } = useCollection('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  // Pad to 24 for the wheel
  const testimonials = rawList.length > 0
    ? Array.from({ length: 24 }, (_, i) => rawList[i % rawList.length])
    : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start bottom', 'bottom top'],
  });

  const scrollRotation = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [continuousRotation, setContinuousRotation] = useState(0);
  useEffect(() => {
    let af;
    const tick = () => {
      if (!isHovered.current) setContinuousRotation(p => p - 0.05);
      af = requestAnimationFrame(tick);
    };
    af = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(af);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => {
      if (!isHovered.current) setActiveIndex(p => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  // Reset active index if list changes (e.g. admin adds first entry)
  useEffect(() => { setActiveIndex(0); }, [rawList.length]);

  const [radius, setRadius] = useState(450);
  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 300 : 450);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const combinedRotation = useTransform(scrollRotation, r => r + continuousRotation);
  const counterRotation = useTransform(combinedRotation, r => -r);

  const centerX = 525;
  const centerY = 525;
  const current = testimonials[activeIndex];

  // Show nothing if no testimonials yet
  if (!loading && rawList.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="py-24 bg-white relative font-sans flex flex-col items-center overflow-hidden"
      aria-label="Testimonials"
    >
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
        <div
          className="w-full max-w-[1100px] h-[620px] md:h-[540px] relative overflow-hidden rounded-3xl mx-auto border border-gray-100 shadow-[0_8px_48px_rgba(1,151,178,0.06)] bg-white"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Avatar Wheel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1050px] pointer-events-none">
            <motion.div
              className="relative w-[1050px] h-[1050px] mx-auto pointer-events-auto"
              style={{ rotate: combinedRotation }}
            >
              {testimonials.map((t, index) => {
                const angleStep = (2 * Math.PI) / testimonials.length;
                const angle = (index * angleStep) - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle) - 50;
                const y = centerY + radius * Math.sin(angle) - 50;
                const isActive = activeIndex === index;
                const ringColor = index % 2 === 0 ? '#0197B2' : '#5ACB2A';

                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`absolute w-[90px] h-[90px] rounded-full border-[4px] overflow-hidden cursor-pointer transition-all duration-500 bg-white shadow-md
                      ${isActive ? 'z-20 scale-110' : 'border-gray-200 hover:scale-105 z-10'}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      borderColor: isActive ? ringColor : undefined,
                      boxShadow: isActive ? `0 0 0 3px ${ringColor}40, 0 8px 24px ${ringColor}30` : undefined,
                    }}
                  >
                    <motion.div style={{ rotate: counterRotation }} className="w-full h-full">
                      {t.imageUrl ? (
                        <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover bg-gray-50" />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                          style={{ backgroundColor: ringColor }}
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
            <div className="absolute top-[180px] md:top-[150px] left-1/2 -translate-x-1/2 z-10 w-[calc(100%-48px)] max-w-[520px] text-center pointer-events-none">
              <div className="text-5xl md:text-6xl leading-none mb-4 text-primary">
                <FaQuoteRight className="mx-auto" />
              </div>
              <div className="min-h-[140px] md:min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <p className="text-dark font-medium text-[17px] md:text-[21px] leading-[1.65]">
                      {current.quote}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                      className="mx-auto mt-6 h-[1px] w-[70%] origin-center rounded-full"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, #0197B2 40%, #5ACB2A 60%, transparent 100%)' }}
                    />
                    <div className="mt-5">
                      <div className="flex justify-center gap-1.5 text-lg mb-2" style={{ color: '#5ACB2A' }}>
                        {[...Array(Math.floor(current.rating ?? 5))].map((_, i) => (
                          <motion.div
                            key={`star-${i}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                          >
                            <FaStar />
                          </motion.div>
                        ))}
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-gray-500"
                      >
                        — <span className="text-dark font-semibold">{current.name}</span>{' '}
                        <span className="text-gray-400">{current.designation}</span>
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
