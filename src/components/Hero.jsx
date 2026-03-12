<<<<<<< HEAD
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

import heroImg from '../assets/heroimage.png';
import heroImg2 from '../assets/heroimage2.png';

import t1 from '../assets/testimonials/1.svg';
import t2 from '../assets/testimonials/2.svg';
import t3 from '../assets/testimonials/3.svg';
import t4 from '../assets/testimonials/4.svg';

const EASE = [0.55, 0.085, 0, 0.99];

/* Cinematic text reveal component */
const TextReveal = ({ children, delay = 0, className = '' }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: '120%', rotateX: -80 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        className="inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/* Character-by-character reveal */
const CharReveal = ({ text, delay = 0, className = '', stagger = 0.03 }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * stagger, ease: EASE }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  /* Track mouse for parallax effects */
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-12, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

=======
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import heroImg1 from '../assets/heroimage.png';
import heroImg2 from '../assets/heroimage2.png';

const heroImages = [heroImg1, heroImg2];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/20"
    >
<<<<<<< HEAD
      {/* Animated gradient background orbs */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0197B2 1px, transparent 1px),
                           linear-gradient(to bottom, #0197B2 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#A855F7' : '#F97316',
            opacity: 0.4 + Math.random() * 0.3,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Cinematic light streak */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24 min-h-screen flex items-center relative z-10">
        <div className="grid md:grid-cols-[1.2fr_1.8fr] gap-12 md:gap-8 items-center w-full">
          
          {/* ── LEFT: Tilted Image Card with Decorative Lines ── */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: -12 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="relative flex justify-center md:justify-end z-10"
            style={{
              x: mousePosition.x * -10,
              y: mousePosition.y * -10,
            }}
          >
            {/* Curved decorative lines behind card */}
            <svg
              className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 w-[300px] h-[400px] pointer-events-none"
              viewBox="0 0 200 400"
              fill="none"
=======
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Visual (Curve & Carousel Card) */}
        <div className="hidden lg:flex lg:col-span-4 relative h-[600px] items-center justify-center">
          {/* Decorative curved SVG line */}
          <div className="absolute top-0 bottom-0 left-[-40%] w-[150%] pointer-events-none">
            <svg 
              viewBox="0 0 200 800" 
              className="w-full h-full stroke-primary drop-shadow-[0_0_8px_rgba(1,151,178,0.5)]"
              fill="none" 
              strokeWidth="3"
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            >
              {/* Pink/Magenta curve */}
              <motion.path
                d="M180 400 C180 300, 60 250, 60 150 C60 80, 100 20, 120 0"
                stroke="url(#pinkGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: EASE }}
              />
              {/* Cyan curve */}
              <motion.path
                d="M160 400 C160 320, 40 280, 40 180 C40 100, 80 40, 100 0"
                stroke="url(#cyanGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.7, ease: EASE }}
              />
              <defs>
                <linearGradient id="pinkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="cyanGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0197B2" />
                </linearGradient>
              </defs>
            </svg>
<<<<<<< HEAD
=======
          </div>
          
          {/* Floating Image Carousel Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -5, y: [0, -10, 0] }}
            transition={{ 
              duration: 0.8, 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative z-10 inline-block max-w-xs rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-50 transform -translate-x-12"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={heroImages[currentImg]}
                alt="Tactile Learning Tool"
                className="block w-auto h-auto max-w-full"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImg ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  style={{ rotate: '5deg' }}
                  aria-label={`Switch to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f

            {/* Main tilted card */}
            <motion.div
              style={{ rotate: cardRotate }}
              className="relative w-[260px] h-[340px] md:w-[300px] md:h-[380px]"
            >
              {/* Card shadow/glow */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/30 to-pink-400/30 blur-2xl translate-y-4 translate-x-4" />
              
              {/* Main card */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-pink-50 shadow-2xl border border-white/50">
                <img
                  src={heroImg}
                  alt="Innovation"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating 3D spheres on the card */}
                <motion.div
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 shadow-lg"
                  animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute top-12 left-6 w-4 h-4 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 shadow-md"
                  animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-20 right-8 w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
                <motion.div
                  className="absolute top-24 right-12 w-3 h-3 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 shadow"
                  animate={{ y: [0, 4, 0], x: [0, 3, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                />
              </div>
            </motion.div>
<<<<<<< HEAD
=======

            {/* Top Right Mini-Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block text-right max-w-[200px]"
            >
              <p className="text-dark font-semibold text-lg leading-tight">Empowering <br/> Accessible Innovation.</p>
            </motion.div>
          </div>

          {/* Massive Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-dark relative z-20"
          >
            <h1 className="text-[42px] sm:text-[58px] md:text-[72px] lg:text-[86px] font-bold leading-[1.05] tracking-tight">
              Empowering{' '}
              <span className="relative inline-block text-primary">
                Confidence
                {/* Corner box accent */}
                <div className="absolute inset-[-4px] md:inset-[-8px] border border-primary/50 pointer-events-none flex justify-between flex-col">
                  <div className="flex justify-between -mt-[3px] md:-mt-[4px]">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -ml-[3px] md:-ml-[4px]" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -mr-[3px] md:-mr-[4px]" />
                  </div>
                  <div className="flex justify-between -mb-[3px] md:-mb-[4px]">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -ml-[3px] md:-ml-[4px]" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -mr-[3px] md:-mr-[4px]" />
                  </div>
                </div>
              </span>
              <br />
              Through Touch{' '}
              <span className="text-primary">&amp; Audio</span>
            </h1>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
          </motion.div>

          {/* ── RIGHT: Content Area ── */}
          <div className="relative z-10">
            {/* Top row: People joined badge + Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="flex flex-wrap items-center justify-between gap-4 mb-8"
            >
<<<<<<< HEAD
              {/* People joined badge - animated entrance */}
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border border-teal-100 shadow-sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    125K+
                  </motion.span>
                  <span className="block text-[10px] font-normal text-teal-500">People joined</span>
                </div>
                
                {/* Avatar stack with staggered reveal */}
                <div className="flex -space-x-2">
                  {[t1, t2, t3, t4].map((avatar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1, type: 'spring', stiffness: 200 }}
                      className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-md ring-2 ring-white"
                    >
                      <img src={avatar} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-sm shadow-lg cursor-pointer"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>

              {/* Tagline with line-by-line reveal */}
              <div className="text-right">
                <TextReveal delay={0.9} className="block text-dark/60 text-sm font-medium">
                  Imagination
                </TextReveal>
                <TextReveal delay={1.0} className="block text-dark font-semibold">
                  Meets Execution.
                </TextReveal>
              </div>
=======
               <Button asChild size="lg" className="h-14 px-8 rounded-full text-base text-white shadow-xl transition-all hover:-translate-y-1" style={{ backgroundColor: '#5ACB2A' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='#4ab524'} onMouseLeave={e => e.currentTarget.style.backgroundColor='#5ACB2A'}>
                 <a href="#studies">Let's Collaborate!</a>
               </Button>
               <a href="#video" className="w-12 h-12 rounded-full border-2 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ borderColor: '#0197B2', backgroundColor: '#0197B2' }}>
                 <FaPlay className="ml-1 text-sm" />
               </a>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            </motion.div>

            {/* Main Heading with Character Reveal */}
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.05] tracking-tight mb-10">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: EASE }}
                >
                  <CharReveal text="Innovation" delay={0.6} stagger={0.04} />
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: EASE }}
                >
                  <CharReveal text="Starts " delay={0.9} stagger={0.04} />
                  <span className="relative inline-block">
                    <CharReveal 
                      text="Here." 
                      delay={1.1} 
                      stagger={0.05} 
                      className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent"
                    />
                    {/* Animated highlight box */}
                    <motion.span
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
                      className="absolute inset-0 -inset-x-3 -inset-y-1 bg-gradient-to-r from-violet-200/40 via-purple-200/50 to-fuchsia-200/40 rounded-lg origin-left -z-10"
                    />
                    {/* Sparkle effects */}
                    <motion.span
                      className="absolute -top-2 -right-2 text-xl"
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.8, type: 'spring' }}
                    >
                      ✨
                    </motion.span>
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Bottom row: CTA + Description */}
            <motion.div
<<<<<<< HEAD
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
              className="flex flex-wrap items-end justify-between gap-8"
            >
              {/* CTA Buttons with glow effect */}
              <div className="flex items-center gap-4">
                <motion.a
                  href="#studies"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-rose-500 text-white font-semibold text-sm tracking-wide shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Shine effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">Let's Collaborate</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-12 h-12 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center text-orange-500 shadow-lg hover:border-orange-300 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Pulse ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-orange-300"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <FaPlay className="text-sm ml-0.5 group-hover:text-orange-600 transition-colors" />
                </motion.button>
              </div>

              {/* Description text with fade-in words */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
                className="text-dark/50 text-sm font-light leading-relaxed max-w-xs text-right"
              >
                {'Your brand\'s journey to creativity begins with us, where ideas become masterpieces.'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.6 + i * 0.05 }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
=======
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="max-w-[340px]"
            >
               <p className="text-gray-500 leading-relaxed font-light">
                 Accessible education for everyone. We create tactile and audio learning tools that help visually impaired children learn independently through touch and sound.
               </p>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom cinematic line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent origin-center"
      />
    </section>
  );
}
