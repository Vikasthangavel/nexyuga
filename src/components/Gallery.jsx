import { motion } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';

// 7 columns heart pattern
const heartPattern = [
  0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 0, 0, 0,
];

const VISIBLE_SLOTS = heartPattern.filter(s => s === 1).length; // 27

export default function Gallery() {
  const { data, loading } = useCollection('gallery');

  // If nothing uploaded yet, render nothing
  if (!loading && data.length === 0) return null;

  // Tile data to fill all 27 visible heart slots
  const filled = data.length > 0
    ? Array.from({ length: VISIBLE_SLOTS }, (_, i) => data[i % data.length])
    : [];

  let imgIndex = 0;

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

        {/* Heart Grid */}
        {!loading && filled.length > 0 && (
          <div className="relative w-full max-w-[800px] mx-auto mt-10 p-2 sm:p-4 perspective-[1000px]">
            {/* Outer Pulsing Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="absolute w-[100%] h-[100%] rounded-full border border-primary/30"
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-[115%] h-[115%] rounded-full border border-primary/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-[130%] h-[130%] rounded-full border border-primary/10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0, 0.1] }}
                transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Core glow */}
              <motion.div
                className="absolute w-[80%] h-[80%] bg-primary/10 blur-[80px] rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            
            <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {heartPattern.map((slot, i) => {
                if (slot === 0) return <div key={`empty-${i}`} className="col-span-1" />;
                const item = filled[imgIndex % filled.length];
                imgIndex++;
                return (
                  <motion.div
                    key={`img-${i}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '50px' }}
                    transition={{ duration: 0.5, delay: Math.random() * 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.15, zIndex: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                    className="relative group rounded-md md:rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm aspect-square border border-gray-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || 'Gallery'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
