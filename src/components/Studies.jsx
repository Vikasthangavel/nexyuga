import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaCalculator, FaFlask, FaGlobeAmericas } from 'react-icons/fa';
import literatureImg from '../assets/literature.png';
import mathImg from '../assets/mathematics.png';
import scienceImg from '../assets/science.png';
import socialImg from '../assets/social_studies.png';

const subjects = [
  {
    icon: FaBookOpen,
    title: 'Literature',
    description: 'Stories and poems brought to life through tactile braille pages and narrated audio companions.',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    borderColor: '#CFFAFE',
    illustration: literatureImg,
    funEmojis: ['📚', '✍️', '📜', '🎭'],
  },
  {
    icon: FaCalculator,
    title: 'Mathematics',
    description: 'Numbers, shapes, and equations made tangible with 3D printed models and audio guidance.',
    color: '#0197B2',
    bgColor: '#E0F7FA',
    borderColor: '#B2EBF2',
    illustration: mathImg,
    funEmojis: ['📐', '🧮', '📏', '➕'],
  },
  {
    icon: FaFlask,
    title: 'Science',
    description: 'Explore the wonders of science through textured diagrams and sound-based experiments.',
    color: '#5ACB2A',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    illustration: scienceImg,
    funEmojis: ['🧬', '⚗️', '🔭', '🌿'],
  },
  {
    icon: FaGlobeAmericas,
    title: 'Social Studies',
    description: 'Maps, cultures, and history reimagined with raised surfaces and immersive audio journeys.',
    color: '#14B8A6',
    bgColor: '#F0FDFA',
    borderColor: '#CCFBF1',
    illustration: socialImg,
    funEmojis: ['🗺️', '🏛️', '🗿', '🌏'],
  },
];

export default function Studies() {
  const [tappedCard, setTappedCard] = useState(null);

  return (
    <section id="studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 relative overflow-hidden" aria-label="Subject areas">
      <div className="absolute top-10 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Fun floating emojis */}
      {['📚', '✏️', '🎨', '🧩', '🎵'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none opacity-15"
          style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 25}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
          aria-hidden="true"
        >
          {e}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            🎓 Our Innovations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            Learning{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Reimagined
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </h2>
          <p className="text-dark/50 max-w-2xl mx-auto">
            Each subject is carefully designed with tactile and audio elements that make learning an adventure! 🎪
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 150 }}
              whileHover={{
                y: -15,
                rotateX: -5,
                rotateY: 5,
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 15 },
              }}
              whileTap={{
                scale: 0.95,
                rotateX: 10,
                transition: { type: 'spring' },
              }}
              onClick={() => setTappedCard(tappedCard === i ? null : i)}
              className="group cursor-pointer"
              style={{ perspective: 800 }}
            >
              <div
                className="relative rounded-3xl p-6 h-full border-2 transition-all duration-300 hover:shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: subject.bgColor,
                  borderColor: subject.borderColor,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D floating illustration with bounce */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 overflow-hidden rounded-2xl"
                  style={{ transform: 'translateZ(30px)' }}
                  aria-hidden="true"
                >
                  <img
                    src={subject.illustration}
                    alt={subject.title}
                    className="w-full h-36 object-cover rounded-2xl"
                  />
                </motion.div>

                {/* Flying mini-emojis on tap */}
                {tappedCard === i && subject.funEmojis.map((emoji, j) => (
                  <motion.span
                    key={j}
                    className="absolute text-xl pointer-events-none"
                    initial={{ x: '50%', y: '50%', opacity: 1, scale: 0 }}
                    animate={{
                      x: `${20 + j * 20}%`,
                      y: `${-20 - j * 15}%`,
                      opacity: [1, 1, 0],
                      scale: [0, 1.5, 0.5],
                      rotate: [0, 180 + j * 90],
                    }}
                    transition={{ duration: 1, delay: j * 0.1 }}
                  >
                    {emoji}
                  </motion.span>
                ))}

                {/* Icon with 3D spin on hover */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: subject.color + '20', transform: 'translateZ(20px)' }}
                  whileHover={{ rotateY: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <subject.icon size={22} style={{ color: subject.color }} />
                </motion.div>

                <h3 className="font-heading text-lg font-bold text-dark mb-2" style={{ transform: 'translateZ(15px)' }}>
                  {subject.title}
                </h3>
                <p className="text-dark/60 text-sm leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
                  {subject.description}
                </p>

                {/* Animated bottom bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl"
                  style={{ backgroundColor: subject.color }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner spinning decoration */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-15"
                  style={{ backgroundColor: subject.color }}
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />

                {/* Fun "NEW" badge on first card */}
                {i === 0 && (
                  <motion.div
                    className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full shadow-md"
                    animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    NEW! ✨
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
