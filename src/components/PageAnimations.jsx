import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

/* ─── Scroll progress bar ─────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-gradient-to-r from-primary via-accent to-secondary"
      aria-hidden="true"
    />
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
      className="fixed pointer-events-none z-[9998] rounded-full blur-3xl"
      style={{
        width: 180,
        height: 180,
        top: pos.y - 90,
        left: pos.x - 90,
        background: 'radial-gradient(circle, rgba(1,151,178,0.06) 0%, transparent 70%)',
        opacity: visible ? 1 : 0,
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
          <svg
            width="52" height="52"
            className="absolute inset-0 -rotate-90"
            style={{ pointerEvents: 'none' }}
          >
            <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(1,151,178,0.12)" strokeWidth="2.5" />
            <circle
              cx="26" cy="26" r={radius}
              fill="none"
              stroke="#0197B2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dash}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg,#0197B2,#06B6D4)' }}
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
      <CursorGlow />
      <ScrollToTop />
    </>
  );
}
