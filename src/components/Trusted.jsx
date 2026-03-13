import { motion } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';

export default function Trusted() {
  const { data: partners, loading } = useCollection('partners');

  // Show nothing if no partners uploaded yet
  if (!loading && partners.length === 0) return null;

  // Repeat enough times to fill the marquee seamlessly
  const repeated = partners.length > 0
    ? Array.from({ length: Math.ceil(30 / partners.length) * partners.length }, (_, i) => partners[i % partners.length])
    : [];

  return (
    <section
      className="py-20 bg-white relative overflow-hidden flex flex-col items-center border-y border-gray-50"
      aria-label="Trusted partners"
    >
      {/* Subtle blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight">
            Supported &amp; Trusted By
          </h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Marquee */}
        {!loading && repeated.length > 0 && (
          <div className="w-full relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

            <div className="flex animate-marquee w-max py-4 shrink-0 items-center">
              {repeated.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-20 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 relative group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                  whileHover={{ y: -4 }}
                  aria-label={`Partner: ${p.name}`}
                >
                  <div className="w-full h-full p-4 flex items-center justify-center pointer-events-none">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-all duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
