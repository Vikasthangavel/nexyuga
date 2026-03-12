import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import { BsMusicNoteBeamed, BsStarFill } from 'react-icons/bs';
import { TbMathSymbols } from 'react-icons/tb';
import heroImg from '../assets/heroimage.png';
import heroImg2 from '../assets/heroimage2.png';

/* ── Count-up stat card ──────────────────────────────────────── */
function CountStat({ target, suffix, label, color, delay }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(count, target, {
            duration: 1.8,
            delay,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="group cursor-default px-5 py-3 rounded-2xl border"
      style={{ borderColor: color + '30', backgroundColor: color + '08' }}
    >
      <p className="font-heading text-2xl font-extrabold" style={{ color }}>
        {display}{suffix}
      </p>
      <p className="text-xs text-dark/50 mt-0.5 font-medium">{label}</p>
    </motion.div>
  );
}

/* ── Cycling words ───────────────────────────────────────────── */
const CYCLING_WORDS = ['Independence', 'Confidence', 'Joy', 'Growth'];


const floatingItems = [
  { icon: 'A', x: '10%', y: '20%', delay: 0, color: '#5ACB2A', size: 'text-4xl' },
  { icon: 'B', x: '85%', y: '15%', delay: 0.5, color: '#0197B2', size: 'text-3xl' },
  { icon: 'C', x: '75%', y: '70%', delay: 1, color: '#06B6D4', size: 'text-5xl' },
  { icon: '1', x: '15%', y: '65%', delay: 0.3, color: '#0EA5E9', size: 'text-3xl' },
  { icon: '2', x: '90%', y: '45%', delay: 0.8, color: '#14B8A6', size: 'text-4xl' },
  { icon: '3', x: '50%', y: '80%', delay: 1.2, color: '#10B981', size: 'text-3xl' },
  { icon: '🎨', x: '5%', y: '45%', delay: 0.6, color: '#5ACB2A', size: 'text-3xl' },
  { icon: '🧩', x: '92%', y: '70%', delay: 1.5, color: '#0197B2', size: 'text-2xl' },
  { icon: '📐', x: '40%', y: '10%', delay: 0.4, color: '#06B6D4', size: 'text-2xl' },
];

/* 3D wiggle spring config */
const wiggleTransition = { type: 'spring', stiffness: 300, damping: 10 };
const heroImages = [heroImg, heroImg2];

export default function Hero() {
  const [buttonHovered, setButtonHovered] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const timerRef = useRef(null);

  // word-cycle every 2.5 s
  useEffect(() => {
    const id = setInterval(() => setWordIndex((w) => (w + 1) % CYCLING_WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setImgIndex((p) => (p + 1) % heroImages.length), 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleHoverFlip = () => {
    setImgIndex((p) => (p + 1) % heroImages.length);
    resetTimer();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Animated blob backgrounds with 3D morphing */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 blur-3xl"
        animate={{
          borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'],
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-secondary/10 blur-3xl"
        animate={{
          borderRadius: ['30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%'],
          scale: [1, 1.15, 1],
          rotate: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 blur-2xl"
        animate={{
          borderRadius: ['50% 50% 50% 50%', '30% 70% 50% 50%', '50% 50% 70% 30%', '50% 50% 50% 50%'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating educational items with 3D spin */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute font-heading font-bold ${item.size} pointer-events-none select-none`}
          style={{ left: item.x, top: item.y, color: item.color, opacity: 0.25 }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            rotateY: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Floating music notes with wobble */}
      <motion.div
        className="absolute top-[30%] right-[20%] text-secondary/25 pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, 15, -15, 0], rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <BsMusicNoteBeamed size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] left-[8%] text-accent/25 pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: [0, 30, -30, 0], scale: [1, 1.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <BsStarFill size={30} />
      </motion.div>
      <motion.div
        className="absolute top-[60%] right-[10%] text-primary/25 pointer-events-none"
        animate={{ y: [0, -12, 0], rotateZ: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, delay: 0.5, ease: 'linear' }}
        aria-hidden="true"
      >
        <TbMathSymbols size={35} />
      </motion.div>



      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ perspective: 1000 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              Social Impact Startup
            </motion.span>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block"
              >
                Empowering{' '}
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 30, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 60 }}
                  transition={{ duration: 0.45, type: 'spring', stiffness: 180 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary inline-block"
                  style={{ WebkitBackgroundClip: 'text', display: 'inline-block', perspective: 400 }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>{' '}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="inline-block"
              >
                Through{' '}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
                className="relative inline-block"
                style={{ perspective: 600 }}
              >
                Touch &amp; Audio
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <motion.path
                    d="M2 8 Q50 2 100 6 T198 4"
                    stroke="#06B6D4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                  />
                </svg>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-dark/60 mb-8 max-w-lg leading-relaxed"
            >
              Accessible education for everyone. We create tactile and audio learning tools that help visually impaired children learn independently through touch and sound.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#studies"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 30px rgba(1,151,178,0.5)',
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.92, rotateX: 10 }}
                onMouseEnter={() => setButtonHovered('explore')}
                onMouseLeave={() => setButtonHovered(null)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-xl shadow-primary/25 transition-all"
                style={{ perspective: 600 }}
              >
                Explore Innovations
                <motion.span
                  animate={buttonHovered === 'explore' ? { x: [0, 5, 0], rotate: [0, 15, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <FaArrowRight className="text-sm" />
                </motion.span>
              </motion.a>
              <motion.a
                href="#video"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 25px rgba(33,150,243,0.3)',
                }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-dark font-semibold rounded-full shadow-lg border border-gray-200 hover:border-primary/30 transition-all"
              >
                <motion.span
                  className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay className="text-xs ml-0.5" />
                </motion.span>
                Watch Video
              </motion.a>
            </motion.div>

            {/* Animated stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-6 mt-10"
            >
              {[
                { target: 500, suffix: '+', label: 'Children Helped', color: '#0197B2' },
                { target: 10, suffix: '+', label: 'Learning Tools', color: '#5ACB2A' },
                { target: 5, suffix: '+', label: 'States Reached', color: '#06B6D4' },
              ].map((stat, i) => (
                <CountStat key={i} {...stat} delay={1.2 + i * 0.2} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right – 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            style={{ perspective: 1200 }}
          >
            {/* Blob behind with 3D rotation */}
            <motion.div
              className="absolute w-[90%] h-[90%] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-xl"
              animate={{
                borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main illustration card with 3D float + tilt */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateX: [0, 3, -3, 0],
                rotateY: [0, -5, 5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03, rotateY: -8 }}
              className="relative z-10 max-w-md w-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative" style={{ transform: 'translateZ(20px)' }} onMouseEnter={handleHoverFlip}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={imgIndex}
                      src={heroImages[imgIndex]}
                      alt="Nexyuga Innovations – empowering visually impaired children"
                      className="w-full h-auto rounded-3xl object-contain"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                {/* Floating badges with 3D pop */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotateZ: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  className="absolute -top-4 -right-4 w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
                  style={{ transform: 'translateZ(40px)' }}
                  aria-hidden="true"
                >
                  <BsMusicNoteBeamed className="text-secondary" size={22} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  whileHover={{ scale: 1.3, rotate: -15 }}
                  className="absolute -bottom-3 -left-4 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center shadow-lg cursor-pointer"
                  style={{ transform: 'translateZ(30px)' }}
                  aria-hidden="true"
                >
                  <span className="font-heading font-bold text-accent text-sm">Nexyuga  </span>
                </motion.div>
                {/* Extra fun badge */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 -right-6 w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center text-lg"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
