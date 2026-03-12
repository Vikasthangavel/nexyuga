import { motion } from 'framer-motion';

const EASE = [0.55, 0.085, 0, 0.99];

const perks = [
  { title: 'Innovation First', desc: 'Work on cutting-edge tactile and audio learning tools that are changing lives.' },
  { title: 'Collaborative Culture', desc: 'A close-knit team of engineers, designers, and educators building together.' },
  { title: 'Social Impact', desc: 'Every line of code, every design — directly helps visually impaired children learn.' },
  { title: 'Growth & Learning', desc: 'Mentorship, workshops, and the freedom to experiment with new ideas.' },
];

const openPositions = [];

export default function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="pt-36 sm:pt-44 pb-20 sm:pb-28 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark tracking-tight mb-4"
        >
          Join <span className="gradient-text">Our Team</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm"
        >
          <a href="/" className="hover:text-dark transition-colors">Home</a>
          <span className="mx-2">/</span>
          <span className="text-primary">Careers</span>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block"
            >
              We're Hiring
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-3xl sm:text-4xl font-bold text-dark tracking-tight mb-5"
            >
              Join Our Team at <span className="gradient-text">Nexyuga</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-light max-w-2xl mx-auto"
            >
              We're on a mission to make learning accessible for everyone. If you're passionate about creating impact and love experimenting with ideas, this is the place for you.
            </motion.p>
          </div>

          {/* Perks */}
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500"
              >
                <h3 className="font-bold text-dark text-[15px] mb-1">{perk.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-3xl sm:text-4xl font-bold text-dark tracking-tight text-center mb-10"
          >
            Open <span className="gradient-text">Positions</span>
          </motion.h2>

          {openPositions.length > 0 ? (
            <div className="space-y-4">
              {openPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-dark mb-1">{pos.title}</h3>
                    <p className="text-gray-500 text-sm font-light">{pos.type} · {pos.location}</p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white text-sm font-medium rounded-full hover:bg-dark/90 transition-colors"
                  >
                    Apply Now
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-14"
            >
              <p className="text-primary font-medium mb-1">No openings right now.</p>
              <p className="text-gray-400 text-sm font-light mb-6">Check back later — we're always growing!</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-dark text-white text-sm font-medium rounded-full hover:bg-dark/90 transition-colors"
              >
                Send Your Resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
