import { motion } from 'framer-motion';
<<<<<<< HEAD
import imgMain from '../assets/Startup/Sub 4.png';
import imgSub1 from '../assets/Startup/Sub 3.png';
import imgSub2 from '../assets/Startup/Sub 2.png';
import imgSub3 from '../assets/Startup/Sub 1.png';
import imgSub4 from '../assets/Startup/Sub 2.png';

const EASE = [0.55, 0.085, 0, 0.99];

const partners = [
  { name: 'StartupTN', image: imgMain },
  { name: 'DST NIDHI', image: imgSub1 },
  { name: 'TBI KEC', image: imgSub2 },
  { name: 'Bharat Rising', image: imgSub3 },
  { name: 'CII', image: imgSub4 },
];

export default function Trusted() {
  const repeated = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-14 bg-gradient-to-r from-cyan-50/50 via-white to-purple-50/50 relative overflow-hidden border-y border-primary/5">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 50%, #0197B2 0%, transparent 50%)',
            'radial-gradient(circle at 100% 50%, #A855F7 0%, transparent 50%)',
            'radial-gradient(circle at 0% 50%, #0197B2 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
=======
import { useCollection } from '../hooks/useCollection';

export default function Trusted() {
  const { data: partners, loading } = useCollection('partners');

  // Show nothing if no partners uploaded yet
  if (!loading && partners.length === 0) return null;

  // Repeat enough times to fill the marquee seamlessly
  const repeated = partners.length > 0
    ? Array.from({ length: Math.ceil(30 / partners.length) * partners.length }, (_, i) => partners[i % partners.length])
    : [];

  return (
    <section
      className="py-20 bg-white relative overflow-hidden flex flex-col items-center border-y border-gray-50"
      aria-label="Trusted partners"
    >
      {/* Subtle blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center text-sm font-medium text-gray-400 tracking-widest uppercase"
        >
<<<<<<< HEAD
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted & Supported By
          </motion.span>
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        {/* Enhanced edge fades with gradient - matching bg colors */}
        <div className="absolute top-0 bottom-0 left-0 w-40 z-10 bg-gradient-to-r from-cyan-50/80 via-white/70 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-40 z-10 bg-gradient-to-l from-purple-50/80 via-white/70 to-transparent" />

        <div className="flex animate-marquee w-max py-4 items-center hover:[animation-play-state:paused]">
          {repeated.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15, y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % partners.length) * 0.1, ease: EASE }}
              className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center px-6 py-3 transition-all duration-500 cursor-pointer group"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-14 w-auto object-contain transition-all duration-500 drop-shadow-md group-hover:drop-shadow-xl"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
=======
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3 block">
            Supported &amp; Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight">
            Our Ecosystem Partners
          </h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Marquee */}
        {!loading && repeated.length > 0 && (
          <div className="w-full relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

            <div className="flex animate-marquee w-max py-4 shrink-0 items-center">
              {repeated.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-20 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 relative group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                  whileHover={{ y: -4 }}
                  aria-label={`Partner: ${p.name}`}
                >
                  <div className="w-full h-full p-4 flex items-center justify-center pointer-events-none">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-all duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
      </div>
    </section>
  );
}
