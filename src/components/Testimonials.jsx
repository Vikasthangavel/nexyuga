import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const testimonials = [
  {
    quote: 'This will help children learn easily – such a nice product. The tactile elements are thoughtfully designed and kids absolutely love them.',
    name: 'Dr. Priya Sharma',
    designation: 'Special Educator',
    location: 'Chennai',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=b6e3f4&top=hijab&skinColor=brown',
    color: '#0197B2',
    rating: 5,
    tag: 'Education',
  },
  {
    quote: 'My daughter can now study independently. The braille-audio combination is a game changer for our family. We are forever grateful.',
    name: 'Rajesh Kumar',
    designation: 'Parent',
    location: 'Coimbatore',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh&backgroundColor=c0aede&top=shortRound&skinColor=brown',
    color: '#5ACB2A',
    rating: 5,
    tag: 'Parent',
  },
  {
    quote: 'Nexyuga has made inclusive education a reality. Their innovation bridges a critical gap that existed in our education system for decades.',
    name: 'Anita Desai',
    designation: 'NGO Director',
    location: 'Bengaluru',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Anita&backgroundColor=ffd5dc&top=long&skinColor=light',
    color: '#06B6D4',
    rating: 5,
    tag: 'Social Impact',
  },
  {
    quote: 'The quality and care put into each learning tool is remarkable. It truly empowers the children and gives them confidence to learn.',
    name: 'Prof. Sundar Raman',
    designation: 'Accessibility Researcher',
    location: 'Delhi',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sundar&backgroundColor=d1d4f9&top=shortFlat&facialHair=beardLight&skinColor=brown',
    color: '#14B8A6',
    rating: 4.5,
    tag: 'Research',
  },
];

const reactionEmojis = ['❤️', '👏', '🙌', '⭐', '🎉', '✨', '💖', '🌈'];

function StarRating({ rating, delay = 0 }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => (
        <motion.span
          key={`full-${i}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.08, type: 'spring', stiffness: 400, damping: 12 }}
        >
          <FaStar className="text-amber-400 text-base" />
        </motion.span>
      ))}
      {hasHalf && (
        <motion.span
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + full * 0.08, type: 'spring', stiffness: 400, damping: 12 }}
        >
          <FaStarHalfAlt className="text-amber-400 text-base" />
        </motion.span>
      )}
      {[...Array(5 - full - (hasHalf ? 1 : 0))].map((_, i) => (
        <motion.span
          key={`empty-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + (full + (hasHalf ? 1 : 0) + i) * 0.08, type: 'spring' }}
        >
          <FaStar className="text-gray-200 text-base" />
        </motion.span>
      ))}
      <motion.span
        className="ml-2 text-xs font-bold text-dark/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        {rating}/5
      </motion.span>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const newReactions = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      emoji: reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)],
      x: 15 + Math.random() * 70,
    }));
    setReactions(newReactions);
    const timeout = setTimeout(() => setReactions([]), 2500);
    return () => clearTimeout(timeout);
  }, [current]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const t = testimonials[current];

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 120 : -120, rotateY: dir > 0 ? 25 : -25, scale: 0.92 }),
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -120 : 120, rotateY: dir > 0 ? -25 : 25, scale: 0.92 }),
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Testimonials">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />
      <motion.div
        className="absolute top-20 right-[10%] w-32 h-32 bg-accent/5 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Floating subtle icons */}
      {['💬', '⭐', '❤️', '🎓', '📚'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none opacity-[0.07]"
          style={{ left: `${8 + i * 20}%`, top: `${15 + (i % 3) * 25}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 0.4 }}
          aria-hidden="true"
        >
          {e}
        </motion.div>
      ))}

      {/* Floating reaction emojis */}
      <AnimatePresence>
        {reactions.map((r) => (
          <motion.div
            key={r.id}
            className="absolute text-2xl pointer-events-none z-20"
            style={{ left: `${r.x}%`, bottom: '30%' }}
            initial={{ y: 0, opacity: 1, scale: 0 }}
            animate={{ y: -150, opacity: 0, scale: [0, 1.4, 1.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            {r.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5"
            whileHover={{ scale: 1.05 }}
          >
            <HiSparkles className="text-base" />
            Testimonials
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            What People{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Say
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.span>
          </h2>
          <p className="text-dark/45 mt-3 max-w-md mx-auto text-sm">
            Hear from educators, parents, and partners who've seen the impact firsthand
          </p>
        </motion.div>

        {/* Mini avatar preview row */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {testimonials.map((person, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="relative"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View testimonial from ${person.name}`}
            >
              <motion.div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-3 transition-all duration-300 ${
                  i === current
                    ? 'border-primary shadow-lg shadow-primary/25 scale-110'
                    : 'border-gray-200 opacity-50 grayscale'
                }`}
                animate={i === current ? { borderColor: t.color } : {}}
                style={{ borderWidth: 3 }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover bg-gray-100"
                  loading="lazy"
                />
              </motion.div>
              {i === current && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.color }}
                  layoutId="activeAvatar"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div
          className="relative"
          style={{ perspective: 1400 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, type: 'spring', stiffness: 90, damping: 18 }}
              className="bg-white rounded-[2rem] shadow-xl border border-gray-100/80 overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                {/* Left — Profile panel */}
                <div
                  className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${t.color}12, ${t.color}08)` }}
                >
                  {/* Decorative circles */}
                  <motion.div
                    className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-10"
                    style={{ backgroundColor: t.color }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10"
                    style={{ backgroundColor: t.color }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    aria-hidden="true"
                  />

                  {/* Profile Image */}
                  <motion.div
                    className="relative mb-5"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <motion.div
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 shadow-xl mx-auto"
                      style={{ borderColor: t.color }}
                      whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover bg-white"
                      />
                    </motion.div>
                    {/* Online indicator */}
                    <motion.div
                      className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white"
                      style={{ backgroundColor: t.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Sparkle */}
                    <motion.div
                      className="absolute -top-1 -right-1 text-lg"
                      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>

                  {/* Name & Designation */}
                  <motion.h3
                    className="font-heading font-bold text-lg text-dark mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t.name}
                  </motion.h3>
                  <motion.p
                    className="text-sm font-medium mb-0.5"
                    style={{ color: t.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {t.designation}
                  </motion.p>
                  <motion.p
                    className="text-xs text-dark/40 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    📍 {t.location}
                  </motion.p>

                  {/* Tag pill */}
                  <motion.span
                    className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: t.color }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {t.tag}
                  </motion.span>

                  {/* Rating under profile */}
                  <div className="mt-4">
                    <StarRating rating={t.rating} delay={0.4} />
                  </div>
                </div>

                {/* Right — Quote content */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative">
                  {/* Large quote mark */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute top-6 right-8"
                    aria-hidden="true"
                  >
                    <FaQuoteLeft size={80} style={{ color: t.color }} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaQuoteLeft
                      size={24}
                      className="mb-4 opacity-30"
                      style={{ color: t.color }}
                      aria-hidden="true"
                    />
                  </motion.div>

                  <motion.blockquote
                    className="text-lg sm:text-xl lg:text-[1.35rem] text-dark/75 leading-relaxed font-medium mb-8 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    "{t.quote}"
                  </motion.blockquote>

                  {/* Bottom info bar — mobile only name repeat */}
                  <motion.div
                    className="flex items-center gap-3 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
                      style={{ borderColor: t.color }}
                    >
                      <img src={t.image} alt="" className="w-full h-full object-cover bg-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-dark">{t.name}</p>
                      <p className="text-xs" style={{ color: t.color }}>{t.designation}, {t.location}</p>
                    </div>
                  </motion.div>

                  {/* Decorative line */}
                  <motion.div
                    className="h-1 rounded-full mt-auto"
                    style={{ backgroundColor: t.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.15, backgroundColor: '#0197B2', color: '#fff', boxShadow: '0 8px 25px rgba(1,151,178,0.3)' }}
              whileTap={{ scale: 0.85, rotate: -20 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all text-dark/60"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={16} />
            </motion.button>

            <div className="flex gap-2.5" role="tablist" aria-label="Testimonial indicators">
              {testimonials.map((person, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 32 : 12,
                    height: 12,
                    backgroundColor: i === current ? person.color : '#D1D5DB',
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.8 }}
                  animate={i === current ? { scale: [1, 1.1, 1] } : {}}
                  transition={i === current ? { duration: 1.5, repeat: Infinity } : {}}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`${person.name}'s testimonial`}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              whileHover={{ scale: 1.15, backgroundColor: '#0197B2', color: '#fff', boxShadow: '0 8px 25px rgba(1,151,178,0.3)' }}
              whileTap={{ scale: 0.85, rotate: 20 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all text-dark/60"
              aria-label="Next testimonial"
            >
              <FaChevronRight size={16} />
            </motion.button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-xs text-dark/25 mt-4">Hover to pause • Click avatars to navigate</p>
        </div>
      </div>
    </section>
  );
}
