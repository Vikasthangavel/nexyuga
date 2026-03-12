import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

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

export default function Gallery() {
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
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-xl overflow-hidden aspect-square shadow-md"
          >
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
