import { motion } from 'framer-motion';

const steps = [
  {
    num: '01.',
    title: 'Idea Born',
    desc: 'Nexyuga Innovations was born from a simple yet powerful idea — every child deserves the chance to learn, explore, and grow, regardless of physical ability.',
    timeline: '2022',
  },
  {
    num: '02.',
    title: 'First Prototype',
    desc: 'We designed the first tactile learning kits and audio-enhanced study tools to make education a joyful, independent experience for visually impaired children.',
    timeline: '2023',
  },
  {
    num: '03.',
    title: 'Award Winning',
    desc: 'Working closely with educators and accessibility experts, our tools gained recognition for bridging the gap in inclusive education.',
    timeline: '2024',
  },
  {
    num: '04.',
    title: 'Scaling Up',
    desc: 'Our journey has taken us across multiple states, touching the lives of hundreds of young learners and continuously expanding our reach.',
    timeline: '2025+',
  },
];

export default function Journey() {
  return (
    <section 
      id="journey" 
      className="py-32 px-6 sm:px-8 bg-[#0b0d10] relative overflow-hidden flex flex-col items-center font-sans" 
      aria-label="Our Story"
    >
      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
            4 easy steps to <br /> get started
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Our progressive method blends innovation and empathy while keeping accessibility at the core.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Line track */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#b5e32a] rounded-full shadow-[0_0_15px_#b5e32a]" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* The central indicator node */}
                  <div className="absolute left-[24px] md:left-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#b5e32a] rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-[#0b0d10] font-bold text-lg border-4 border-[#0b0d10]">
                    {i + 1}
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2" />
                  
                  {/* Content Box with 3D Scroll Flip */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'} perspective-[1500px]`}>
                    <motion.div 
                      initial={{ opacity: 0, rotateY: isEven ? 90 : -90, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-[#14161a] rounded-[20px] p-6 md:p-8 hover:shadow-[0_10px_30px_rgba(181,227,42,0.1)] transition-shadow border border-white/5"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 font-medium text-xl md:text-2xl">{step.num}</span>
                          <h3 className="text-white font-bold text-xl md:text-2xl">{step.title}</h3>
                        </div>
                        <div className="inline-block px-3 py-1 bg-[#0b0d10] text-gray-400 text-xs font-semibold rounded-md border border-white/5">
                          {step.timeline}
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                        {step.desc}
                      </p>
                    </motion.div>
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
