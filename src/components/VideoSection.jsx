import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const EASE = [0.55, 0.085, 0, 0.99];

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="video" ref={sectionRef} className="py-28 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-14 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:w-5/12"
          style={{ y: textY }}
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block">
            Spotlight
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-5 leading-tight">
            Discover How We Inspire{' '}
            <span className="gradient-text">Independence</span>
          </h2>
          <p className="text-gray-500 text-[16px] font-light leading-relaxed mb-8">
            Watch our story unfold and see how our tactile learning kits and audio tools are transforming classrooms, empowering visually impaired children to explore knowledge on their own terms.
          </p>
          <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-dark">2K+</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider mt-1">Viewers</span>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-dark">100%</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider mt-1">Commitment</span>
            </div>
          </div>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="lg:w-7/12 w-full"
          style={{ y: videoY }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video border border-gray-100 shadow-lg">
            <AnimatePresence mode="wait">
              {!playing ? (
                <motion.div
                  key="thumbnail"
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setPlaying(true)}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  role="button"
                  aria-label="Play video"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
                >
                  <img
                    src="https://img.youtube.com/vi/U79oCZsotd8/maxresdefault.jpg"
                    alt="Nexyuga Innovations video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D2E3B" className="ml-1">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="player" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/U79oCZsotd8?autoplay=1&rel=0"
                    title="Nexyuga Innovations — Our Story"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
