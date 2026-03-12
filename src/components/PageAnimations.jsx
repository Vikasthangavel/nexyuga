import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

/* ─── Scroll progress bar ─────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-primary via-accent to-secondary"
      aria-hidden="true"
    />
  );
}

/* ─── Floating ambient orbs ───────────────────────────────────── */
const ORB_CONFIG = [
  { size: 320, x: '5%',  y: '15%',  color: '#0197B2', dur: 18, delay: 0 },
  { size: 220, x: '78%', y: '8%',   color: '#5ACB2A', dur: 14, delay: 3 },
  { size: 280, x: '60%', y: '45%',  color: '#06B6D4', dur: 20, delay: 6 },
  { size: 180, x: '12%', y: '65%',  color: '#14B8A6', dur: 12, delay: 2 },
  { size: 240, x: '85%', y: '72%',  color: '#0197B2', dur: 16, delay: 5 },
  { size: 140, x: '40%', y: '88%',  color: '#5ACB2A', dur: 10, delay: 1 },
];

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {ORB_CONFIG.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            backgroundColor: orb.color,
            opacity: 0.04,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 25, -15, 0],
            scale: [1, 1.15, 0.92, 1.08, 1],
            opacity: [0.04, 0.07, 0.03, 0.06, 0.04],
          }}
          transition={{ duration: orb.dur, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Twinkling stars ─────────────────────────────────────────── */
const STAR_COLORS = ['#0197B2', '#5ACB2A', '#06B6D4', '#ffffff', '#14B8A6'];

function TwinklingStars() {
  const stars = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 300,        // spread over 3× viewport height
      size: 1.5 + Math.random() * 3,
      color: STAR_COLORS[i % STAR_COLORS.length],
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    })),
  []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}vh`,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
          }}
          animate={{
            opacity: [0, 0.7, 0.15, 0.85, 0],
            scale:   [0.8, 1.5, 0.9, 1.6, 0.8],
          }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Shooting stars ──────────────────────────────────────────── */
const SHOOT_COLORS = ['#0197B2', '#5ACB2A', '#06B6D4', '#14B8A6', '#10B981'];

function ShootingStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const spawn = () => {
      const id = Date.now();
      const startX = Math.random() * 80 + 5;
      const startY = Math.random() * 50;
      const length = 80 + Math.random() * 120;
      const color = SHOOT_COLORS[Math.floor(Math.random() * SHOOT_COLORS.length)];
      setStars((prev) => [...prev, { id, startX, startY, length, color }]);
      setTimeout(() => setStars((prev) => prev.filter((s) => s.id !== id)), 1200);
    };
    const interval = setInterval(spawn, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute"
            style={{ left: `${s.startX}%`, top: `${s.startY}%` }}
            initial={{ opacity: 0, x: 0, y: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.8, 0], x: s.length, y: s.length * 0.4, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <div
              style={{
                width: s.length,
                height: 2,
                background: `linear-gradient(to right, transparent, ${s.color})`,
                transform: 'rotate(25deg)',
                borderRadius: 4,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Cursor glow ─────────────────────────────────────────────── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998] rounded-full blur-2xl"
      style={{
        width: 200,
        height: 200,
        top: pos.y - 100,
        left: pos.x - 100,
        backgroundColor: '#0197B2',
        opacity: visible ? 0.06 : 0,
      }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      aria-hidden="true"
    />
  );
}

/* ─── Scroll-to-top button ───────────────────────────────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setProgress(v);
      setVisible(v > 0.08);
    });
    return unsub;
  }, [scrollYProgress]);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          className="fixed bottom-6 right-5 z-[9998] flex items-center justify-center"
          style={{ width: 52, height: 52 }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.88 }}
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg
            width="52" height="52"
            className="absolute inset-0 -rotate-90"
            style={{ pointerEvents: 'none' }}
          >
            {/* Track */}
            <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(1,151,178,0.15)" strokeWidth="3" />
            {/* Fill */}
            <circle
              cx="26" cy="26" r={radius}
              fill="none"
              stroke="#0197B2"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dash}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          {/* Icon bubble */}
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg,#0197B2,#06B6D4)' }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function PageAnimations() {
  return (
    <>
      <ScrollBar />
      <ShootingStars />
      <CursorGlow />
      <ScrollToTop />
    </>
  );
}
