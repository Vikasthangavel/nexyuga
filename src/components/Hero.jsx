import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import heroImg1 from '../assets/heroimage.png';
import heroImg2 from '../assets/heroimage2.png';
import heroImg3 from '../assets/heroimage3.png';
import heroImg4 from '../assets/heroimage4.png';

const heroImages = [heroImg1,  heroImg3,heroImg2, heroImg4];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);
  const containerRef = useRef(null);
  const [heroText, setHeroText] = useState('*Empowering* Confidence \\n *Through Touch &* Audio');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'hero'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().text) {
        setHeroText(docSnap.data().text);
      }
    });
    return () => unsub();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map scroll progress to track the bottom half of the SVG curve
  // Curve from center -> bottom right
  const imgY = useTransform(smoothScroll, [0, 1], [0, 500]);
  const imgX = useTransform(smoothScroll, [0, 1], [0, 180]);
  const imgRotate = useTransform(smoothScroll, [0, 1], [-5, 10]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Visual (Curve & Carousel Card) */}
        <div className="hidden lg:flex lg:col-span-4 relative h-[600px] items-center justify-center">
          {/* Decorative curved SVG line */}
          <div className="absolute top-0 bottom-0 left-[-40%] w-[150%] pointer-events-none">
            <svg 
              viewBox="0 0 200 800" 
              className="w-full h-full stroke-primary drop-shadow-[0_0_8px_rgba(1,151,178,0.5)]"
              fill="none" 
              strokeWidth="3"
            >
              <path d="M 150 0 C -50 200 -50 600 150 800" stroke="url(#gradientCurve)" />
              <defs>
                <linearGradient id="gradientCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0197B2" />
                  <stop offset="50%" stopColor="#5ACB2A" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Floating Image */}
          <motion.div
            style={{ 
              y: imgY, 
              x: imgX, 
              rotate: imgRotate,
              marginLeft: '-3rem' // initial -translate-x-12 equivalent
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 inline-block w-[500px] max-w-full"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={heroImages[currentImg]}
                alt="Tactile Learning Tool"
                className="block w-full h-auto mix-blend-multiply"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImg ? 'bg-primary w-4' : 'bg-primary/30'
                  }`}
                  aria-label={`Switch to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-8 flex flex-col justify-center relative">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 w-full">
            {/* Badge */}


            {/* Top Right Mini-Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block text-right max-w-[200px]"
            >
              <p className="text-dark font-semibold text-lg leading-tight">Empowering <br/> Accessible Innovation.</p>
            </motion.div>
          </div>

          {/* Massive Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-dark relative z-20"
          >
            <h1 className="text-[42px] sm:text-[58px] md:text-[72px] lg:text-[86px] font-bold leading-[1.05] tracking-tight whitespace-pre-wrap">
              {heroText.split('*').map((part, index) => {
                if (index % 2 === 0) {
                  // Normal text (even index)
                  return <span key={index}>{part}</span>;
                } else {
                  // Highlighted text (odd index)
                  return (
                    <span key={index} className="relative inline-block text-primary">
                      {part}
                      {/* Corner box accent */}
                      <div className="absolute inset-[-4px] md:inset-[-8px] border border-primary/50 pointer-events-none flex justify-between flex-col">
                        <div className="flex justify-between -mt-[3px] md:-mt-[4px]">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -ml-[3px] md:-ml-[4px]" />
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -mr-[3px] md:-mr-[4px]" />
                        </div>
                        <div className="flex justify-between -mb-[3px] md:-mb-[4px]">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -ml-[3px] md:-ml-[4px]" />
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary -mr-[3px] md:-mr-[4px]" />
                        </div>
                      </div>
                    </span>
                  );
                }
              })}
            </h1>
          </motion.div>

          {/* Bottom Actions & Text */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4"
            >
               <Button asChild size="lg" className="h-14 px-8 rounded-full text-base text-white shadow-xl transition-all hover:-translate-y-1" style={{ backgroundColor: '#5ACB2A' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='#4ab524'} onMouseLeave={e => e.currentTarget.style.backgroundColor='#5ACB2A'}>
                 <a href="/contact">Let's Collaborate!</a>
               </Button>
               <a href="#video" className="w-12 h-12 rounded-full border-2 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ borderColor: '#0197B2', backgroundColor: '#0197B2' }}>
                 <FaPlay className="ml-1 text-sm" />
               </a>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="max-w-[340px]"
            >
               <p className="text-gray-500 leading-relaxed font-light">
                 Accessible education for everyone. We create tactile and audio learning tools that help visually impaired children learn independently through touch and sound.
               </p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
