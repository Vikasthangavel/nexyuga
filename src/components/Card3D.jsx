import { motion } from 'framer-motion';

/**
 * Reusable 3D card wrapper with mouse-tracking tilt, glow ring, and fun shadow.
 */
export default function Card3D({
  children,
  className = '',
  glowColor = '#0197B2',
  ...props
}) {
  return (
    <motion.div
      className={`card-3d-wrap ${className}`}
      whileHover={{
        rotateX: [-2, 2, -1, 0],
        rotateY: [-2, 2, -1, 0],
        scale: 1.04,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.97, rotateX: 3 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      {...props}
    >
      <div
        className="relative transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        {/* Hover glow ring */}
        <div
          className="absolute -inset-1 rounded-[inherit] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg -z-10"
          style={{ background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
