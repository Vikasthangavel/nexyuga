import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/#home', emoji: '🏠' },
  { name: 'Our Journey', href: '/#journey', emoji: '🚀' },
  { name: 'Spotlights', href: '/#video', emoji: '🎬' },
  { name: 'Our Innovations', href: '/#studies', emoji: '💡' },
  { name: 'Careers', href: '/careers', emoji: '🎯', isRoute: true },
  { name: 'Contact Us', href: '/contact', emoji: '💌', isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const isInnerPage = location.pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBgClass = isInnerPage || scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-primary/5'
    : 'bg-transparent';

  return (
    <motion.nav
      initial={{ y: -100, rotateX: -90 }}
      animate={{ y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      style={{ perspective: 800 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with 3D flip */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Nexyuga Home">
            <motion.img
              src={logo}
              alt="Nexyuga"
              className="h-10 w-auto"
              whileHover={{ rotateY: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </Link>

          {/* Desktop Links with emoji pop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const Tag = link.isRoute ? motion(Link) : motion.a;
              const linkProps = link.isRoute ? { to: link.href } : { href: link.href };
              return (
                <Tag
                  key={link.name}
                  {...linkProps}
                  className="relative px-4 py-2 text-sm font-medium text-dark/80 hover:text-primary transition-colors group"
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: 600 }}
                >
                  <AnimatePresence>
                    {hoveredLink === i && (
                      <motion.span
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg pointer-events-none"
                        initial={{ y: 10, opacity: 0, scale: 0, rotate: -30 }}
                        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ y: -15, opacity: 0, scale: 0, rotate: 30 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
                      >
                        {link.emoji}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {link.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </Tag>
              );
            })}
          </div>

          {/* Enquiry with jelly */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: [1, 1.15, 0.95, 1.05, 1] }}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-primary/40 transition-shadow"
              >
                <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🎯</motion.span>
                Enquiry
              </Link>
            </motion.div>

            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.8, rotate: 180 }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with 3D flip */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotateX: -15 }}
            animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: 15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
            style={{ transformOrigin: 'top' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const Tag = link.isRoute ? motion(Link) : motion.a;
                const linkProps = link.isRoute ? { to: link.href } : { href: link.href };
                return (
                  <Tag
                    key={link.name}
                    {...linkProps}
                    initial={{ x: -40, opacity: 0, rotate: -5 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark/80 hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                  >
                    <span className="text-lg">{link.emoji}</span>
                    {link.name}
                  </Tag>
                );
              })}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 mt-3 px-5 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-center font-semibold rounded-full"
                >
                  🎯 Enquiry
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
