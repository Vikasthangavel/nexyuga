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

  return (
    <section
      id="journey"
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
      </div>
    </section>
  );
}
