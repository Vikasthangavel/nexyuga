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

function LogoPlaceholder({ name, image }) {
  return (
    <motion.div
<<<<<<< HEAD
      className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-20 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 relative group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
      whileHover={{ y: -4 }}
      aria-label={`Partner: ${name}`}
    >
      <div className="w-full h-full p-4 flex items-center justify-center pointer-events-none">
        <img 
          src={image} 
          alt={name} 
          className="max-w-full max-h-full object-contain transition-all duration-500 hover:scale-105" 
        />
      </div>
=======
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
>>>>>>> fcfcf5d22e9d51d640cd6a2b8a40887a2e0c4abf
    </motion.div>
  );
}

export default function Trusted() {
  return (
    <section className="py-20 bg-white relative overflow-hidden flex flex-col items-center border-y border-gray-50" aria-label="Trusted partners">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3 block">
            Supported & Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight">
            Our Ecosystem Partners
          </h2>
        </motion.div>

        {/* Marquee Wrapper */}
        <div className="w-full relative overflow-hidden">
          {/* Elegant fade edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />
          
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max py-4 shrink-0 items-center">
            {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <LogoPlaceholder key={i} name={p.name} image={p.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

