import { motion } from 'framer-motion';

/**
 * Reusable 3D card wrapper with elegant hover scale and glow ring.
 */
export default function Card3D({
  children,
  className = '',
  glowColor = '#0197B2',
  ...props
}) {
  return (
    <motion.div
      className={`card-3d-wrap group ${className}`}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="relative h-full w-full transition-all duration-300">
        {children}
        {/* Subtle Hover glow ring */}
        <div
          className="absolute -inset-2 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 mix-blend-multiply"
          style={{ background: `radial-gradient(circle, ${glowColor}15 0%, transparent 60%)` }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
