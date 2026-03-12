import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import heroImg from '../assets/heroimage.png';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Visual (Curve & Card) */}
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
          
          {/* Floating Image Card */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
             animate={{ opacity: 1, scale: 1, rotate: -5, y: [0, -10, 0] }}
             transition={{ 
               duration: 0.8, 
               y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
             }}
             className="relative z-10 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-50 transform -translate-x-12"
          >
             <img src={heroImg} alt="Tactile Learning Tool" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-8 flex flex-col justify-center relative">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 bg-gray-50/80 backdrop-blur-md border border-gray-100 rounded-full py-2 px-4 shadow-sm mb-6 lg:mb-0"
            >
              <div className="flex flex-col">
                 <span className="text-primary font-bold text-sm tracking-wide">125K+</span>
                 <span className="text-gray-500 text-xs">Students Impacted</span>
              </div>
              <div className="flex -space-x-2">
                 {['#0197B2', '#5ACB2A', '#06B6D4'].map((color, i) => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white" style={{ backgroundColor: color }}>
                     ★
                   </div>
                 ))}
              </div>
              <FaArrowRight className="text-gray-400 text-xs ml-2" />
            </motion.div>

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
            className="mb-10 text-dark relative z-20"
          >
            <h1 className="text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-bold leading-[1.05] tracking-tight">
              Innovation <br /> Starts{' '}
              <span className="relative inline-block text-primary">
                 Here.
                 {/* Bounding Box wrapper */}
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
               <Button asChild size="lg" className="h-14 px-8 rounded-full text-base bg-orange-500 hover:bg-orange-600 text-white shadow-xl transition-all hover:-translate-y-1">
                 <a href="#studies">Let's Collaborate!</a>
               </Button>
               <a href="#video" className="w-12 h-12 rounded-full border-2 border-orange-200 text-orange-500 bg-orange-50 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                 <FaPlay className="ml-1 text-sm" />
               </a>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="max-w-[320px]"
            >
               <p className="text-gray-500 leading-relaxed font-light">
                 Your brand's journey to creativity begins with us, where tactile tools become masterpieces of inclusive learning.
               </p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
