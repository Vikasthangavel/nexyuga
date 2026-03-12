import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaLightbulb, FaFlask, FaTrophy, FaRocket } from 'react-icons/fa';

const steps = [
  {
    num: '01',
    year: '2022',
    title: 'The Idea Was Born',
    desc: 'Nexyuga was born from a simple realisation — visually impaired children deserved better, more tactile ways to learn. We set out to change that.',
    badge: 'Year 1',
    color: '#5ACB2A',
    icon: FaLightbulb,
    side: 'right',
  },
  {
    num: '02',
    year: '2023',
    title: 'First Prototype',
    desc: 'We designed and crafted our first tactile learning kits, collaborating with educators and accessibility experts across three states.',
    badge: '6 months',
    color: '#0197B2',
    icon: FaFlask,
    side: 'left',
  },
  {
    num: '03',
    year: '2024',
    title: 'Award Winning Impact',
    desc: 'Recognised at IIT Delhi\'s Empower 2025 Pitch Showcase. Our work touched 500+ children and gained national attention.',
    badge: 'Milestone',
    color: '#06B6D4',
    icon: FaTrophy,
    side: 'right',
  },
  {
    num: '04',
    year: '2025',
    title: 'Scaling Up',
    desc: 'Expanding to new states, onboarding more school partners, and building a digital-audio companion app to reach every child.',
    badge: 'Now',
    color: '#14B8A6',
    icon: FaRocket,
    side: 'left',
  },
];

/* Animated connector line that draws in on scroll */
function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleY, transformOrigin: 'top' }}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
      aria-hidden="true"
    >
      <div className="w-full h-full bg-gradient-to-b from-secondary via-primary to-accent" />
    </motion.div>
  );
}

export default function Journey() {
  const containerRef = useRef(null);

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" aria-label="Our Journey">

      {/* Subtle bg blobs */}
      <div className="absolute -left-32 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-32 bottom-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            Our Story
          </motion.span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4 leading-tight">
            From a Vision to a{' '}
            <motion.span
              className="text-primary inline-block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Movement
            </motion.span>
          </h2>
          <p className="text-dark/50 max-w-xl mx-auto text-sm sm:text-base">
            Four milestones that shaped who we are — and the mission that keeps us going.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          <TimelineLine containerRef={containerRef} />

          {steps.map((step, i) => {
            const isRight = step.side === 'right';
            const Icon = step.icon;

            return (
              <div key={i} className="relative flex items-start mb-16 last:mb-0">

                {/* Left card (or spacer) */}
                <div className="flex-1 pr-8 flex justify-end">
                  {!isRight ? (
                    <StepCard step={step} i={i} direction="left" />
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>

                {/* Centre node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 250, damping: 15 }}
                  className="relative z-10 flex-shrink-0"
                >
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-lg"
                    style={{ backgroundColor: step.color }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    animate={{
                      boxShadow: [
                        `0 0 0 0 ${step.color}40`,
                        `0 0 0 12px ${step.color}00`,
                      ],
                    }}
                    // pulse ring
                  >
                    {step.num}
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                </motion.div>

                {/* Right card (or spacer) */}
                <div className="flex-1 pl-8">
                  {isRight ? (
                    <StepCard step={step} i={i} direction="right" />
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#studies"
            whileHover={{ scale: 1.07, boxShadow: '0 0 30px rgba(1,151,178,0.4)' }}
            whileTap={{ scale: 0.93 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/20"
          >
            Explore Our Innovations
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <FaArrowRight className="text-sm" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Individual step card ──────────────────────────────────────── */
function StepCard({ step, i, direction }) {
  const Icon = step.icon;
  const fromX = direction === 'right' ? 60 : -60;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: i * 0.12, duration: 0.55, type: 'spring', stiffness: 130 }}
      whileHover={{ y: -6, boxShadow: `0 24px 60px ${step.color}22` }}
      className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-md max-w-sm w-full group cursor-default"
    >
      {/* Animated top accent line */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
        style={{ backgroundColor: step.color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.12 + 0.3, duration: 0.6 }}
      />

      {/* Year badge */}
      <span
        className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
        style={{ backgroundColor: step.color + '18', color: step.color }}
      >
        {step.year} — {step.badge}
      </span>

      {/* Title row */}
      <div className="flex items-start gap-3 mb-3">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: step.color + '18' }}
          whileHover={{ rotate: 15, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon style={{ color: step.color }} size={16} />
        </motion.div>
        <div>
          <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest leading-none mb-1">
            {step.num}.
          </p>
          <h3 className="font-heading font-bold text-dark text-base leading-snug">
            {step.title}
          </h3>
        </div>
      </div>

      <p className="text-dark/55 text-sm leading-relaxed">{step.desc}</p>

      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${step.color}10, transparent 70%)` }}
      />
    </motion.div>
  );
}
