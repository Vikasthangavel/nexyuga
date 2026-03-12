import { motion } from 'framer-motion';
import img1 from '../assets/gallery/1.jpg';
import img2 from '../assets/gallery/2.jpg';
import img7 from '../assets/gallery/7.jpg';
import img8 from '../assets/gallery/8.jpg';
import img9 from '../assets/gallery/9.jpg';
import imgEmpower from '../assets/gallery/empower-iit-delhi.jpg';
import imgJBF from '../assets/gallery/jbf-bharat-impact.jpg';
import imgAkshay from '../assets/gallery/pilot-akshay-saxena.jpg';
import imgPramod from '../assets/gallery/pilot-pramod-s.png';

const galleryItems = [
  imgEmpower, img1, img7, imgAkshay, img9, imgPramod, img8, img2, imgJBF,
  img7, imgAkshay, imgEmpower, imgPramod, img9, img1, imgJBF, img2, img8, 
  img1, img2, img7, img8, img9, imgEmpower, imgJBF, imgAkshay, imgPramod
];

// 7 columns
const heartPattern = [
  0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 0, 0, 0
];

export default function Gallery() {
  let imgIndex = 0;

  return (
    <section 
      id="gallery" 
      className="py-24 bg-white relative overflow-hidden font-sans flex flex-col items-center" 
    >
      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-[#ff4d6d] mb-4 block"
          >
            Moments of Impact
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[54px] font-bold text-dark tracking-tight leading-tight mb-4"
          >
            The Heart of Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            A visual journey of our key milestones, partnerships, and the real people who make our mission possible.
          </motion.p>
        </div>

        {/* Heart Grid */}
        <div className="relative w-full max-w-[800px] mx-auto mt-10 p-2 sm:p-4">
          
          {/* Glowing Outline/Shadow behind the heart */}
          <motion.div 
            className="absolute inset-0 bg-[#ff4d6d] opacity-20 blur-[60px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            {heartPattern.map((slot, i) => {
              if (slot === 0) {
                return <div key={`empty-${i}`} className="col-span-1" />;
              }
              
              const imgSrc = galleryItems[imgIndex % galleryItems.length];
              imgIndex++;
              
              return (
                <motion.div
                  key={`img-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.5, delay: (Math.random() * 0.3), ease: "easeOut" }}
                  whileHover={{ scale: 1.15, zIndex: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
                  className="relative group rounded-md md:rounded-xl overflow-hidden bg-gray-200 cursor-pointer shadow-sm aspect-square border border-gray-100/10"
                >
                  <img
                    src={imgSrc}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-[#ff4d6d]/0 group-hover:bg-[#ff4d6d]/20 transition-colors duration-300" />
                </motion.div>
              );
            })}
          </div>
          
        </div>

      </div>
    </section>
  );
}
