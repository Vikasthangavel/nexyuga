import { motion } from 'framer-motion';

const partners = [
  { name: 'Bharat Rising', emoji: '🇮🇳' },
  { name: 'CII', emoji: '🏛️' },
  { name: 'StartupTN', emoji: '🚀' },
  { name: 'DST NIDHI', emoji: '🔬' },
  { name: 'TBI KEC', emoji: '🎓' },
];

const colors = ['#0197B2', '#5ACB2A', '#06B6D4', '#14B8A6', '#10B981'];

function LogoPlaceholder({ name, emoji, index }) {
  return (
    <motion.div
      className="flex-shrink-0 mx-6 sm:mx-10 flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100"
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        rotateX: -5,
        boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
      }}
      style={{ perspective: 600 }}
      aria-label={`Partner: ${name}`}
    >
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm"
        style={{ backgroundColor: colors[index % colors.length] }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
      </motion.div>
      <span className="font-heading font-semibold text-dark/70 text-sm whitespace-nowrap">{name}</span>
    </motion.div>
  );
}

export default function Trusted() {
  return (
    <section className="py-16 bg-white/50" aria-label="Trusted partners">
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="text-center mb-10"
        style={{ perspective: 800 }}
      >
        <p className="text-sm font-medium text-dark/40 uppercase tracking-widest mb-2">Trusted By</p>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark">
          Our Amazing <span className="text-primary">Partners</span>{' '}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤝
          </motion.span>
        </h2>
      </motion.div>

      {/* Marquee with hover pause */}
      <div className="overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
            <LogoPlaceholder key={i} name={p.name} emoji={p.emoji} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
