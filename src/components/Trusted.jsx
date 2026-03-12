import { motion } from 'framer-motion';
import imgMain from '../assets/Startup/Sub 4.png';
import imgSub1 from '../assets/Startup/Sub 3.png';
import imgSub2 from '../assets/Startup/Sub 2.png';
import imgSub3 from '../assets/Startup/Sub 1.png';
import imgSub4 from '../assets/Startup/Sub 2.png';

const partners = [
  { name: 'StartupTN',     image: imgMain  },
  { name: 'DST NIDHI',    image: imgSub1  },
  { name: 'TBI KEC',      image: imgSub2  },
  { name: 'Bharat Rising', image: imgSub3 },
  { name: 'CII',          image: imgSub4  },
];

const COLORS = ['#0197B2', '#5ACB2A', '#06B6D4', '#14B8A6', '#10B981'];

function LogoPlaceholder({ name, image, index }) {
  return (
    <motion.div
      className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative group"
      whileHover={{
        scale: 1.12,
        rotateY: 8,
        rotateX: -4,
        boxShadow: `0 20px 50px ${COLORS[index % COLORS.length]}30`,
        borderColor: COLORS[index % COLORS.length] + '60',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      style={{ perspective: 600 }}
      aria-label={`Partner: ${name}`}
    >
      {/* Pulsing halo ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: `2px solid ${COLORS[index % COLORS.length]}` }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileHover={{ opacity: [0, 0.6, 0], scale: [0.85, 1.08, 1.15] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      <motion.div
        className="w-28 h-12 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
      </motion.div>
    </motion.div>
  );
}

export default function Trusted() {
  return (
    <section className="py-16 bg-white/50 relative overflow-hidden" aria-label="Trusted partners">
      {/* Morphing blobs */}
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 bg-primary/8 rounded-full blur-3xl"
        animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-56 h-56 bg-secondary/8 rounded-full blur-3xl"
        animate={{ borderRadius: ['30% 70% 50% 50%', '60% 40% 30% 70%', '30% 70% 50% 50%'], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />

      {/* Floating particle dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6 + (i % 3) * 4,
            height: 6 + (i % 3) * 4,
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 4) * 18}%`,
            backgroundColor: COLORS[i % COLORS.length],
            opacity: 0.18,
          }}
          animate={{ y: [0, -18, 0], x: [0, i % 2 === 0 ? 10 : -10, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="text-center mb-10"
      >
        {/* Shimmer badge */}
        <motion.span
          className="inline-block px-5 py-1.5 rounded-full text-sm font-semibold mb-3 relative overflow-hidden"
          style={{ backgroundColor: '#0197B210', color: '#0197B2' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
          />
          Supported &amp; Trusted By
        </motion.span>

        <p className="text-sm font-medium text-dark/40 uppercase tracking-widest mb-2">Our Ecosystem</p>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark">
          Our Amazing{' '}
          <motion.span
            className="text-primary inline-block"
            animate={{ backgroundSize: ['100% 3px', '0% 3px', '100% 3px'] }}
            style={{ borderBottom: '3px solid #0197B2', paddingBottom: 2 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Partners
          </motion.span>
        </h2>
      </motion.div>

      {/* Marquee */}
      <div className="overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
            <LogoPlaceholder key={i} name={p.name} image={p.image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

