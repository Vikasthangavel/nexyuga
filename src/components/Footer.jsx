import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const EASE = [0.55, 0.085, 0, 0.99];

const exploreLinks = [
  { name: 'Home', route: '/' },
  { name: 'Journey', route: '/#journey' },
  { name: 'Studies', route: '/#studies' },
  { name: 'Gallery', route: '/#gallery' },
  { name: 'Careers', route: '/careers' },
];

const legalLinks = [
  { name: 'About Us' },
  { name: 'Privacy Policy' },
  { name: 'Terms of Use' },
  { name: 'Contact Us', route: '/contact' },
];

const socialIcons = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="pt-20 pb-8 px-6 sm:px-8 bg-gray-50 border-t border-gray-100" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to="/">
              <img src={logo} alt="Nexyuga" className="h-9 w-auto mb-5" />
            </Link>
            <p className="text-gray-500 text-sm font-light leading-relaxed mb-5">
              Creating inclusive learning experiences through tactile and audio innovations.
            </p>
            <ul className="space-y-2 text-sm text-gray-500 font-light">
              <li>KSR, Kalvi Nagar, Tiruchengode</li>
              <li><a href="mailto:info@nexyuga.in" className="hover:text-primary transition-colors">info@nexyuga.in</a></li>
              <li><a href="tel:+917094094815" className="hover:text-primary transition-colors">+91 70940 94815</a></li>
            </ul>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 mb-5">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.route} className="text-gray-500 hover:text-primary text-sm font-light transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 mb-5">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  {link.route ? (
                    <Link to={link.route} className="text-gray-500 hover:text-primary text-sm font-light transition-colors duration-300">{link.name}</Link>
                  ) : (
                    <span className="text-gray-500 text-sm font-light cursor-default">{link.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 mb-5">Follow Us</h3>
            <div className="flex gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Nexyuga Innovations. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Built with purpose &amp; passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
