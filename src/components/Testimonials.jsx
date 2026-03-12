import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaQuoteRight } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import t1 from '../assets/testimonials/1.svg';
import t2 from '../assets/testimonials/2.svg';
import t3 from '../assets/testimonials/5.svg';
import t4 from '../assets/testimonials/4.svg';
import t5 from '../assets/testimonials/3.svg';

const testimonials = [
  {
    quote: "Out of scale 10, I'll give 11 — it's that impactful! I love this product.",
    name: 'DR.T K Bansal',
    designation: 'Special Trustee & Founder — Blind to Visionaries Trust',
    location: 'Chennai',
    image: t1,
    color: '#0197B2',
    rating: 5,
  },
  {
    quote: 'These tactile books make reading more inclusive and joyful for all learners — it will help our children a lot.',
    name: 'Librarian',
    designation: 'Librarian',
    location: 'Coimbatore',
    image: t2,
    color: '#5ACB2A',
    rating: 5,
  },
  {
    quote: 'This is what true inclusive education really means — a great product!!',
    name: 'Menaga',
    designation: 'Psychologist, Agam Wellness Center',
    location: 'Bengaluru',
    image: t3,
    color: '#06B6D4',
    rating: 5,
  },
  {
    quote: 'I see how this can bridge gaps in access and empower every child to learn.',
    name: 'Akshay Saxena',
    designation: 'Co-Founder, Avanti Fellows',
    location: 'Delhi',
    image: t4,
    color: '#5ACB2A',
    rating: 4.5,
  },
  {
    quote: 'This will help children learn easily — such a nice product!',
    name: 'Kaviraj Prithvi',
    designation: 'Founder, Udot',
    location: 'Delhi',
    image: t5,
    color: '#0197B2',
    rating: 4.5,
  },
];

/* 
  5 avatars placed on a semi-circle arc from bottom-left → top → bottom-right
  Angles in degrees (0° = right, 90° = down, 270° = up).
  We spread from 200° to 340° going through 270° (top).
  Container: 480×400. Centre: (240, 220). Radius: 175.
*/
const CX = 240;
const CY = 220;
const R  = 175;
const AV = 60; // avatar diameter px

const ANGLES_DEG = [205, 237, 270, 303, 335]; // 5 evenly-ish spaced

function toPos(deg) {
  const rad = (deg * Math.PI) / 180;
  return {
    left: CX + R * Math.cos(rad) - AV / 2,
    top:  CY + R * Math.sin(rad) - AV / 2,
  };
}

/* Star rating */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[...Array(full)].map((_, i) => (
        <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07, type: 'spring' }}>
          <FaStar className="text-amber-400 text-base" />
        </motion.span>
      ))}
      {half && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <FaStarHalfAlt className="text-amber-400 text-base" />
        </motion.span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" aria-label="Testimonials">

      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <HiSparkles /> From Our Community
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            What People{' '}
            <motion.span className="text-primary inline-block" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              Say
            </motion.span>
          </h2>
          <p className="text-dark/45 mt-3 max-w-md mx-auto text-sm">
            Hear from educators, parents, and partners who've witnessed the impact firsthand.
          </p>
        </motion.div>

        {/* Orbit stage — fixed 480×400 inner container, centered */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 480, height: 400 }}>

            {/* Rotating dashed arc ring */}
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full pointer-events-none"
              style={{
                width: R * 2 + AV,
                height: R * 2 + AV,
                left: CX - R - AV / 2,
                top:  CY - R - AV / 2,
                border: '1.5px dashed rgba(1,151,178,0.18)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            />

            {/* Avatars on the semi-circle */}
            {testimonials.map((person, i) => {
              const pos = toPos(ANGLES_DEG[i]);
              const isActive = i === active;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View ${person.name}'s testimonial`}
                  className="absolute"
                  style={{ left: pos.left, top: pos.top, width: AV, height: AV }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative w-full h-full">
                    {/* Active glow ring */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-1.5 rounded-full"
                        style={{ border: `2.5px solid ${person.color}` }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.9, 0.3, 0.9] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        layoutId="glowRing"
                      />
                    )}
                    <img
                      src={person.image}
                      alt={person.name}
                      className={`w-full h-full rounded-full object-cover bg-gray-50 border-2 transition-all duration-300 ${
                        isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-45 border-gray-200'
                      }`}
                      style={{ borderColor: isActive ? person.color : undefined }}
                    />
                  </div>
                </motion.button>
              );
            })}

            {/* Central quote card */}
            <div
              className="absolute text-center"
              style={{
                left: CX - 115,
                top:  CY - 90,
                width: 230,
              }}
            >
              {/* Quote icon */}
              <motion.div className="flex justify-center mb-2" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <FaQuoteRight size={28} style={{ color: t.color }} />
              </motion.div>

              {/* Quote text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={active + '-q'}
                  className="text-dark/75 font-medium text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.p>
              </AnimatePresence>

              {/* Stars */}
              <div className="my-2">
                <AnimatePresence mode="wait">
                  <motion.div key={active + '-s'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stars rating={t.rating} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Name */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-n'}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs font-semibold text-dark/40 uppercase tracking-widest">— {t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: t.color }}>{t.designation}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2.5 mt-2">
          {testimonials.map((person, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 28 : 10, height: 10, backgroundColor: i === active ? person.color : '#D1D5DB' }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
