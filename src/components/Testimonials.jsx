import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

import t1 from '../assets/testimonials/1.svg';
import t2 from '../assets/testimonials/2.svg';
import t3 from '../assets/testimonials/5.svg';
import t4 from '../assets/testimonials/4.svg';
import t5 from '../assets/testimonials/3.svg';

const baseTestimonials = [
  { quote: 'From start to finish, the communication was seamless and the design blew us away.', name: 'James R.', designation: 'Startup Founder', image: t1 },
  { quote: 'Creative direction, speed, and polish were all first class from kickoff to launch.', name: 'Elisa M.', designation: 'Product Lead', image: t2 },
  { quote: 'The final brand system felt premium and clear, and our customer trust improved quickly.', name: 'Daniel C.', designation: 'Marketing Head', image: t3 },
  { quote: 'Absolutely incredible attention to detail. Everything was delivered smoothly.', name: 'Sarah W.', designation: 'Director', image: t4 },
  { quote: 'Their modern approach to design helped our platform grow exponentially.', name: 'Michael B.', designation: 'CEO', image: t5 },
  { quote: 'Professional team with amazing communication. Never left us in the dark.', name: 'Emma T.', designation: 'Manager', image: t1 },
  { quote: 'Fantastic UI and animation quality. The micro-interactions feel deeply organic.', name: 'Noah G.', designation: 'Engineer', image: t2 },
  { quote: 'Their creative ideas impressed our entire team. Such a phenomenal transformation.', name: 'Mia P.', designation: 'UX Specialist', image: t3 },
];

// Dynamically pad the testimonials array to 24 so the massive 1050px wheel is fully and smoothly populated.
const testimonials = Array.from({ length: 24 }, (_, i) => ({
  ...baseTestimonials[i % baseTestimonials.length],
  originalIndex: i % baseTestimonials.length,
}));

export default function TestimonialWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start bottom", "bottom top"]
  });

  // Base scroll rotation effect
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Infinite slow rotation state
  const [continuousRotation, setContinuousRotation] = useState(0);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationFrame;
    const updateRotation = () => {
      // Gently increment rotation if not hovered for a gorgeous smooth spin
      if (!isHovered.current) {
        setContinuousRotation(prev => prev - 0.05); // Negative for continuous clockwise feel
      }
      animationFrame = requestAnimationFrame(updateRotation);
    };
    animationFrame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Handle window resize cleanly for circle computation
  const [radius, setRadius] = useState(450);
  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 300 : 450);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Combined rotation transform
  const combinedRotation = useTransform(scrollRotation, (r) => r + continuousRotation);
  // Counter rotation to keep avatars upright
  const counterRotation = useTransform(combinedRotation, (r) => -r);

  const centerX = 525; // half of 1050
  const centerY = 525;

  return (
    <section ref={containerRef} className="py-24 bg-[#080a0f] relative font-sans flex items-center justify-center">
      <div 
        className="w-full max-w-[1100px] h-[620px] md:h-[540px] relative overflow-hidden rounded-2xl mx-auto shadow-2xl" 
        style={{ background: 'radial-gradient(circle at center, #10141e 0%, #07090d 70%)' }}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
      >
        
        {/* Preview Slider (The Avatar Wheel) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1050px] pointer-events-none">
          <motion.div 
            className="relative w-[1050px] h-[1050px] mx-auto pointer-events-auto transition-transform duration-75"
            style={{ rotate: combinedRotation }}
          >
            {testimonials.map((t, index) => {
              const angleStep = (2 * Math.PI) / testimonials.length;
              // Start at top (-90deg or -PI/2) and spread evenly
              const angle = (index * angleStep) - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle) - 50; // 50 is half of 100px width
              const y = centerY + radius * Math.sin(angle) - 50;

              // Highlighting visual relies on the actual item index vs active index.
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[100px] h-[100px] rounded-full border-[8px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isActive ? 'border-[#d6f345] shadow-[-1.5px_7.8px_59px_0_rgba(214,243,69,0.6)] z-20 scale-110' : 'border-white/10 hover:border-[#d6f345] z-10'}
                  `}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                >
                  <motion.div
                    // Counter rotate to keep avatars perfectly upright!
                    style={{ rotate: counterRotation }}
                    className="w-full h-full"
                  >
                    <img src={t.image} alt="avatar" className="w-full h-full object-cover bg-[#080a0f]" />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Main Slider (Center Content) */}
        <div className="absolute top-[190px] md:top-[160px] left-1/2 -translate-x-1/2 z-10 w-[calc(100%-48px)] max-w-[520px] text-center pointer-events-none">
          <div className="text-[#d6f345] text-[50px] md:text-[70px] leading-none mb-4">
            <FaQuoteRight className="mx-auto" />
          </div>

          <div className="min-h-[140px] md:min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <p className="text-white font-medium text-[18px] md:text-[22px] leading-[1.6] md:leading-[1.75]">
                  {testimonials[activeIndex].quote}
                </p>

                {/* Animated Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                  className="mx-auto mt-[28px] h-[1px] w-[90%] opacity-20 origin-center"
                  style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 15%, #fff 85%, rgba(255, 255, 255, 0) 100%)' }}
                />

                {/* Rating & Author Block */}
                <div className="mt-[28px]">
                  <div className="flex justify-center gap-[7px] text-[#d6f345] text-[18px] mb-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`star-${i}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                      >
                        <FaStar />
                      </motion.div>
                    ))}
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-[15px] text-white/70"
                  >
                    - <span className="text-white font-semibold">{testimonials[activeIndex].name}</span> {testimonials[activeIndex].designation}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
