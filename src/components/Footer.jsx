import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import fg1 from '../assets/gallery/empower-iit-delhi.jpg';
import fg2 from '../assets/gallery/jbf-bharat-impact.jpg';
import fg3 from '../assets/gallery/pilot-akshay-saxena.jpg';
import fg4 from '../assets/gallery/pilot-pramod-s.png';
import fg5 from '../assets/gallery/1.jpg';
import fg6 from '../assets/gallery/2.jpg';

const footerGallery = [fg1, fg2, fg3, fg4, fg5, fg6];

const exploreLinks = [
  { name: 'Home', route: '/' },
  { name: 'Our Journey', route: '/#journey' },
  { name: 'Innovations', route: '/#studies' },
  { name: 'Gallery', route: '/#gallery' },
  { name: 'Careers', route: '/careers' },
];
const quickLinks = [
  { name: 'About Us' },
  { name: 'Privacy Policy' },
  { name: 'Terms of Use' },
  { name: 'Accessibility' },
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
    <footer id="contact" className="bg-gray-50 text-dark pt-24 pb-8 relative overflow-hidden border-t border-gray-100" role="contentinfo">
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Col 1 – Logo & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 pr-4"
          >
            <div className="mb-8">
              <Link to="/">
                <img
                  src={logo}
                  alt="Nexyuga"
                  className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
                />
              </Link>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
              Creating inclusive learning experiences through elegant tactile and audio innovations. We strive to empower every individual to learn and grow without boundaries.
            </p>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-4 text-gray-600 group">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0 transition-colors group-hover:text-primary-dark" />
                <span className="transition-colors group-hover:text-dark">KSR, Kalvi Nagar, Tiruchengode</span>
              </li>
              <li className="flex items-center gap-4 text-gray-600 group">
                <FaEnvelope className="text-primary flex-shrink-0 transition-colors group-hover:text-primary-dark" />
                <a href="mailto:info@nexyuga.in" className="transition-colors group-hover:text-dark">info@nexyuga.in</a>
              </li>
              <li className="flex items-center gap-4 text-gray-600 group">
                <FaPhone className="text-primary flex-shrink-0 transition-colors group-hover:text-primary-dark" />
                <a href="tel:+917094094815" className="transition-colors group-hover:text-dark">+91 70940 94815</a>
              </li>
            </ul>
          </motion.div>

          {/* Col 2 – Explore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:col-start-6"
          >
            <h3 className="text-sm font-semibold tracking-wider uppercase text-dark mb-6">Explore</h3>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  {link.route ? (
                    <Link
                      to={link.route}
                      className="text-gray-500 hover:text-primary text-sm font-light transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-gray-500 hover:text-primary text-sm font-light transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 – Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-semibold tracking-wider uppercase text-dark mb-6">Legal</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.route ? (
                    <Link
                      to={link.route}
                      className="text-gray-500 hover:text-primary text-sm font-light transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-gray-500 hover:text-primary text-sm font-light transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 – Gallery Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 lg:col-start-10"
          >
            <h3 className="text-sm font-semibold tracking-wider uppercase text-dark mb-6">Gallery</h3>
            <div className="grid grid-cols-3 gap-3">
              {footerGallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md overflow-hidden bg-gray-200 group block relative border border-gray-100"
                >
                  <img
                    src={img}
                    alt={`Gallery preview ${i + 1}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider & Bottom Section */}
        <motion.div
          className="border-t border-gray-200 pt-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-xs font-medium tracking-wide">
              &copy; {new Date().getFullYear()} Nexyuga Innovations. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialIcons.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors duration-300 shadow-sm"
                  aria-label={label}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
