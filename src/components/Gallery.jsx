import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
<<<<<<< HEAD

import img1 from '../assets/gallery/1.jpg';
import img2 from '../assets/gallery/2.jpg';
import img7 from '../assets/gallery/7.jpg';
import img8 from '../assets/gallery/8.jpg';
import img9 from '../assets/gallery/9.jpg';
import imgEmpower from '../assets/gallery/empower-iit-delhi.jpg';
import imgJBF from '../assets/gallery/jbf-bharat-impact.jpg';
import imgAkshay from '../assets/gallery/pilot-akshay-saxena.jpg';
import imgPramod from '../assets/gallery/pilot-pramod-s.png';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.55, 0.085, 0, 0.99];

/*
 * MATHEMATICALLY ACCURATE HEART SHAPE
 * Using parametric equations: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
 * Scaled and discretized to a grid
 */
const heartPattern = [
  // Row 0 (top) - the two bumps start
  [3, 0], [4, 0], [8, 0], [9, 0],
  // Row 1 - bumps expand
  [2, 1], [3, 1], [4, 1], [5, 1], [7, 1], [8, 1], [9, 1], [10, 1],
  // Row 2 - bumps connect at center
  [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
  // Row 3 - full width
  [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
  // Row 4 - full width
  [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
  // Row 5 - starting to narrow
  [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
  // Row 6 - narrowing more
  [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
  // Row 7 - narrowing
  [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
  // Row 8 - narrow
  [5, 8], [6, 8], [7, 8],
  // Row 9 (bottom) - the pointed tip
  [6, 9],
];

const CELL_SIZE = 58;
const GAP = 4;
const COLS = 13;
const ROWS = 10;

const images = [img1, img2, img7, img8, img9, imgEmpower, imgJBF, imgAkshay, imgPramod];
=======
import { useCollection } from '../hooks/useCollection';

// 7 columns heart pattern
const heartPattern = [
  0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 0, 0, 0,
];
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f

const VISIBLE_SLOTS = heartPattern.filter(s => s === 1).length; // 27

export default function Gallery() {
<<<<<<< HEAD
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cells = gridRef.current?.querySelectorAll('.heart-cell');
    if (!cells?.length) return;

    /* Staggered reveal from the center-bottom (heart tip) outward */
    const centerX = (COLS - 1) / 2;
    const centerY = ROWS - 1;
    const sorted = Array.from(cells).sort((a, b) => {
      const ax = +a.dataset.col - centerX;
      const ay = +a.dataset.row - centerY;
      const bx = +b.dataset.col - centerX;
      const by = +b.dataset.row - centerY;
      return Math.sqrt(ax * ax + ay * ay) - Math.sqrt(bx * bx + by * by);
    });

    gsap.fromTo(
      sorted,
      { scale: 0, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    /* Continuous heartbeat animation */
    gsap.to(gridRef.current, {
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.8,
    });

    /* Scroll-driven glow pulse */
    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.4,
          scale: 1,
          scrollTrigger: {
            trigger: gridRef.current,
            scrub: true,
            start: 'top 80%',
            end: 'bottom 30%',
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative bg-surface pt-4 pb-16 overflow-hidden" id="gallery">
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-400/20 via-pink-400/15 to-red-400/20 rounded-full blur-[120px] opacity-0 pointer-events-none"
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-center mb-8"
      >
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-3 block">
          Gallery
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">
          Moments of <span className="gradient-text">Impact</span>
        </h2>
      </motion.div>

      {/* Desktop: Perfect Heart-Shaped Image Grid */}
      <div className="hidden md:flex justify-center">
        <div
          ref={gridRef}
          className="relative"
          style={{
            width: COLS * (CELL_SIZE + GAP),
            height: ROWS * (CELL_SIZE + GAP),
          }}
        >
          {heartPattern.map(([col, row], i) => (
            <div
              key={`${col}-${row}`}
              data-col={col}
              data-row={row}
              className="heart-cell absolute rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group hover:z-20 hover:scale-125 cursor-pointer"
              style={{
                left: col * (CELL_SIZE + GAP),
                top: row * (CELL_SIZE + GAP),
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              <img
                src={images[i % images.length]}
                alt={`Impact ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Compact responsive grid */}
      <div className="md:hidden grid grid-cols-3 gap-2 px-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
=======
  const { data, loading } = useCollection('gallery');

  // If nothing uploaded yet, render nothing
  if (!loading && data.length === 0) return null;

  // Tile data to fill all 27 visible heart slots
  const filled = data.length > 0
    ? Array.from({ length: VISIBLE_SLOTS }, (_, i) => data[i % data.length])
    : [];

  let imgIndex = 0;

  return (
    <section
      id="gallery"
      className="py-24 bg-white relative overflow-hidden font-sans flex flex-col items-center"
    >
      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-primary mb-4 block"
          >
            Moments of Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-xl overflow-hidden aspect-square shadow-md"
          >
<<<<<<< HEAD
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
=======
            The Heart of Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            A visual journey of our key milestones, partnerships, and the real people who make our mission possible.
          </motion.p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Heart Grid */}
        {!loading && filled.length > 0 && (
          <div className="relative w-full max-w-[800px] mx-auto mt-10 p-2 sm:p-4">
            <motion.div
              className="absolute inset-0 bg-primary opacity-10 blur-[60px] rounded-full pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {heartPattern.map((slot, i) => {
                if (slot === 0) return <div key={`empty-${i}`} className="col-span-1" />;
                const item = filled[imgIndex % filled.length];
                imgIndex++;
                return (
                  <motion.div
                    key={`img-${i}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '50px' }}
                    transition={{ duration: 0.5, delay: Math.random() * 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.15, zIndex: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                    className="relative group rounded-md md:rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm aspect-square border border-gray-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || 'Gallery'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
      </div>
    </section>
  );
}
