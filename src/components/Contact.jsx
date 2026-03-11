import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaBuilding,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const contactInfo = [
  {
    icon: FaPhone,
    label: 'Have any question?',
    value: '+91 70940 94815',
    href: 'tel:+917094094815',
    color: '#5ACB2A',
    bg: '#5ACB2A15',
  },
  {
    icon: FaEnvelope,
    label: 'Send Email',
    value: 'info@nexyuga.in',
    href: 'mailto:info@nexyuga.in',
    color: '#0197B2',
    bg: '#0197B215',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Visit Anytime',
    value: 'KSR, Kalvi nagar, Tiruchengode',
    href: 'https://maps.google.com/?q=KSR+Kalvi+Nagar+Tiruchengode',
    color: '#06B6D4',
    bg: '#06B6D415',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    organization: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', mobile: '', organization: '', message: '' });
  };

  return (
    <section id="contact-page" className="relative overflow-hidden" aria-label="Contact">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-dark via-dark-light to-[#0a3d4d] pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden">
        {/* Animated mesh circles */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scaleX: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          aria-hidden="true"
        />
        {['💌', '📞', '📍', '✉️', '🌟'].map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-xl pointer-events-none opacity-15"
            style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            aria-hidden="true"
          >
            {e}
          </motion.div>
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            style={{ perspective: 800 }}
          >
            Say{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent inline-block"
              style={{ WebkitBackgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Hello!
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👋
            </motion.span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-primary-light">Say Hello!</span>
          </motion.div>
        </div>
      </div>

      {/* ── Form + Info Section ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-bg relative">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-secondary/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="text-base" />
              Contact with us
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
              Feel free to write us{' '}
              <motion.span className="text-primary inline-block" whileHover={{ scale: 1.05, rotate: -2 }}>
                anytime
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Contact info column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-5"
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
                <motion.div className="text-4xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>👋</motion.div>
                <h3 className="font-heading text-xl font-bold mb-2">Let's get in touch</h3>
                <p className="text-white/70 text-sm leading-relaxed">We'd love to hear from you. Reach out and we'll get back to you as soon as possible.</p>
              </div>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.icon === FaMapMarkerAlt ? '_blank' : undefined}
                  rel={info.icon === FaMapMarkerAlt ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 6, boxShadow: `0 10px 30px ${info.color}20` }}
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: info.bg }}>
                    <info.icon size={20} style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="text-dark/40 text-xs mb-0.5">{info.label}</p>
                    <p className="text-dark font-heading font-bold text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
                />
              </motion.div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 text-sm" />
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 text-sm" />
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Name of Organization"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
                />
              </motion.div>
            </div>
            <motion.div whileHover={{ y: -2 }}>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write a message"
                rows={5}
                required
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm resize-none"
              />
            </motion.div>
            <div className="text-center pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06, boxShadow: '0 8px 30px rgba(1,151,178,0.35)' }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg text-sm cursor-pointer"
              >
                <FaPaperPlane size={13} />
                {submitted ? 'Message Sent! ✅' : 'Send a Message'}
              </motion.button>
            </div>
          </motion.form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Map Section ── */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-bg relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute top-10 -left-10 w-52 h-52 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
              Find{' '}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                Us
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📍
              </motion.span>
            </h2>
            <p className="text-dark/50 text-sm mt-2">K.S. Rangasamy College of Technology, Kalvi Nagar, Tiruchengode</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
            whileHover={{ y: -6, boxShadow: '0 25px 60px rgba(1,151,178,0.15)' }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10 group"
            style={{ perspective: 800 }}
          >
            {/* Decorative top bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="relative w-full h-[400px] sm:h-[480px] bg-dark/5">
              <iframe
                title="Nexyuga Innovations Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1676.5984403401653!2d77.82800429262743!3d11.363790184794874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964016c607823%3A0x580736a65c2b0005!2sK.S.RANGASAMY%20COLLEGE%20OF%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1773226317410!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom info bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaMapMarkerAlt className="text-primary" size={18} />
                </motion.div>
                <div>
                  <p className="text-dark font-heading font-bold text-sm">KSR College of Technology</p>
                  <p className="text-dark/40 text-xs">Kalvi Nagar, Tiruchengode, Tamil Nadu</p>
                </div>
              </div>
              <motion.a
                href="https://maps.google.com/?q=KSR+Kalvi+Nagar+Tiruchengode"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, boxShadow: '0 5px 20px rgba(1,151,178,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-semibold rounded-full shadow-md"
              >
                <FaMapMarkerAlt size={11} />
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
