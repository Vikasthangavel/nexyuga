import { motion } from 'framer-motion';
import { FaGraduationCap, FaHandshake, FaBalanceScale } from 'react-icons/fa';
import sdg4Img from '../assets/SDG4.png';
import sdg11Img from '../assets/SDG11.jpg';
import sdg17Img from '../assets/SDG17.jpg';

const goals = [
  {
    icon: FaGraduationCap,
    title: 'Quality Education',
    sdg: 'SDG 4',
    description: 'Ensuring inclusive and equitable quality education for all, promoting lifelong learning opportunities.',
    color: '#E81D2C',
    image: sdg4Img,
  },
  {
    icon: FaBalanceScale,
    title: 'Reduced Inequalities',
    sdg: 'SDG 10',
    description: 'Reducing inequality within and among countries by empowering the differently abled through accessible tools.',
    color: '#DD1367',
    image: sdg11Img,
  },
  {
    icon: FaHandshake,
    title: 'Partnerships for Goals',
    sdg: 'SDG 17',
    description: 'Strengthening the means of implementation and revitalising global partnerships for sustainable development.',
    color: '#19486A',
    image: sdg17Img,
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
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 relative flex flex-col h-full"
            >
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-md" style={{ color: goal.color }}>
                     <goal.icon />
                   </div>
                   <span className="font-bold text-white tracking-wide text-sm drop-shadow-md">
                     {goal.sdg}
                   </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-dark text-xl mb-4 group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 flex-grow">
                  {goal.description}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: goal.color }}>
                   <span>Learn More</span>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                   </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
