import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useCollection } from '../hooks/useCollection';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { data: achievements } = useCollection('achievements');

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

      {/* Our Achievements Section */}
      {achievements && achievements.length > 0 && (
        <div className="max-w-7xl w-full mx-auto relative z-10 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Achievements</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(1,151,178,0.1)] border border-gray-100/50 flex flex-col items-center justify-between p-8 aspect-[4/3] group transition-all duration-300 hover:-translate-y-1"
              >
                {/* Center Event Image (Moved to top of card flex) */}
                <div className="flex-1 w-full flex items-center justify-center py-2 min-h-[120px]">
                  <img 
                    src={achievement.eventImage} 
                    alt={achievement.title} 
                    className="max-h-full max-w-[85%] object-contain" 
                  />
                </div>

                {/* Bottom Section: Title & Tiny Logos */}
                <div className="w-full flex flex-col items-center justify-end gap-3 mt-4">
                  <h4 className="font-bold text-primary text-center tracking-wide text-lg">{achievement.title}</h4>
                  
                  {achievement.poweredByImages && achievement.poweredByImages.length > 0 && (
                    <div className="flex items-center justify-center gap-4 flex-wrap mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       {achievement.poweredByImages.map((logo, idx) => (
                         <img 
                           key={idx}
                           src={logo} 
                           alt="Powered By" 
                           className="h-7 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                         />
                       ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
