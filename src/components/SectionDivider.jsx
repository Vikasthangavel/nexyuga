import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.55, 0.085, 0, 0.99];

/* Clean minimal line divider */
export function LineDivider({ color = 'primary' }) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className={`mx-auto w-24 h-px bg-gradient-to-r from-transparent via-${color}/30 to-transparent`}
      />
    </div>
  );
}

/* Subtle gradient fade transition */
export function GradientFade({ from = 'white', to = 'surface' }) {
  return (
    <div 
      className="h-16 w-full"
      style={{
        background: `linear-gradient(to bottom, var(--${from}, #fff), var(--${to}, #f8fafc))`
      }}
    />
  );
}

/* Simple spacing divider - professional minimal */
export function SpacerDivider() {
  return <div className="h-12 md:h-16" />;
}

/* Elegant curved transition */
export function CurveDivider({ flip = false, bgColor = '#fff' }) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ height: '40px' }}
      >
        <path 
          d="M0 60 Q720 0 1440 60 L1440 60 L0 60 Z" 
          fill={bgColor}
        />
      </svg>
    </div>
  );
}

/* Subtle dot accent */
export function DotAccent() {
  return (
    <div className="py-6 flex justify-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-2 h-2 rounded-full bg-primary/40"
      />
    </div>
  );
}

/* Minimal decorative line with center element */
export function CenterLineDivider() {
  return (
    <div className="py-10 flex items-center justify-center gap-4 max-w-md mx-auto">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200 origin-right"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-2 h-2 bg-primary/30 rounded-sm"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200 origin-left"
      />
    </div>
  );
}

/* Floating shapes - refined version */
export function FloatingShapesDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const x2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className="relative h-16 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: x1 }}
        className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/10"
      />
      <motion.div
        style={{ x: x2 }}
        className="absolute right-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary/10"
      />
    </div>
  );
}

/* Glowing orb - simplified */
export function GlowingOrbDivider() {
  return (
    <div className="relative h-16 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
      </motion.div>
    </div>
  );
}

/* Particle stream - minimal version */
export function ParticleStreamDivider() {
  return (
    <div className="py-8 flex items-center justify-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
          className="w-1 h-1 rounded-full bg-gray-300"
        />
      ))}
    </div>
  );
}

/* Default export - simple line */
export default function SectionDivider({ variant = 'line' }) {
  if (variant === 'spacer') return <SpacerDivider />;
  if (variant === 'curve') return <CurveDivider />;
  if (variant === 'dot') return <DotAccent />;
  if (variant === 'center') return <CenterLineDivider />;
  if (variant === 'shapes') return <FloatingShapesDivider />;
  if (variant === 'orb') return <GlowingOrbDivider />;
  if (variant === 'particles') return <ParticleStreamDivider />;
  if (variant === 'dots') return <ParticleStreamDivider />;
  
  // Default: Simple line
  return <LineDivider />;
}
