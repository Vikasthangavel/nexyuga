import { motion } from 'framer-motion';
// Custom icons replicating the user's screenshot
const iconEducation = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="M16 2v20" />
    {/* Pencil representation */}
    <path d="M21 4l-4 4v11h4V4z" />
  </svg>
);

const iconInequality = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Equals sign */}
    <path d="M9 10h6" />
    <path d="M9 14h6" />
    {/* Arrows pointing inward */}
    <path d="M12 3v3m0 0l-2-2m2 2l2-2" />
    <path d="M12 21v-3m0 0l-2 2m2-2l2 2" />
    <path d="M3 12h3m0 0l-2-2m2 2l-2 2" />
    <path d="M21 12h-3m0 0l2-2m-2 2l2 2" />
  </svg>
);

const iconPartnership = (
  <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="#0D47A1" strokeWidth="4">
    {/* Interlocking Rings */}
    <circle cx="50" cy="35" r="16" />
    <circle cx="35" cy="45" r="16" />
    <circle cx="65" cy="45" r="16" />
    <circle cx="42" cy="65" r="16" />
    <circle cx="58" cy="65" r="16" />
    {/* Top ring color accent */}
    <path d="M34 35 A 16 16 0 0 1 66 35" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
    <path d="M45 19 A 16 16 0 0 1 65 29" stroke="#FFC107" strokeWidth="4" strokeLinecap="round"/>
    <path d="M35 29 A 16 16 0 0 1 55 19" stroke="#E91E63" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const goals = [
  {
    svgIcon: iconEducation,
    title: 'Quality\nEducation',
  },
  {
    svgIcon: iconInequality,
    title: 'Reduced\nInequalities',
  },
  {
    svgIcon: iconPartnership,
    title: 'Partnerships\nfor Goals',
  },
];

export default function SDGGoals() {
  return (
    <section id="sdg" className="py-24 px-6 sm:px-8 lg:px-12 bg-gray-50/50 relative overflow-hidden flex flex-col items-center" aria-label="SDG Goals">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">
            Sustainability
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-4">
            Aligned with Global Goals
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Our mission directly contributes to the United Nations Sustainable Development Goals, driving impact where it matters most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 w-full aspect-square md:aspect-[4/3] flex flex-col items-center justify-center pt-8 px-8 overflow-hidden group"
            >
              {/* Wavy Cream Top Border */}
              <div className="absolute top-0 left-0 w-full h-[120px] pointer-events-none z-0">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full fill-[#F9F6F0]">
                  <path d="M0,0 L400,0 L400,60 C320,100 240,40 160,80 C80,120 40,80 0,60 Z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center mt-6">
                <motion.div 
                  className="mb-6 transform group-hover:scale-110 transition-transform duration-500 ease-out"
                >
                  {goal.svgIcon}
                </motion.div>
                
                <h3 className="font-bold text-dark text-xl leading-snug whitespace-pre-line group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
