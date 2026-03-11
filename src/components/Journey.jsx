import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import journeyImg from '../image2.jpeg';

const milestones = [
  { year: '2022', label: 'Idea Born 💡', color: '#5ACB2A' },
  { year: '2023', label: 'First Prototype 🧪', color: '#06B6D4' },
  { year: '2024', label: 'Award Winning 🏆', color: '#0197B2' },
  { year: '2025', label: 'Scaling Up 🚀', color: '#14B8A6' },
];

export default function Journey() {
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Our Journey">
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Text with stagger */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ perspective: 800 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              Our Story 📖
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6 leading-tight">
              From a Vision to a{' '}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.1, rotate: -3 }}
              >
                Movement
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟
              </motion.span>
            </h2>
            <p className="text-dark/60 leading-relaxed mb-4">
              Nexyuga Innovations was born from a simple yet powerful idea — every child deserves the chance to learn, explore, and grow, regardless of physical ability. We design tactile learning kits and audio-enhanced study tools that make education a joyful, independent experience for visually impaired children.
            </p>
            <p className="text-dark/60 leading-relaxed mb-6">
              Working closely with educators, parents, and accessibility experts, our journey has taken us across multiple states, touching the lives of hundreds of young learners.
            </p>

            {/* Fun milestone timeline */}
            <div className="flex flex-wrap gap-3 mb-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }}
                  whileHover={{
                    scale: 1.15,
                    rotateZ: [-3, 3, 0],
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  }}
                  className="px-4 py-2 rounded-2xl text-white text-sm font-bold shadow-md cursor-default"
                  style={{ backgroundColor: m.color }}
                >
                  {m.year} — {m.label}
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#studies"
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 30px rgba(1,151,178,0.5)',
              }}
              whileTap={{ scale: 0.92 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/20"
            >
              Explore More
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <FaArrowRight className="text-sm" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Right – Image with 3D tilt & bounce */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateX: [0, 2, -2, 0],
                rotateY: [0, -3, 3, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02, rotateY: -5, rotateX: 3 }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <img
                  src={journeyImg}
                  alt="Child learning with braille materials"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* 3D floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.2, rotate: 20 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 border border-gray-100 cursor-pointer"
                style={{ transform: 'translateZ(30px)' }}
              >
                <motion.div
                  className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xl">🏆</span>
                </motion.div>
                <div>
                  <p className="font-heading font-bold text-sm text-dark">Award Winning</p>
                  <p className="text-xs text-dark/50">Innovation 2024</p>
                </div>
              </motion.div>

              {/* Extra floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
                className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100"
              >
                <span className="text-lg">🎯</span>
                <span className="font-heading font-bold text-xs text-primary">500+ Lives</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
