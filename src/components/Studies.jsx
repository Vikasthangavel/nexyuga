import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaCalculator, FaFlask, FaGlobeAmericas } from 'react-icons/fa';
import literatureImg from '../assets/literature.png';
import mathImg from '../assets/mathematics.png';
import scienceImg from '../assets/science.png';
import socialImg from '../assets/social_studies.png';
import productFeatures from '../assets/products/features.png';
import productIsometric from '../assets/products/isometric.png';
import productOpenView from '../assets/products/open view 2.png';

const productShowcase = [
  { image: productIsometric, label: 'Tactile Learning Kit', sub: 'Touch & Feel Edition', color: '#0197B2' },
  { image: productFeatures, label: 'Features Overview', sub: 'Multi-Sensory Design', color: '#5ACB2A' },
  { image: productOpenView, label: 'Open View', sub: 'Inside the Kit', color: '#06B6D4' },
];

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
  const touchRef = useRef(null);

  // ── Lightbox state ─────────────────────────────────────────
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);
  const MIN_ZOOM = 0.5, MAX_ZOOM = 4;

  const openLightbox = (i) => { setLightbox(i); setZoom(1); };
  const closeLightbox = () => { setLightbox(null); setZoom(1); };
  const zoomIn  = () => setZoom((z) => Math.min(+(z + 0.25).toFixed(2), MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(+(z - 0.25).toFixed(2), MIN_ZOOM));
  const resetZoom = () => setZoom(1);
  const prev = () => { setZoom(1); setLightbox((i) => (i - 1 + productShowcase.length) % productShowcase.length); };
  const next = () => { setZoom(1); setLightbox((i) => (i + 1) % productShowcase.length); };

  // Keyboard controls
  const handleKey = useCallback(
    (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    [lightbox]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Scroll-wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn(); else zoomOut();
  };

  // ── Touch swipe for mobile ─────────────────────────────────
  const touchStart = useCallback((e) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const touchEnd = useCallback((e) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 50) prev();
      else if (dx < -50) next();
    } else {
      if (dy > 80) closeLightbox(); // swipe down to close
    }
    touchRef.current = null;
  }, [lightbox]);



  return (
    <>
    <section id="studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 relative overflow-hidden" aria-label="Subject areas">
      <div className="absolute top-10 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      


      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Innovations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            Learning{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Reimagined
            </motion.span>
          </h2>
          <p className="text-dark/50 max-w-2xl mx-auto">
            Each subject is carefully designed with tactile and audio elements that make learning an adventure.
          </p>
        </motion.div>

        {/* ── Product Showcase ─────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {productShowcase.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.15, type: 'spring', stiffness: 140 }}
              whileHover={{
                y: -10,
                boxShadow: `0 30px 60px ${product.color}30`,
                scale: 1.03,
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md cursor-zoom-in relative"
              onClick={() => openLightbox(i)}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <motion.img
                  src={product.image}
                  alt={product.label}
                  className="w-full h-56 object-contain p-4"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Hover expand icon */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{ color: product.color }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${product.color}15, transparent 70%)` }}
                />
              </div>

              {/* Label */}
              <div className="px-5 py-4 border-t border-gray-100">
                <motion.div
                  className="w-8 h-1 rounded-full mb-2"
                  style={{ backgroundColor: product.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                />
                <p className="font-heading font-bold text-dark text-base">{product.label}</p>
                <p className="text-sm mt-0.5" style={{ color: product.color }}>{product.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Subject Cards ────────────────────────────────── */}
        {/* ── Sub-Sections (Subjects) - Clean Layout (Image 3) ────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
          {subjects.map((subject, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-gray-100/80 shadow-sm rounded-3xl transition-all duration-300 relative overflow-hidden group cursor-default"
            >
              {/* Soft pastel icon wrapper */}
              <div 
                className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-[1.4rem] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 shadow-inner" 
                style={{ backgroundColor: subject.bgColor }}
              >
                <subject.icon className="text-4xl sm:text-[2.75rem]" style={{ color: subject.color }} />
              </div>

              <h3 className="font-heading font-bold text-dark text-lg sm:text-xl text-center group-hover:text-primary transition-colors tracking-wide">
                {subject.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Lightbox portal – sibling to section */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/88 backdrop-blur-sm" onClick={closeLightbox} />

            {/* Always-visible floating close button — stays above zoomed image */}
            <motion.button
              onClick={closeLightbox}
              className="fixed z-[10000] flex items-center justify-center text-white rounded-full shadow-2xl"
              style={{
                top: 'max(env(safe-area-inset-top), 14px)',
                right: 14,
                width: 44,
                height: 44,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
              whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,80,80,0.55)' }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              aria-label="Close fullscreen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>

            {/* Top bar */}
            <div
              className="relative z-20 flex items-center justify-between px-4 pt-safe-top"
              style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-white font-heading font-bold text-sm sm:text-base truncate">
                  {productShowcase[lightbox].label}
                </p>
                <p className="text-white/60 text-xs sm:text-sm">{productShowcase[lightbox].sub}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="w-11 h-11 shrink-0 bg-white/10 active:bg-white/25 rounded-full flex items-center justify-center text-white"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Image + side nav */}
            <div
              className="relative z-10 flex-1 flex items-center justify-center px-2 py-4"
              onWheel={handleWheel}
            >
              {/* Prev arrow – hidden on mobile (use swipe), shown sm+ */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="hidden sm:flex absolute left-3 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full items-center justify-center text-white z-10"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  src={productShowcase[lightbox].image}
                  alt={productShowcase[lightbox].label}
                  className="select-none rounded-2xl"
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '65vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                    cursor: zoom > 1 ? 'grab' : 'zoom-in',
                    boxShadow: `0 30px 80px ${productShowcase[lightbox].color}50`,
                    touchAction: 'none',
                  }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  draggable={false}
                />
              </AnimatePresence>

              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="hidden sm:flex absolute right-3 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full items-center justify-center text-white z-10"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Bottom controls */}
            <div
              className="relative z-20 flex flex-col items-center gap-3 pb-safe-bottom"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
            >
              {/* Dot pagination */}
              <div className="flex gap-2">
                {productShowcase.map((_, di) => (
                  <button
                    key={di}
                    onClick={() => openLightbox(di)}
                    aria-label={`Go to product ${di + 1}`}
                    className="rounded-full transition-all"
                    style={{
                      width: di === lightbox ? 20 : 8,
                      height: 8,
                      backgroundColor: di === lightbox
                        ? productShowcase[lightbox].color
                        : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>

              {/* Zoom bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="w-12 h-12 sm:w-10 sm:h-10 bg-white/10 active:bg-white/25 disabled:opacity-40 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  aria-label="Zoom out"
                >−</button>

                <button
                  onClick={resetZoom}
                  className="px-5 h-10 bg-white/15 active:bg-white/25 rounded-full text-white text-sm font-mono font-semibold min-w-[64px] text-center"
                  aria-label="Reset zoom"
                >{Math.round(zoom * 100)}%</button>

                <button
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="w-12 h-12 sm:w-10 sm:h-10 bg-white/10 active:bg-white/25 disabled:opacity-40 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  aria-label="Zoom in"
                >+</button>
              </div>

              {/* Mobile hint */}
              <p className="text-white/35 text-xs sm:hidden">Swipe left/right to navigate · Swipe down to close</p>
              <p className="text-white/35 text-xs hidden sm:block">Scroll to zoom · ← → navigate · Esc close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
