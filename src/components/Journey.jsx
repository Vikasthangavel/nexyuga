import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';

export default function Journey() {
  const sectionRef = useRef(null);
  const { data: steps, loading } = useCollection('journey', 'year');

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMob = () => setIsMobile(window.innerWidth < 768);
    checkMob();
    window.addEventListener('resize', checkMob);
    return () => window.removeEventListener('resize', checkMob);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Show nothing if no data yet
  if (!loading && steps.length === 0) return null;

  return (
    <section
      id="journey"
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
          <div className="relative w-full" style={{ perspective: 1200 }}>
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

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, i) => (
                <JourneyCard key={step.id} step={step} i={i} isMobile={isMobile} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function JourneyCard({ step, i, isMobile }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'], // track from entering bottom of screen to exiting top
  });

  const isEven = i % 2 === 0;
  const number = step.step || (i + 1 < 10 ? `0${i + 1}` : i + 1);
  const color = step.color || (isEven ? '#0197B2' : '#5ACB2A');
  
  // When entering (0), flipped back. When centered (0.5), perfectly flat. When exiting (1), flipped back the other way.
  // The sign depends on which side it hinges on to look like a book opening/closing.
  // Left side hinge (isMobile or odd items): rotates positively to flip back.
  // Right side hinge (even items): rotates negatively to flip back.
  const hingeLeft = isMobile || !isEven;
  
  const rotateYMapping = useTransform(
    scrollYProgress, 
    [0.1, 0.5, 0.9], 
    hingeLeft ? [45, 0, 45] : [-45, 0, -45] 
  );

  return (
    <div ref={cardRef} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`} style={{ perspective: 1200 }}>
      {/* Node */}
      <div
        className="absolute left-[28px] md:left-1/2 w-11 h-11 rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-sm font-bold text-white border-4 border-white shadow-md tracking-wider"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>

      <div className="hidden md:block w-1/2" />

      {/* Card */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 lg:pr-20' : 'md:pl-16 lg:pl-20'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          style={{
            rotateY: rotateYMapping,
            originX: hingeLeft ? 0 : 1,
            transformStyle: 'preserve-3d'
          }}
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
}
