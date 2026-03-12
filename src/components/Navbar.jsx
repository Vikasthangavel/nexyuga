import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/#home', isRoute: false },
  { name: 'Our Journey', href: '/#journey', isRoute: false },
  { name: 'Spotlight', href: '/#video', isRoute: false },
  { name: 'Innovations', href: '/#studies', isRoute: false },
  { name: 'Careers', href: '/careers', isRoute: true },
  { name: 'Contact Us', href: '/contact', isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isInnerPage = location.pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBgClass = isInnerPage || scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
    : 'bg-transparent';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Nexyuga Home">
            <motion.img
              src={logo}
              alt="Nexyuga"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Tag = link.isRoute ? Link : 'a';
              const linkProps = link.isRoute ? { to: link.href } : { href: link.href };
              return (
                <Tag
                  key={link.name}
                  {...linkProps}
                  className="relative text-sm font-medium text-dark/80 hover:text-primary transition-colors group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Tag>
              );
            })}
          </div>

          {/* Enquiry Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-dark hover:bg-dark/90 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
              >
                Enquiry
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-dark hover:text-primary transition-colors focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => {
                const Tag = link.isRoute ? Link : 'a';
                const linkProps = link.isRoute ? { to: link.href } : { href: link.href };
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Tag
                      {...linkProps}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-medium text-dark/80 hover:text-primary transition-colors border-b border-gray-50 pb-4"
                    >
                      {link.name}
                    </Tag>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-6 py-3.5 bg-dark text-white text-center font-medium rounded-full hover:bg-dark/90 transition-colors"
                >
                  Enquiry
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
