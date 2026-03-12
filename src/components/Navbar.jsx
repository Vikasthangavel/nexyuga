import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const EASE = [0.55, 0.085, 0, 0.99];

const navLinks = [
  { name: 'Home', href: '/#home', isRoute: false },
  { name: 'Journey', href: '/#journey', isRoute: false },
  { name: 'Spotlight', href: '/#video', isRoute: false },
  { name: 'Studies', href: '/#studies', isRoute: false },
  { name: 'Careers', href: '/careers', isRoute: true },
  { name: 'Contact', href: '/contact', isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > 120) setHidden(y > lastY.current && y - lastY.current > 8);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)] border-b border-gray-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Nexyuga" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Tag = link.isRoute ? Link : 'a';
              const props = link.isRoute ? { to: link.href } : { href: link.href };
              return (
                <Tag
                  key={link.name}
                  {...props}
                  className="relative text-[14px] font-medium text-dark/60 hover:text-dark px-4 py-2 rounded-lg transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-cinematic" />
                </Tag>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center h-10 px-6 rounded-full bg-dark text-white text-[13px] font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-400 ease-cinematic"
            >
              Get in Touch
            </Link>
            <button
              className="lg:hidden p-2 text-dark/70 hover:text-dark transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const Tag = link.isRoute ? Link : 'a';
                const props = link.isRoute ? { to: link.href } : { href: link.href };
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Tag
                      {...props}
                      onClick={() => setMobileOpen(false)}
                      className="block text-[15px] font-medium text-dark/70 hover:text-primary px-4 py-3 rounded-xl transition-colors"
                    >
                      {link.name}
                    </Tag>
                  </motion.div>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block w-full py-3 bg-dark text-white text-center text-sm font-medium rounded-full"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
