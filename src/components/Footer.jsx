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
  FaHeart,
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
  { name: 'Home' },
  { name: 'Our Journey' },
  { name: 'Innovations' },
  { name: 'Gallery' },
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
  { icon: FaFacebookF, href: '#', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: '#E4405F' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaYoutube, href: '#', label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white pt-16 pb-8 relative overflow-hidden" role="contentinfo">
      {/* Animated decorative blobs */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: ['50%', '30% 70%', '50%'],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        aria-hidden="true"
      />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 – Logo & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.img
                src={logo}
                alt="Nexyuga"
                className="h-10 w-auto"
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Creating inclusive learning experiences through tactile and audio innovations. 🎧📚
            </p>
            <ul className="space-y-3 text-sm">
              <motion.li className="flex items-start gap-2 text-white/60" whileHover={{ x: 5, color: '#81C784' }}>
                <FaMapMarkerAlt className="text-primary-light mt-1 flex-shrink-0" />
                <span>KSR, Kalvi Nagar, Tiruchengode</span>
              </motion.li>
              <motion.li className="flex items-center gap-2 text-white/60" whileHover={{ x: 5, color: '#81C784' }}>
                <FaEnvelope className="text-primary-light flex-shrink-0" />
                <span>info@nexyuga.in</span>
              </motion.li>
              <motion.li className="flex items-center gap-2 text-white/60" whileHover={{ x: 5, color: '#81C784' }}>
                <FaPhone className="text-primary-light flex-shrink-0" />
                <span>+91 70940 94815</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Col 2 – Explore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {exploreLinks.map((link, i) => (
                <li key={link.name}>
                  {link.route ? (
                    <motion.span
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-block"
                    >
                      <Link
                        to={link.route}
                        className="text-white/50 hover:text-primary-light text-sm transition-colors inline-block py-0.5"
                      >
                        → {link.name}
                      </Link>
                    </motion.span>
                  ) : (
                    <motion.a
                      href="#"
                      className="text-white/50 hover:text-primary-light text-sm transition-colors inline-block py-0.5"
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      → {link.name}
                    </motion.a>
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.route ? (
                    <motion.span
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-block"
                    >
                      <Link
                        to={link.route}
                        className="text-white/50 hover:text-primary-light text-sm transition-colors inline-block py-0.5"
                      >
                        → {link.name}
                      </Link>
                    </motion.span>
                  ) : (
                    <motion.a
                      href="#"
                      className="text-white/50 hover:text-primary-light text-sm transition-colors inline-block py-0.5"
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      → {link.name}
                    </motion.a>
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {footerGallery.map((img, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                  whileHover={{
                    scale: 1.15,
                    rotateZ: 3,
                    zIndex: 10,
                    boxShadow: '0 5px 20px rgba(1,151,178,0.4)',
                  }}
                  whileTap={{ scale: 0.9, rotateZ: -3 }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-white/40 text-sm flex items-center gap-1"
              whileHover={{ color: 'rgba(255,255,255,0.7)' }}
            >
              © {new Date().getFullYear()} Nexyuga Innovations.
              <motion.span
                className="inline-block text-red-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
              </motion.span>{' '}
            </motion.p>

            {/* Social icons with 3D hover */}
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, href, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300 }}
                  whileHover={{
                    y: -5,
                    scale: 1.3,
                    backgroundColor: color,
                    color: '#ffffff',
                    rotate: [0, -10, 10, 0],
                    boxShadow: `0 5px 20px ${color}60`,
                  }}
                  whileTap={{ scale: 0.8, rotate: 180 }}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 transition-colors"
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
