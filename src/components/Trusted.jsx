import { motion } from 'framer-motion';
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center text-sm font-medium text-gray-400 tracking-widest uppercase"
        >
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
      </div>
    </section>
  );
}

