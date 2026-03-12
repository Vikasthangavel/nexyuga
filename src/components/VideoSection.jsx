import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden flex flex-col items-center" aria-label="Video spotlight">
      
      {/* Subtle geometric background accents */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left – Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-4 block">
            Spotlight
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-6 leading-tight">
            Discover How We Inspire{' '}
            <span className="text-primary italic font-light pr-2">
              Independence
            </span>
          </h2>
          
          <div className="space-y-6 text-gray-500 text-lg font-light leading-relaxed mb-8">
            <p>
              Watch our story unfold and see how our tactile learning kits and audio tools are transforming classrooms. We empower visually impaired children to explore knowledge on their own terms, providing the foundation for a more inclusive educational future.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-dark mb-1">2K+</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Viewers Reached</span>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-dark mb-1">100%</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Commitment</span>
            </div>
          </div>
        </motion.div>

        {/* Right – Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative rounded-3xl p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 bg-white group">
            <div className="rounded-2xl overflow-hidden relative aspect-video bg-gray-100">
              <AnimatePresence mode="wait">
                {!playing ? (
                  <motion.div
                    key="thumbnail"
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setPlaying(true)}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    role="button"
                    aria-label="Play video"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
                  >
                    <img
                      src="https://img.youtube.com/vi/U79oCZsotd8/maxresdefault.jpg"
                      alt="Nexyuga Innovations video thumbnail"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                      loading="lazy"
                    />
                    {/* Sophisticated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80" />

                    {/* Elegant Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-500 shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
                        <FaPlay className="text-white text-xl ml-1 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="player"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
