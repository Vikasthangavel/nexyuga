import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD

const EASE = [0.55, 0.085, 0, 0.99];
=======
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f

const contactInfo = [
  { label: 'Call Us', value: '+91 70940 94815', href: 'tel:+917094094815' },
  { label: 'Email', value: 'info@nexyuga.in', href: 'mailto:info@nexyuga.in' },
  { label: 'Location', value: 'Tiruchengode, Tamil Nadu', href: 'https://maps.google.com/?q=KSR+Kalvi+Nagar+Tiruchengode' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...form,
        read: false,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to save enquiry:', err);
    } finally {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };


  return (
    <section id="contact-page" className="py-28 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl md:text-5xl font-bold text-dark tracking-tight mb-5"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-lg mx-auto"
          >
            Whether you have a question or want to collaborate, drop us a message below.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', type: 'email', placeholder: 'Email Address' },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:bg-white focus:border-primary/30 transition-all duration-400"
                  />
                  <motion.div
                    initial={false}
                    animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary origin-left rounded-full"
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </div>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                placeholder="Subject"
                className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:bg-white focus:border-primary/30 transition-all duration-400"
              />
              <motion.div
                initial={false}
                animate={{ scaleX: focusedField === 'subject' ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary origin-left rounded-full"
                transition={{ duration: 0.3, ease: EASE }}
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="How can we help you?"
                required
                rows={5}
                className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:bg-white focus:border-primary/30 transition-all duration-400 resize-none"
              />
              <motion.div
                initial={false}
                animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary origin-left rounded-full"
                transition={{ duration: 0.3, ease: EASE }}
              />
            </div>

            <div className="text-center pt-2">
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
<<<<<<< HEAD
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark text-white rounded-full text-sm font-medium hover:bg-dark/90 transition-colors duration-300"
              >
                {submitted ? 'Message Sent ✓' : 'Send Message'}
                {!submitted && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                )}
=======
                className="inline-flex items-center gap-2 px-10 py-4 bg-dark text-white rounded-full font-medium shadow-xl hover:bg-dark/90 transition-all overflow-hidden relative group disabled:opacity-70"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-12 -ml-16 group-hover:animate-shimmer" />
                <span>{submitted ? 'Message Sent' : sending ? 'Sending…' : 'Send Message'}</span>
                {submitted ? <span className="ml-2">✓</span> : <FaPaperPlane className="ml-2 text-sm" />}
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
              </motion.button>
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 mt-3 text-sm"
                  >
                    Thank you! We'll get back to you shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.href}
              target={idx === 2 ? '_blank' : undefined}
              rel={idx === 2 ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 text-center"
            >
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{info.label}</p>
              <p className="text-dark font-semibold">{info.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
