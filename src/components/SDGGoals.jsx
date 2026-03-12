import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sdg4Img from '../assets/SDG4.png';
import sdg11Img from '../assets/SDG11.jpg';
import sdg17Img from '../assets/SDG17.jpg';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.55, 0.085, 0, 0.99];

const goals = [
  {
    title: 'Quality Education',
    sdg: 'SDG 4',
    description: 'Ensuring inclusive and equitable quality education for all, promoting lifelong learning opportunities.',
    image: sdg4Img,
  },
  {
    title: 'Reduced Inequalities',
    sdg: 'SDG 10',
    description: 'Reducing inequality within and among countries by empowering the differently abled through accessible tools.',
    image: sdg11Img,
  },
  {
    title: 'Partnerships for Goals',
    sdg: 'SDG 17',
    description: 'Strengthening the means of implementation and revitalising global partnerships for sustainable development.',
    image: sdg17Img,
  },
];

export default function SDGGoals() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path image reveal (Nimo wa_clip_left_right)
      gsap.utils.toArray('.sdg-image-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sdg" ref={sectionRef} className="py-28 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block"
          >
            Sustainability
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-5"
          >
            Aligned with <span className="gradient-text">Global Goals</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-xl mx-auto"
          >
            Our mission directly contributes to the United Nations Sustainable Development Goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
<<<<<<< HEAD
              <div className="h-52 overflow-hidden relative sdg-image-reveal">
                <img
                  src={goal.image}
                  alt={goal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
=======
              {/* Subtle top border in brand color */}
              <div 
                className="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20"
                style={{ backgroundColor: goal.color }}
              />

              <div className="overflow-hidden relative bg-gray-100 max-h-36">
                <img
                  src={goal.image}
                  alt={goal.title}
                  className="w-full h-auto block opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-multiply"
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                <span className="absolute bottom-4 left-5 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-md">
                  {goal.sdg}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {goal.title}
                </h3>
                <p className="text-gray-500 text-[15px] font-light leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
