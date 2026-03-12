import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

import t1 from '../assets/testimonials/1.svg';
import t2 from '../assets/testimonials/2.svg';
import t3 from '../assets/testimonials/5.svg';
import t4 from '../assets/testimonials/4.svg';
import t5 from '../assets/testimonials/3.svg';
import t6 from '../assets/testimonials/6.svg';
import t7 from '../assets/testimonials/8.svg';

const EASE = [0.55, 0.085, 0, 0.99];

const testimonials = [
  { quote: 'From start to finish, the communication was seamless and the design blew us away. They really know how to bring a brand to life!', name: 'James R.', designation: 'Startup Founder', image: t1 },
  { quote: 'Creative direction, speed, and polish were all first class from kickoff to launch.', name: 'Elisa M.', designation: 'Product Lead', image: t2 },
  { quote: 'The final brand system felt premium and clear, and our customer trust improved quickly.', name: 'Daniel C.', designation: 'Marketing Head', image: t3 },
  { quote: 'Absolutely incredible attention to detail. Everything was delivered smoothly.', name: 'Sarah W.', designation: 'Director', image: t4 },
  { quote: 'Their modern approach to design helped our platform grow exponentially.', name: 'Michael B.', designation: 'CEO', image: t5 },
  { quote: 'Exceptional quality and creative solutions that exceeded our expectations.', name: 'Priya K.', designation: 'CTO', image: t6 },
  { quote: 'The team delivered a world-class experience that our users absolutely love.', name: 'Alex T.', designation: 'Head of Design', image: t7 },
];

const TOTAL = testimonials.length;
const ARC_RADIUS = 280;
const AVATAR_SIZE = 68;

/* Position on a SEMI-CIRCLE (top half only, 180deg arc) */
function getArcPos(index, rotation) {
  const step = Math.PI / (TOTAL - 1);
  let angle = index * step + rotation;
  angle = ((angle % Math.PI) + Math.PI) % Math.PI;
  
  const x = ARC_RADIUS * Math.cos(angle);
  const y = -ARC_RADIUS * Math.sin(angle);
  const distFromCenter = Math.abs(angle - Math.PI / 2);
  
  return { x, y, distFromCenter };
}

/* Which index is closest to center-top (PI/2)? */
function getActiveIndex(rotation) {
  const step = Math.PI / (TOTAL - 1);
  let minDist = Infinity;
  let activeIdx = 0;
  
  for (let i = 0; i < TOTAL; i++) {
    let angle = i * step + rotation;
    angle = ((angle % Math.PI) + Math.PI) % Math.PI;
    const dist = Math.abs(angle - Math.PI / 2);
    if (dist < minDist) {
      minDist = dist;
      activeIdx = i;
    }
  }
  return activeIdx;
}

export default function TestimonialArc() {
  const [active, setActive] = useState(Math.floor(TOTAL / 2));
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 20%', 'end 80%'], // Much wider range = slower speed
  });

  const scrollRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -Math.PI * 0.6] // Reduced rotation range = slower movement
  );

  useMotionValueEvent(scrollRotation, 'change', (rot) => {
    setActive(getActiveIndex(rot));
  });

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface overflow-hidden"
      style={{ minHeight: '100vh', padding: '0 1.5rem' }}
    >
      {/* Sticky container - compact */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center py-8">
        {/* Header - shorter margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-2 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">
            What People <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        {/* ── Desktop: Semi-circle arc ── */}
        <div className="hidden md:block relative" style={{ width: ARC_RADIUS * 2 + 100, height: ARC_RADIUS + 100 }}>
          {/* The dashed arc line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2"
            width={ARC_RADIUS * 2 + 60}
            height={ARC_RADIUS + 30}
            style={{ top: 50 }}
          >
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0197B2" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#5ACB2A" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d={`M 30 ${ARC_RADIUS + 15} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${ARC_RADIUS * 2 + 30} ${ARC_RADIUS + 15}`}
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Avatars on the arc */}
          <div
            className="relative"
            style={{
              width: ARC_RADIUS * 2 + 100,
              height: ARC_RADIUS + 100,
            }}
          >
            {testimonials.map((item, i) => (
              <ArcAvatar
                key={i}
                index={i}
                item={item}
                isActive={i === active}
                scrollRotation={scrollRotation}
                arcRadius={ARC_RADIUS}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* Quote area - CLOSER to the arc */}
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-lg text-center" style={{ top: ARC_RADIUS + 50 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="px-4"
              >
                {/* Quote icon */}
                <svg className="w-7 h-7 text-primary/25 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>

                <p className="text-dark/70 text-base md:text-lg leading-relaxed font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Name & designation */}
                <p className="text-dark font-semibold text-sm mt-3">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.designation}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Horizontal scroll with tap select ── */}
        <div className="md:hidden w-full">
          <div className="flex justify-center items-center gap-3 mb-4 overflow-x-auto pb-3 px-4">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full overflow-hidden transition-all duration-500 flex-shrink-0 ${
                  active === i
                    ? 'w-14 h-14 ring-2 ring-primary ring-offset-2'
                    : 'w-10 h-10 opacity-40'
                }`}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center px-4"
            >
              <p className="text-dark/75 text-base leading-relaxed font-light italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-dark font-semibold text-sm mt-3">{t.name}</p>
              <p className="text-gray-400 text-xs">{t.designation}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* Avatar positioned on the semi-circle arc */
function ArcAvatar({ index, item, isActive, scrollRotation, arcRadius, onClick }) {
  const containerWidth = arcRadius * 2 + 100;
  const containerCenterX = containerWidth / 2;
  const arcCenterY = arcRadius + 50;

  const x = useTransform(scrollRotation, (rot) => {
    const { x } = getArcPos(index, rot);
    return containerCenterX + x - AVATAR_SIZE / 2;
  });

  const y = useTransform(scrollRotation, (rot) => {
    const { y } = getArcPos(index, rot);
    return arcCenterY + y - AVATAR_SIZE / 2;
  });

  const blur = useTransform(scrollRotation, (rot) => {
    const { distFromCenter } = getArcPos(index, rot);
    return `blur(${Math.min(distFromCenter * 5, 6)}px)`;
  });

  const opacity = useTransform(scrollRotation, (rot) => {
    const { distFromCenter } = getArcPos(index, rot);
    return Math.max(0.35, 1 - distFromCenter * 0.7);
  });

  const scale = useTransform(scrollRotation, (rot) => {
    const { distFromCenter } = getArcPos(index, rot);
    return isActive ? 1.25 : Math.max(0.75, 1 - distFromCenter * 0.25);
  });

  return (
    <motion.button
      onClick={onClick}
      className="absolute cursor-pointer focus:outline-none"
      style={{
        left: x,
        top: y,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        filter: isActive ? 'blur(0px)' : blur,
        opacity: isActive ? 1 : opacity,
        scale,
        zIndex: isActive ? 30 : 10,
      }}
      whileHover={{ scale: isActive ? 1.3 : 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient ring for active avatar */}
      <div
        className="absolute -inset-1 rounded-full transition-all duration-500"
        style={{
          background: isActive
            ? 'conic-gradient(from 0deg, #0197B2, #06B6D4, #5ACB2A, #0197B2)'
            : 'transparent',
          opacity: isActive ? 1 : 0,
        }}
      />
      
      {/* Avatar image */}
      <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white shadow-lg z-10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Glow effect behind active avatar */}
      {isActive && (
        <div className="absolute -inset-5 rounded-full bg-primary/15 blur-xl pointer-events-none animate-pulse z-0" />
      )}
    </motion.button>
  );
}
