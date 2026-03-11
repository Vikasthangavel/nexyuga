import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaLightbulb, FaHandsHelping, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const perks = [
  {
    icon: FaLightbulb,
    title: 'Innovation First',
    desc: 'Work on cutting-edge tactile and audio learning tools that are changing lives.',
    color: '#06B6D4',
  },
  {
    icon: FaUsers,
    title: 'Collaborative Culture',
    desc: 'A close-knit team of engineers, designers, and educators building together.',
    color: '#0197B2',
  },
  {
    icon: FaHandsHelping,
    title: 'Social Impact',
    desc: 'Every line of code, every design — directly helps visually impaired children learn.',
    color: '#5ACB2A',
  },
  {
    icon: FaBriefcase,
    title: 'Growth & Learning',
    desc: 'Mentorship, workshops, and the freedom to experiment with new ideas.',
    color: '#14B8A6',
  },
];

const openPositions = [
  // Add real positions here when available. Example:
  // {
  //   title: 'Frontend Developer',
  //   type: 'Full-time',
  //   location: 'Tiruchengode, TN',
  //   description: 'Build beautiful, accessible React interfaces for our learning platform.',
  // },
];

export default function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden" aria-label="Careers">
      {/* ── Hero Banner ── */}
      <div className="relative bg-dark py-24 sm:py-32 overflow-hidden">
        {/* Decorative blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          aria-hidden="true"
        />
        {/* Floating emojis */}
        {['🎯', '💼', '🚀', '✨', '🌟'].map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-xl pointer-events-none opacity-15"
            style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            aria-hidden="true"
          >
            {e}
          </motion.div>
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            style={{ perspective: 800 }}
          >
            Join{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent inline-block"
              style={{ WebkitBackgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Us
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤝
            </motion.span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            <a href="#home" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-primary-light">Join Us</span>
          </motion.div>
        </div>
      </div>

      {/* ── About / Intro ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-bg relative">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="text-base" />
              We're Hiring
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6">
              Join Our Team at{' '}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                Nexyuga Innovations
              </motion.span>
            </h2>
            <motion.p
              className="text-dark/60 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We're on a mission to make learning accessible for everyone, especially visually impaired learners. 
              If you're passionate about creating impact, love experimenting with ideas, and want to grow in a 
              collaborative environment, this is the place for you. 🚀
            </motion.p>
          </motion.div>

          {/* Why join us — perks grid */}
          <div className="grid sm:grid-cols-2 gap-5 mt-12">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 150 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: `0 20px 40px ${perk.color}20`,
                }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm group cursor-default"
                style={{ perspective: 600 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: perk.color + '15' }}
                    whileHover={{ rotateY: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <perk.icon size={22} style={{ color: perk.color }} />
                  </motion.div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-base mb-1">{perk.title}</h3>
                    <p className="text-dark/55 text-sm leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Open Positions ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 relative">
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-2">
              Open{' '}
              <motion.span
                className="text-primary inline-block"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Positions
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💼
              </motion.span>
            </h2>
          </motion.div>

          {openPositions.length > 0 ? (
            <div className="space-y-5">
              {openPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-dark mb-1">{pos.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-dark/50">
                        <span className="inline-flex items-center gap-1">
                          <FaBriefcase className="text-primary" size={12} /> {pos.type}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FaMapMarkerAlt className="text-accent" size={12} /> {pos.location}
                        </span>
                      </div>
                      <p className="text-dark/60 text-sm mt-2 leading-relaxed">{pos.description}</p>
                    </div>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.08, boxShadow: '0 5px 20px rgba(1,151,178,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-full shadow-md whitespace-nowrap"
                    >
                      Apply Now <FaPaperPlane size={12} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center py-16"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <p className="text-primary font-medium text-base mb-2">
                Currently we do not have any openings now.
              </p>
              <p className="text-dark/40 text-sm">
                Please check back later. We're always growing! 🌱
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(1,151,178,0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg text-sm"
              >
                <FaPaperPlane size={13} />
                Send Your Resume Anyway
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
