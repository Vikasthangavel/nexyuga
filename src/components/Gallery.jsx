import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../assets/gallery/1.jpg';
import img2 from '../assets/gallery/2.jpg';
import img7 from '../assets/gallery/7.jpg';
import img8 from '../assets/gallery/8.jpg';
import img9 from '../assets/gallery/9.jpg';
import imgEmpower from '../assets/gallery/empower-iit-delhi.jpg';
import imgJBF from '../assets/gallery/jbf-bharat-impact.jpg';
import imgAkshay from '../assets/gallery/pilot-akshay-saxena.jpg';
import imgPramod from '../assets/gallery/pilot-pramod-s.png';

const galleryItems = [
  { title: 'Empower 2025 – IIT Delhi Pitch Showcase', color: '#0197B2', span: 'col-span-2 row-span-2', emoji: '🚀', image: imgEmpower },
  { title: 'Featured in JBF Bharat Impact 2.0', color: '#06B6D4', span: '', emoji: '🌟', image: imgJBF },
  { title: 'Piloted with Akshay Saxena, Avanti Fellows', color: '#5ACB2A', span: '', emoji: '🤝', image: imgAkshay },
  { title: 'Piloted with Mr. Pramod S, TTI Division', color: '#14B8A6', span: '', emoji: '🔬', image: imgPramod },
  { title: 'Gallery Moment', color: '#10B981', span: '', emoji: '📸', image: img1 },
  { title: 'Gallery Moment', color: '#06B6D4', span: '', emoji: '🎨', image: img2 },
  { title: 'Gallery Moment', color: '#0197B2', span: '', emoji: '📷', image: img7 },
  { title: 'Gallery Moment', color: '#5ACB2A', span: '', emoji: '🌈', image: img8 },
  { title: 'Gallery Moment', color: '#14B8A6', span: 'col-span-2', emoji: '✨', image: img9 },
];

const SPARKS = ['✨', '⭐', '💫', '🌟', '✦'];

export default function Gallery() {
  const [sparks, setSparks] = useState([]);

  const fireSparks = (i) => {
    const burst = Array.from({ length: 5 }, (_, j) => ({
      id: Date.now() + j,
      cardIndex: i,
      emoji: SPARKS[j % SPARKS.length],
      angle: j * 72,
    }));
    setSparks((prev) => [...prev, ...burst]);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !burst.find((b) => b.id === s.id))), 900);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 relative overflow-hidden" aria-label="Gallery">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-1/3 w-64 h-64 bg-primary/6 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-48 h-48 bg-secondary/6 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Animated badge */}
          <motion.span
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            Gallery
          </motion.span>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Moments of{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ scale: [1, 1.06, 1], color: ['#0197B2', '#06B6D4', '#0197B2'] }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              Impact
            </motion.span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mt-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.07, type: 'spring', stiffness: 160 }}
              whileHover={{
                scale: 1.07,
                rotateX: -3,
                rotateY: 4,
                zIndex: 10,
                boxShadow: `0 25px 50px ${item.color}40`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fireSparks(i)}
              className={`${item.span} group relative rounded-2xl overflow-hidden cursor-pointer shadow-md`}
              style={{ perspective: 800 }}
            >
              {/* Real image with zoom */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: item.color + '22' }}
                />
              </div>

              {/* Sparkle burst on click */}
              <AnimatePresence>
                {sparks.filter(s => s.cardIndex === i).map((s) => (
                  <motion.span
                    key={s.id}
                    className="absolute text-xl pointer-events-none z-30 left-1/2 top-1/2"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: Math.cos((s.angle * Math.PI) / 180) * 55,
                      y: Math.sin((s.angle * Math.PI) / 180) * 55,
                      opacity: [1, 0],
                      scale: [0, 1.6, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {s.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>

              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <motion.p
                    className="text-white font-heading font-semibold text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.emoji} {item.title}
                  </motion.p>
                </div>
              </motion.div>

              {/* Corner emoji pop */}
              <motion.div
                className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {item.emoji}
              </motion.div>

              {/* Colour border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                whileHover={{ borderColor: item.color + 'AA' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
