import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Video spotlight">
      {/* Animated morphing blob */}
      <motion.div
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '50% 50% 40% 60% / 40% 50% 60% 50%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          scale: [1, 1.05, 0.95, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 mx-auto my-auto w-[80%] h-[70%] bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – Text */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, type: 'spring' }}
            style={{ perspective: 800 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.1, rotate: -3 }}
            >
              🎬 Spotlight
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6 leading-tight">
              Discover How We Inspire{' '}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.08, rotate: 3 }}
              >
                Independence
              </motion.span>{' '}
              Through the Magic of Touch{' '}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </h2>
            <p className="text-dark/60 leading-relaxed mb-6">
              Watch our story unfold — see how our tactile learning kits and audio tools are transforming classrooms and empowering visually impaired children to explore knowledge on their own terms. 🎧📚
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  { bg: '#0197B2', emoji: '👧' },
                  { bg: '#5ACB2A', emoji: '👦' },
                  { bg: '#06B6D4', emoji: '👩' },
                  { bg: '#14B8A6', emoji: '🧑' },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-sm"
                    style={{ backgroundColor: c.bg }}
                    whileHover={{ scale: 1.3, zIndex: 10, rotate: [0, 10, -10, 0] }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {c.emoji}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-dark/50">
                <span className="font-semibold text-dark">2K+</span> people watched 🎉
              </p>
            </div>
          </motion.div>

          {/* Right – Video card with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                rotateY: -5,
                rotateX: 3,
                boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
              }}
              className="relative bg-gradient-to-br from-dark to-dark-light rounded-3xl overflow-hidden shadow-2xl aspect-video group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <AnimatePresence mode="wait">
                {!playing ? (
                  <motion.div
                    key="thumbnail"
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setPlaying(true)}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    role="button"
                    aria-label="Play video"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
                  >
                    {/* YouTube thumbnail */}
                    <img
                      src="https://img.youtube.com/vi/U79oCZsotd8/maxresdefault.jpg"
                      alt="Nexyuga Innovations video thumbnail"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark/30" />

                    {/* 3D Play button with pulse ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.85 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/30"
                          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/20"
                          animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-all duration-300 shadow-xl"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(1,151,178,0.4)',
                              '0 0 30px 10px rgba(1,151,178,0.6)',
                              '0 0 0 0 rgba(1,151,178,0.4)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaPlay className="text-white text-xl ml-1" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="player"
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
