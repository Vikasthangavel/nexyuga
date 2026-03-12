import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

import literatureImg from '../assets/Startup/Sub 1.png';
import mathImg from '../assets/Startup/Sub 2.png';
import scienceImg from '../assets/Startup/Sub 3.png';
import socialImg from '../assets/Startup/Sub 4.png';
import productFeatures from '../assets/products/features.png';
import productIsometric from '../assets/products/isometric.png';
import productOpenView from '../assets/products/open view 2.png';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.55, 0.085, 0, 0.99];

const subjects = [
  { name: 'Literature', accent: '#FF6B6B', icon: '📚', image: literatureImg, desc: 'Story-driven curriculum sparking imagination and critical thinking.', stat: '95%' },
  { name: 'Mathematics', accent: '#4ECDC4', icon: '🔢', image: mathImg, desc: 'Visual, hands-on approach making abstract concepts intuitive.', stat: '12+' },
  { name: 'Science', accent: '#45B7D1', icon: '🔬', image: scienceImg, desc: 'Experiment-first learning nurturing curiosity about the world.', stat: '22+' },
  { name: 'Social Studies', accent: '#96CEB4', icon: '🌍', image: socialImg, desc: 'Connecting students with history, culture, and civic values.', stat: '8K+' },
];

const funFacts = [
  { number: '95%', label: 'Student Success Rate', color: '#FF6B6B' },
  { number: '12+', label: 'Years of Excellence', color: '#4ECDC4' },
  { number: '22+', label: 'Expert Educators', color: '#45B7D1' },
  { number: '8K+', label: 'Happy Students', color: '#96CEB4' },
];

const productShowcase = [
  { title: 'Product Features', image: productFeatures, desc: 'Comprehensive breakdown of key features.' },
  { title: 'Isometric View', image: productIsometric, desc: 'Detailed isometric product design.' },
  { title: 'Open View', image: productOpenView, desc: 'Full layout revealing internal structure.' },
];

export default function Studies() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [activeCard, setActiveCard] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  /* GSAP: Scroll-driven cards - start collapsed, expand into 2x2 grid */
  useEffect(() => {
    const cardsWrapper = cardsContainerRef.current;
    if (!cardsWrapper) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'top 10%',
      onEnter: () => setIsExpanded(true),
      onLeaveBack: () => setIsExpanded(false),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* Lightbox handlers */
  const openLightbox = useCallback((idx) => {
    setLightbox(idx);
    setZoom(1);
  }, []);
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
  }, []);
  const prevLightbox = useCallback(() => {
    setLightbox((p) => (p === null ? null : (p - 1 + productShowcase.length) % productShowcase.length));
    setZoom(1);
  }, []);
  const nextLightbox = useCallback(() => {
    setLightbox((p) => (p === null ? null : (p + 1) % productShowcase.length));
    setZoom(1);
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.5, 4));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.5, 0.5));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, prevLightbox, nextLightbox]);

  /* Touch swipe */
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) diff > 0 ? nextLightbox() : prevLightbox();
  };

  return (
    <section ref={sectionRef} id="studies" className="relative overflow-hidden py-0">
      {/* ═══ Dark FunFacts Section ═══ */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* ── Left Column: Title + Stats ── */}
            <div className="space-y-12">
              {/* Header with reveal animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-6"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Fun Facts
                </motion.span>
                
                {/* Animated title with character reveal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {'Why Choose'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50, rotateX: 90 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease: EASE }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                  <br />
                  {'Our '.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {'Studies'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.7 + i * 0.05, type: 'spring', stiffness: 200 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-white/50 text-lg mt-6 max-w-md leading-relaxed"
                >
                  Four comprehensive subjects designed to ignite curiosity and empower every student with knowledge that matters.
                </motion.p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {funFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative"
                  >
                    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, ${fact.color}15, transparent 70%)` }}
                      />
                      
                      {/* Number with gradient */}
                      <motion.span 
                        className="text-4xl md:text-5xl font-bold block mb-2"
                        style={{ 
                          background: `linear-gradient(135deg, ${fact.color}, ${fact.color}90)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        {fact.number}
                      </motion.span>
                      <span className="text-white/60 text-sm font-medium">{fact.label}</span>
                      
                      {/* Decorative corner */}
                      <div 
                        className="absolute top-0 right-0 w-16 h-16 opacity-20"
                        style={{ 
                          background: `linear-gradient(135deg, ${fact.color}, transparent)`,
                          borderRadius: '0 1rem 0 100%'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Right Column: Cards that expand from stack to grid ── */}
            <div className="relative" ref={cardsContainerRef}>
              {/* Collapsed State: Stacked deck preview */}
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative h-[400px] flex items-center justify-center"
                  >
                    {/* Stacked cards preview */}
                    <div className="relative w-[320px] h-[220px]">
                      {subjects.map((subject, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 0, x: 0, rotate: 0 }}
                          animate={{ 
                            y: i * -8, 
                            x: i * 6, 
                            rotate: -3 + i * 2,
                            scale: 1 - i * 0.02
                          }}
                          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
                          style={{ zIndex: subjects.length - i }}
                        >
                          <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(135deg, ${subject.accent}90, ${subject.accent}60)` }}
                          />
                          <img
                            src={subject.image}
                            alt={subject.name}
                            className="w-full h-full object-cover mix-blend-overlay opacity-60"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl">{subject.icon}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Scroll hint */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-2"
                    >
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </motion.svg>
                      Scroll to explore subjects
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Expanded State: 2x2 Grid */
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {subjects.map((subject, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onMouseEnter={() => setActiveCard(i)}
                        onMouseLeave={() => setActiveCard(-1)}
                        className="group cursor-pointer"
                      >
                        <div 
                          className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500"
                          style={{ borderTop: `3px solid ${subject.accent}` }}
                        >
                          {/* Card image */}
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={subject.image}
                              alt={subject.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div 
                              className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"
                            />
                            <motion.span 
                              className="absolute top-3 left-3 text-3xl"
                              animate={activeCard === i ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {subject.icon}
                            </motion.span>
                          </div>
                          
                          {/* Card content */}
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {subject.name}
                            </h3>
                            <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
                              {subject.desc}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span 
                                className="text-xl font-bold"
                                style={{ color: subject.accent }}
                              >
                                {subject.stat}
                              </span>
                              <motion.span
                                className="text-white/50 text-xs flex items-center gap-1 group-hover:text-white transition-colors"
                                whileHover={{ x: 3 }}
                              >
                                Learn more
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
              fill="var(--surface, #fff)"
            />
          </svg>
        </div>
      </div>

      {/* ═══ Product Showcase Section (Light) ═══ */}
      <div className="bg-surface py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10"
          >
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-3 block">
              Product
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight">
              Study <span className="gradient-text">Materials</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {productShowcase.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                onClick={() => openLightbox(i)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-dark font-semibold text-sm">{item.title}</h3>
                  <p className="text-dark/40 text-xs mt-1 font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">✕</button>
            <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors">‹</button>
            <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors">›</button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img
                src={productShowcase[lightbox].image}
                alt={productShowcase[lightbox].title}
                className="w-full rounded-xl shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
                draggable={false}
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-lg font-semibold">{productShowcase[lightbox].title}</h3>
                <p className="text-white/50 text-sm mt-1">{productShowcase[lightbox].desc}</p>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.5, 0.5)); }} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors">−</button>
              <span className="text-white/60 text-xs font-mono min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 4)); }} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors">+</button>
            </div>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono">{lightbox + 1} / {productShowcase.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
