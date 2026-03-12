import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaHandshake, FaBalanceScale } from 'react-icons/fa';
import sdg4Img from '../assets/SDG4.png';
import sdg11Img from '../assets/SDG11.jpg';
import sdg17Img from '../assets/SDG17.jpg';

const goals = [
  {
    icon: FaGraduationCap,
    title: 'Quality Education',
    sdg: 'SDG 4',
    description: 'Ensuring inclusive and equitable quality education for all, promoting lifelong learning opportunities.',
    color: '#E81D2C',
    bg: '#FDEAEA',
    emoji: '📚',
    image: sdg4Img,
    funFact: 'Education is the most powerful weapon!',
  },
  {
    icon: FaBalanceScale,
    title: 'Reduced Inequalities',
    sdg: 'SDG 10',
    description: 'Reducing inequality within and among countries by empowering the differently abled.',
    color: '#DD1367',
    bg: '#FCE4EC',
    emoji: '⚖️',
    image: sdg11Img,
    funFact: 'Every child deserves equal opportunity!',
  },
  {
    icon: FaHandshake,
    title: 'Partnerships for Goals',
    sdg: 'SDG 17',
    description: 'Strengthening the means of implementation and revitalising global partnerships for sustainable development.',
    color: '#19486A',
    bg: '#E3F2FD',
    emoji: '🤝',
    image: sdg17Img,
    funFact: 'Together we go further!',
  },
];

export default function SDGGoals() {
  const [flipped, setFlipped] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="SDG Goals">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Sustainable Development Goals
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Aligned with <span className="text-primary">Global Goals</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
              className="group relative cursor-pointer h-full"
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <div className="relative w-full h-full" style={{ minHeight: 420 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {flipped !== i ? (
                    /* Front face */
                    <motion.div
                      key="front"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col"
                      whileHover={{
                        y: -12,
                        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col flex-1"
                      >
                        <motion.div
                          className="mb-4 overflow-hidden rounded-2xl flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <img
                            src={goal.image}
                            alt={goal.title}
                            className="w-full h-32 object-cover rounded-2xl"
                          />
                        </motion.div>

                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                          style={{ backgroundColor: goal.bg, color: goal.color }}
                        >
                          {goal.sdg}
                        </span>

                        <h3 className="font-heading text-xl font-bold text-dark mb-3">{goal.title}</h3>
                        <p className="text-dark/60 leading-relaxed text-sm">{goal.description}</p>
                      </motion.div>

                      <p className="text-xs text-dark/30 mt-4 flex items-center gap-1">
                        <motion.span animate={{ rotateY: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>👆</motion.span>
                        Tap to flip!
                      </p>
                    </motion.div>
                  ) : (
                    /* Back face */
                    <motion.div
                      key="back"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${goal.color}, ${goal.color}CC)`,
                      }}
                    >
                      <motion.span className="text-6xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        {goal.emoji}
                      </motion.span>
                      <h3 className="font-heading text-2xl font-bold mb-3">{goal.title}</h3>
                      <p className="text-white/90 text-center text-lg font-medium italic">"{goal.funFact}"</p>
                      <motion.p
                        className="mt-4 text-sm text-white/60"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Tap to flip back 🔄
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
