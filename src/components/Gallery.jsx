import { motion } from 'framer-motion';

const galleryItems = [
  { title: 'Braille Kit in Action', color: '#0197B2', span: 'col-span-2 row-span-2', emoji: '📚' },
  { title: 'Audio Learning Session', color: '#06B6D4', span: '', emoji: '🎧' },
  { title: 'Tactile Math Models', color: '#5ACB2A', span: '', emoji: '🔢' },
  { title: 'Classroom Workshop', color: '#14B8A6', span: '', emoji: '🏫' },
  { title: 'Student Smiling', color: '#10B981', span: '', emoji: '😊' },
  { title: 'Product Design', color: '#06B6D4', span: 'col-span-2', emoji: '🎨' },
];

export default function Gallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50" aria-label="Gallery">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            📸 Gallery
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Moments of{' '}
            <motion.span
              className="text-primary inline-block"
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              Impact
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, rotateY: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 150 }}
              whileHover={{
                scale: 1.08,
                rotateX: -3,
                rotateY: 5,
                zIndex: 10,
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              }}
              whileTap={{ scale: 0.95, rotateX: 5 }}
              className={`${item.span} group relative rounded-2xl overflow-hidden cursor-pointer shadow-md`}
              style={{ perspective: 800 }}
            >
              {/* Image with zoom */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-125">
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-label={item.title}>
                  <rect width="400" height="300" fill={item.color + '15'} />
                  <rect width="400" height="300" fill={item.color} opacity="0.12" />
                  <circle cx="100" cy="80" r="40" fill={item.color} opacity="0.2">
                    <animate attributeName="cx" values="100;130;100" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="300" cy="200" r="60" fill={item.color} opacity="0.15">
                    <animate attributeName="cy" values="200;170;200" dur="5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="150" r="30" fill={item.color} opacity="0.25">
                    <animate attributeName="r" values="30;40;30" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="130" textAnchor="middle" fontSize="50" opacity="0.7">{item.emoji}</text>
                  <text x="200" y="200" textAnchor="middle" fontSize="14" fill={item.color} opacity="0.6" fontFamily="Inter">
                    {item.title}
                  </text>
                </svg>
              </div>

              {/* 3D Overlay with slide-up info */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <motion.p
                    className="text-white font-heading font-semibold text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.emoji} {item.title}
                  </motion.p>
                </div>
              </motion.div>

              {/* Fun corner emoji */}
              <motion.div
                className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {item.emoji}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
