<<<<<<< HEAD
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.55, 0.085, 0, 0.99];

const steps = [
  {
    num: '01',
    title: 'Idea Born',
    desc: 'Nexyuga was born from a powerful idea — every child deserves the chance to learn, explore, and grow, regardless of physical ability.',
    year: '2022',
  },
  {
    num: '02',
    title: 'First Prototype',
    desc: 'We designed the first tactile learning kits and audio-enhanced study tools to make education a joyful, independent experience.',
    year: '2023',
  },
  {
    num: '03',
    title: 'Award Winning',
    desc: 'Our tools gained recognition for bridging the gap in inclusive education, working closely with educators and accessibility experts.',
    year: '2024',
  },
  {
    num: '04',
    title: 'Scaling Up',
    desc: 'Expanding across multiple states, touching the lives of hundreds of learners and continuously growing our reach.',
    year: '2025+',
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.journey-card-trigger').forEach((card) => {
        const content = card.querySelector('.journey-card-content');
        const numberFill = card.querySelector('.journey-number-fill');
        const number = card.querySelector('.journey-number');
        if (!content) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: () => '+=' + card.offsetHeight,
            toggleActions: 'play none none reverse',
            scrub: 1,
          },
        });

        // Number changes color
        if (number) {
          tl.to(number, {
            backgroundColor: '#0197B2',
            color: '#fff',
            duration: 0.3,
          });
        }

        // Line fill scales up
        if (numberFill) {
          tl.to(numberFill, { scaleY: 1, duration: 1 }, '<=');
        }

        // 3D flip: content rotates from ±45deg to 0
        tl.to(content, {
          rotateY: 0,
          opacity: 1,
          duration: 1,
        }, '<=');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
=======
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';

const ICON_MAP = {
  FaLightbulb: '💡',
  FaFlask: '🔬',
  FaTrophy: '🏆',
  FaRocket: '🚀',
  FaStar: '⭐',
  FaHeart: '❤️',
};

export default function Journey() {
  const sectionRef = useRef(null);
  const { data: steps, loading } = useCollection('journey', 'year');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const carY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Show nothing if no data yet
  if (!loading && steps.length === 0) return null;
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f

  return (
    <section
      id="journey"
<<<<<<< HEAD
      ref={containerRef}
      className="py-28 px-6 sm:px-8 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block"
          >
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-5"
          >
            How We <span className="gradient-text">Got Here</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-xl mx-auto"
          >
            A progressive method blending innovation and empathy.
          </motion.p>
        </div>

        {/* Timeline — Nimo nm-steps-1 pattern */}
        <div className="relative">
          {/* Animated vertical line (scroll-linked) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gray-100" />
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 w-[2px] bg-gradient-to-b from-primary to-secondary origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, i) => {
              const isOdd = i % 2 === 0; // odd cards go right, even go left (Nimo pattern)
              return (
                <div
                  key={i}
                  className="journey-card-trigger"
                  style={{ perspective: 2000 }}
                >
                  <div
                    className={`max-w-[560px] flex items-stretch gap-6 md:gap-10 ${
                      isOdd ? 'md:ml-auto md:mr-1' : 'md:mr-auto md:ml-1 md:flex-row-reverse'
                    }`}
                  >
                    {/* Number + vertical fill line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="journey-number w-12 h-12 rounded-full bg-gray-100 text-dark font-bold text-lg flex items-center justify-center transition-colors duration-500 relative z-10"
                      >
                        {step.num}
                      </div>
                      <div className="w-[2px] flex-1 bg-gray-100 relative overflow-hidden rounded-b-full mt-1">
                        <div
                          className="journey-number-fill w-full h-full bg-gradient-to-b from-primary to-secondary rounded-b-full origin-top"
                          style={{ transform: 'scaleY(0)' }}
                        />
                      </div>
                    </div>

                    {/* 3D Flip Card Content — starts rotated, flips to 0 on scroll */}
                    <div
                      className="journey-card-content flex-1 pb-12"
                      style={{
                        transformOrigin: isOdd ? '0% 50%' : '100% 50%',
                        transform: `rotateY(${isOdd ? 45 : -45}deg)`,
                        opacity: 0.3,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/15 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-md">
                            {step.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                        <p className="text-gray-500 text-[15px] leading-relaxed font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
=======
      ref={sectionRef}
      className="py-28 px-6 sm:px-8 bg-white relative overflow-hidden flex flex-col items-center font-sans"
      aria-label="Our Journey"
    >
      {/* Subtle background blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#0197B2]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#5ACB2A]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-4 leading-tight">
            Our Journey
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Our progressive method blends innovation and empathy while keeping accessibility at the core.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Timeline */}
        {!loading && steps.length > 0 && (
          <div className="relative">
            {/* Track background */}
            <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gray-100 rounded-full" />

            {/* Animated progress fill */}
            <motion.div
              className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] rounded-full origin-top"
              style={{
                scaleY: lineScaleY,
                height: '100%',
                background: 'linear-gradient(to bottom, #0197B2, #5ACB2A)',
              }}
            />

            {/* 🚗 Car emoji */}
            <motion.div
              className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 z-20 text-2xl -translate-x-1/2 -translate-y-1/2"
              style={{ top: carY }}
            >
              🚗
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, i) => {
                const isEven = i % 2 === 0;
                const emoji = ICON_MAP[step.icon] ?? '📌';
                const color = step.color || (i % 2 === 0 ? '#0197B2' : '#5ACB2A');
                return (
                  <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Node */}
                    <div
                      className="absolute left-[28px] md:left-1/2 w-11 h-11 rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-xl border-4 border-white shadow-md"
                      style={{ backgroundColor: color }}
                    >
                      {emoji}
                    </div>

                    <div className="hidden md:block w-1/2" />

                    {/* Card */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 lg:pr-20' : 'md:pl-16 lg:pl-20'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(1,151,178,0.1)] transition-shadow duration-500 group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300 font-medium text-lg">{i + 1 < 10 ? `0${i + 1}.` : `${i + 1}.`}</span>
                            <h3 className="text-dark font-bold text-xl group-hover:text-primary transition-colors duration-300">
                              {step.title}
                            </h3>
                          </div>
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full text-white shrink-0 ml-2"
                            style={{ backgroundColor: color }}
                          >
                            {step.year}
                          </span>
                        </div>
                        <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">{step.desc}</p>
                        <div
                          className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </motion.div>
                    </div>
                  </div>
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
